import { useEffect, useState } from "react";
import { auth, db } from "@/services/firebase";
import { smartLogin, signInWithGoogle } from "@/services/authService";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  // Auto-redirect if already logged in AND verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      if (!user.emailVerified) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      const userData = docSnap.exists() ? docSnap.data() : null;

      const profileComplete = userData && userData.username;

      if (!profileComplete) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await smartLogin(identifier, password);
      const user = userCredential.user;

      // Check if user document exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create user profile with username = null (incomplete)
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          isVerified: user.emailVerified,
          username: null,
        });
      }

      if (!user.emailVerified) {
        await auth.signOut(); // force logout
        toast.warn(
          <>
            Please verify your email first.{" "}
            <button
              className="ml-2 text-blue-600 underline"
              onClick={() => handleResendVerification(user)}
            >
              Resend
            </button>
          </>
        );
        return;
      }

      // ✅ Re-fetch updated user data after possible write
      const updatedSnap = await getDoc(userRef);
      const userData = updatedSnap.exists() ? updatedSnap.data() : null;
      const profileComplete = userData && userData.username;

      toast.success("Login successful!");

      // ✅ Navigate based on profile completion
      if (!profileComplete) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (user) => {
    try {
      await sendEmailVerification(user);
      toast.info("Verification email sent.");
    } catch (error) {
      toast.error("Failed to resend: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      if (!user.emailVerified) {
        await auth.signOut();
        toast.warn("Please verify your Google email account first.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      // ✅ Create user doc if it doesn't exist FIRST
      if (!userSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
          emailVerified: user.emailVerified,
          username: null, // incomplete
        });
      }

      // ✅ Re-fetch user data after possible creation
      const updatedSnap = await getDoc(userDocRef);
      const userData = updatedSnap.exists() ? updatedSnap.data() : null;
      const profileComplete = userData && userData.username;

      if (!profileComplete) {
        toast.info("Please complete your profile first.");
        navigate("/complete-profile");
        return;
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName={() =>
          "text-sm p-1 px-2 rounded bg-white text-gray-700 shadow"
        }
        bodyClassName="text-xs"
      />
      <div className="p-8 rounded-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          disabled={loading}
        >
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <div className="mt-6 text-sm text-center text-gray-600 space-y-1">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

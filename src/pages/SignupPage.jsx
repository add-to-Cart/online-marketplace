import { useState } from "react";
import {
  registerWithEmail,
  signInWithGoogle,
} from "@/features/auth/firebaseAuth";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      alert("Registered successfully! Check your email for verification.");
      // TODO: optionally redirect or inform user to verify email
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Signed in with Google!");
      // TODO: redirect to dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-4 text-center text-sm text-gray-500">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Continue with Google
        </button>

        <div className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

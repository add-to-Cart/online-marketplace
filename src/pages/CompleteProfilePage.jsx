// src/pages/CompleteProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/services/firebase";
import { db } from "@/services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { useUser } from "@/contexts/UserContext";

export default function CompleteProfilePage() {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Listen to auth state to get the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [navigate]);

  const checkAvailability = async () => {
    if (!username.trim()) return;
    setChecking(true);
    const q = query(
      collection(db, "users"),
      where("username", "==", username.trim())
    );
    const snapshot = await getDocs(q);
    setAvailable(snapshot.empty);
    setChecking(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!available) {
      toast.error("Username is not available.");
      return;
    }

    setSubmitting(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);

      await setDoc(
        userRef,
        {
          uid: currentUser.uid,
          email: currentUser.email,
          username: username.trim(),
          emailVerified: currentUser.emailVerified,

          photoURL: currentUser.photoURL || null,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      const updatedDoc = await getDoc(userRef);
      const profileData = updatedDoc.exists() ? updatedDoc.data() : {};

      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        ...profileData,
      });

      toast.success("Profile completed!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to save profile.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-stone-800 p-6 rounded-xl shadow"
      >
        <h1 className="text-xl font-bold text-center">Complete Your Profile</h1>
        <p className="text-sm text-gray-300 text-center">
          Please choose a unique username to continue.
        </p>

        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <div className="flex gap-2">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value.toLowerCase());
                setAvailable(null);
              }}
              className="flex-1 px-3 py-2 rounded-md text-black"
              required
            />
            <button
              type="button"
              onClick={checkAvailability}
              className="px-3 py-2 bg-blue-600 rounded-md text-white text-sm hover:bg-blue-700"
              disabled={checking || !username.trim()}
            >
              {checking ? "Checking..." : "Check"}
            </button>
          </div>
          {available === true && (
            <p className="text-green-400 text-sm">✅ Username is available!</p>
          )}
          {available === false && (
            <p className="text-red-400 text-sm">❌ Username is taken.</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!available || submitting}
          className="w-full py-2 bg-green-600 rounded-md text-white font-medium hover:bg-green-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Finish"}
        </button>
      </form>
    </div>
  );
}

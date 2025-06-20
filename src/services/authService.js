//Handles authentication (login, signup, Google)
import { googleProvider } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/services/firebase";

import { validateUsername } from "@/helpers";
import { resolveEmailFromUsername, saveUserToFirestore } from "@/services";

export const registerWithEmail = async (email, password, username) => {
  const validationError = validateUsername(username);
  if (validationError) throw new Error(validationError);

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    throw new Error("Username already taken");
  }

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(usersRef, user.uid), {
    uid: user.uid,
    email,
    username,
    createdAt: serverTimestamp(),
  });

  await sendEmailVerification(user);
  toast.success("Verification email sent. Please check your inbox.");
  return user;
};

// 🧠 Smart login with email or username
export const smartLogin = async (identifier, password) => {
  const email = await resolveEmailFromUsername(identifier);
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔁 Basic email login (if you don't need smart login)
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔐 Google sign-in with Firestore record
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  await saveUserToFirestore(user); // 🔁 ensure user is in Firestore
  return user;
};

// 5. Account Recovery and Verification

// 🔄 Forgot password
export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

// 🔁 Resend email verification
export const resendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not signed in.");
  await user.sendEmailVerification();
};

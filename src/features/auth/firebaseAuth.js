import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/services/firebase";

const provider = new GoogleAuthProvider();

export const registerWithEmail = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(user);
  return user;
};

export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "@/services/firebase";

export const saveUserToFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const defaultUsername = user.email?.split("@")[0] || "user" + Date.now();
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email,
        username: defaultUsername,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
};

export const resolveEmailFromUsername = async (identifier) => {
  if (identifier.includes("@")) return identifier;

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", identifier));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("No user found with that username.");
  }

  const userData = snapshot.docs[0].data();
  return userData.email;
};

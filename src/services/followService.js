import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function followSeller(userId, sellerId) {
  const followRef = doc(db, "users", userId, "follows", sellerId);
  await setDoc(followRef, {
    followedAt: new Date(),
  });
}

export async function unfollowSeller(userId, sellerId) {
  const followRef = doc(db, "users", userId, "follows", sellerId);
  await deleteDoc(followRef);
}

export async function isFollowing(userId, sellerId) {
  const followRef = doc(db, "users", userId, "follows", sellerId);
  const snap = await getDoc(followRef);
  return snap.exists();
}

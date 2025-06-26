import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

import * as BadWords from "bad-words";
import emojiRegex from "emoji-regex";

const filter = new BadWords.Filter();
const emojiPattern = emojiRegex();

export const validateUsername = (username) => {
  if (filter.isProfane(username) || emojiPattern.test(username)) {
    return "Username can't be accepted";
  }

  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username contains invalid characters.";
  }

  if (username.length < 3 || username.length > 20) {
    return "Username must be between 3 and 20 characters.";
  }

  return null;
};

export const isUsernameAvailable = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);
  return snapshot.empty;
};

// Handles input validation
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

import * as BadWords from "bad-words";
import emojiRegex from "emoji-regex";

const filter = new BadWords.Filter();
const emojiPattern = emojiRegex();

// Validate username, return error message or null if valid
export const validateUsername = (username) => {
  // If profanity or emoji found, return generic error to hide real reason
  if (filter.isProfane(username) || emojiPattern.test(username)) {
    return "Username can't be accepted";
  }

  // Allow only letters and numbers (no underscores, dots, hyphens, symbols)
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "Username contains invalid characters.";
  }

  if (username.length < 3 || username.length > 20) {
    return "Username must be between 3 and 20 characters.";
  }

  return null; // valid
};

// Check username availability (assumes valid username)
export const isUsernameAvailable = async (username) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);
  return snapshot.empty; // true if available
};

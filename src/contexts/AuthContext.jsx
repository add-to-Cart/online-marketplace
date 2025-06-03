import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/services/firebase"; // adjust the path if needed

const AuthContext = createContext();

const initialState = { user: null };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

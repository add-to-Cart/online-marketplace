// contexts/SellerContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setSeller(null);
        setChecking(false);
        return;
      }

      const sellerRef = doc(db, "sellers", user.uid);
      const docSnap = await getDoc(sellerRef);

      if (docSnap.exists() && docSnap.data().isApproved) {
        setSeller({ ...docSnap.data() });
      } else {
        setSeller(null);
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SellerContext.Provider value={{ seller, checking }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => useContext(SellerContext);

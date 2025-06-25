import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

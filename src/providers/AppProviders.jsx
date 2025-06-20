import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { UserProvider } from "@/contexts/UserContext";
import { SellerProvider } from "@/contexts/SellerContext";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <SellerProvider>
          <CartProvider>{children}</CartProvider>
        </SellerProvider>
      </UserProvider>
    </AuthProvider>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  increment,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [user, navigate]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setLoading(true);
    try {
      const updatePromises = cartItems.map((item) =>
        updateDoc(doc(db, "products", item.id), {
          soldCount: increment(item.quantity),
        })
      );

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
        createdAt: serverTimestamp(),
      });

      await Promise.all(updatePromises);

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-md w-full">
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-2 text-gray-700 text-sm"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>

            <p className="font-semibold text-gray-800 mb-3 text-right">
              Total: ₱{total.toLocaleString()}
            </p>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

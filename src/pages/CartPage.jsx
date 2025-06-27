import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-gray-700 mt-12">
        <h1 className="text-xl font-semibold mb-2">Your cart is empty 🛒</h1>
        <Link
          to="/market"
          className="text-blue-600 hover:underline text-sm transition"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 text-gray-800">
      <h1 className="text-xl font-bold mb-4">Your Cart</h1>

      <ul className="space-y-3">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between bg-gray-100 border border-gray-300 p-3 rounded-md"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₱{item.price.toLocaleString()} x {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-6 border-t border-gray-300 pt-4">
        <p className="font-semibold">Total:</p>
        <p className="text-lg font-bold text-blue-600">
          ₱{total.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between mt-6 gap-3">
        <button
          onClick={clearCart}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-200 transition"
        >
          Clear Cart
        </button>
        <button
          onClick={handleCheckout}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

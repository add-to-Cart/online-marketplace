import { Link } from "react-router-dom";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for your order. We will process it shortly.
        </p>
        <Link
          to="/market"
          className="inline-block w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

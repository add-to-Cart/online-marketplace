import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockProducts from "@/features/products/data/mockProducts";
import mockStores from "@/features/stores/data/mockStores";
import { useAuth } from "@/contexts/AuthContext";
import { StarIcon } from "@heroicons/react/24/solid";

function RatingStars({ rating }) {
  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[1, 2, 3, 4, 5].map((num) => (
        <StarIcon
          key={num}
          className={`h-4 w-4 ${
            rating >= num ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = mockProducts.find((p) => p.id === productId);
  if (!product)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Product not found
      </div>
    );

  const store = mockStores.find((s) => s.id === product.storeId);

  // Follow button state
  const [following, setFollowing] = useState(false);

  const handleButtonClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      alert(`Product "${product.name}" added to cart.`);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      alert(`Proceeding to buy "${product.name}".`);
    }
  };

  const toggleFollow = () => setFollowing((f) => !f);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Product Image */}
        <div className="col-span-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
          />
        </div>

        {/* Product Details */}
        <div className="col-span-2 space-y-6">
          <h1 className="font-medium">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <RatingStars className="h-2 w-2" rating={product.rating} />
            <span className="text-gray-600">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-lg text-gray-700">{product.description}</p>

          <p className="text-2xl font-bold text-indigo-600">
            ₱{product.price.toLocaleString()}
          </p>

          {/* Variations example (hardcoded here, you can extend) */}
          <div>
            <label className="block mb-2 font-medium">Brand</label>
            <select className="border rounded-md p-2 w-48">
              <option>{product.brand}</option>
              {/* Add more brands or variations here */}
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleButtonClick}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Seller / Store Info */}
          {store && (
            <div className="border-t pt-6 space-y-4">
              <h2 className="text-2xl font-semibold">Seller Information</h2>
              <div className="flex items-center space-x-4">
                <img
                  src={store.logoUrl}
                  alt={store.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h3 className="text-lg font-medium">{store.name}</h3>
                  <RatingStars rating={store.rating} />
                  <p className="text-gray-600">{store.reviewCount} reviews</p>
                  <p className="text-gray-600">{store.productCount} products</p>
                  <p className="text-gray-600">Location: {store.location}</p>
                  <p className="text-gray-600">
                    Joined: {new Date(store.joinedDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Followers: {store.followers.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={toggleFollow}
                  className={`ml-auto px-4 py-2 rounded-md border ${
                    following
                      ? "bg-indigo-600 text-white"
                      : "border-indigo-600 text-indigo-600"
                  } hover:bg-indigo-700 hover:text-white transition`}
                >
                  {following ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="border-t pt-6 space-y-4">
            <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            {product.reviews.length === 0 && (
              <p className="text-gray-600">No reviews yet.</p>
            )}
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border p-4 rounded-md space-y-1">
                <div className="flex items-center space-x-2">
                  <strong>{review.username}</strong>
                  <RatingStars rating={review.rating} />
                  <span className="text-gray-500 text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

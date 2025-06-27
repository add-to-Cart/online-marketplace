import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  followSeller,
  unfollowSeller,
  isFollowing,
} from "@/services/followService";
import { getRecommendedProducts } from "@/services/recommendationService";

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
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
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [related, setRelated] = useState([]);
  const [following, setFollowing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          setProduct(null);
          return;
        }

        const productData = productSnap.data();
        productData.id = productSnap.id;
        setProduct(productData);

        await updateDoc(productRef, { viewCount: increment(1) });

        if (user) {
          const historyRef = doc(
            db,
            "users",
            user.uid,
            "viewHistory",
            productId
          );
          await setDoc(
            historyRef,
            {
              viewedAt: new Date(),
              tags: productData.tags || [],
              category: productData.category || "",
              style: productData.style || "",
              name: productData.name,
              imageUrl: productData.imageUrl,
            },
            { merge: true }
          );
        }

        if (productData.sellerId) {
          const storeRef = doc(db, "users", productData.sellerId);
          const storeSnap = await getDoc(storeRef);
          if (storeSnap.exists()) {
            setStore(storeSnap.data());
          }

          if (user && user.uid !== productData.sellerId) {
            const result = await isFollowing(user.uid, productData.sellerId);
            setFollowing(result);
          }
        }

        const recommended = await getRecommendedProducts(productData);
        setRelated(recommended);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
        setLoadingRelated(false);
      }
    };

    fetchData();
  }, [productId, user]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`✅ "${product.name}" added to cart.`);
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      alert(`🛒 Proceeding to buy "${product.name}".`);
    }
  };

  const toggleFollow = async () => {
    if (!user || !product?.sellerId || user.uid === product.sellerId) return;
    try {
      if (following) {
        await unfollowSeller(user.uid, product.sellerId);
        setFollowing(false);
      } else {
        await followSeller(user.uid, product.sellerId);
        setFollowing(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="h-48 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-80 object-contain rounded bg-white shadow-sm"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <RatingStars rating={4} />
            <span>(123 reviews)</span>
          </div>
          <p className="text-xl font-bold text-blue-600">
            ₱{product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-700">{product.description}</p>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 border rounded text-center"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {store && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={store.avatarUrl || "/default-avatar.svg"}
              alt={store.username}
              className="w-12 h-12 rounded-full object-cover bg-gray-900"
            />
            <p className="font-semibold text-gray-800">
              {store.storeName || store.username}
            </p>
          </div>
          {user?.uid !== product.sellerId && (
            <div className="flex gap-2">
              <button
                onClick={toggleFollow}
                className={`px-3 py-1 rounded text-sm ${
                  following
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600"
                } hover:bg-blue-700 hover:text-white transition`}
              >
                {following ? "Following" : "Follow"}
              </button>
              <button
                onClick={() =>
                  user
                    ? navigate(`/messages?sellerId=${product.sellerId}`)
                    : navigate("/login", {
                        state: { from: `/products/${productId}` },
                      })
                }
                className="px-3 py-1 rounded text-sm border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition"
              >
                Message Seller
              </button>
            </div>
          )}
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-800">Shipping & Returns</h3>
        <p className="text-sm text-gray-700">
          Free shipping for orders over ₱1000. Return within 7 days if unused
          and in original packaging.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">FAQ</h3>
        <p className="text-sm text-gray-700">
          Q: Is this product original? <br />
          A: Yes, all products are authentic.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800">Customer Reviews</h3>
        <p className="text-sm text-gray-700">
          ⭐ 4.5 based on 123 reviews. (Feature coming soon for customers to
          leave reviews.)
        </p>
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            You may also like
          </h3>
          {loadingRelated ? (
            <p className="text-sm text-gray-500">Loading recommendations...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/products/${item.id}`)}
                  className="cursor-pointer p-2 hover:bg-gray-50 rounded transition"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 object-contain mb-1"
                  />
                  <p className="text-sm text-gray-800 truncate">{item.name}</p>
                  <p className="text-sm text-blue-600 font-semibold">
                    ₱{item.price?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

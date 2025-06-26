import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { StarIcon } from "@heroicons/react/24/solid";
import useRelatedProducts from "@/hooks/useRelatedProducts";

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-yellow-400">
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

  const [product, setProduct] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
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
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        alert("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, user]);

  const { related, loading: loadingRelated } = useRelatedProducts(product);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      alert(`✅ "${product.name}" added to cart.`);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${productId}` } });
    } else {
      alert(`🛒 Proceeding to buy "${product.name}".`);
    }
  };

  const toggleFollow = () => setFollowing((f) => !f);

  if (loading)
    return <div className="p-6 text-gray-600">Loading product details...</div>;
  if (!product)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-contain rounded-md border border-gray-100"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <RatingStars rating={4} />
            <span>(123 reviews)</span>
          </div>

          <p className="text-gray-600 text-sm">{product.description}</p>

          <p className="text-2xl font-bold text-blue-600">
            ₱{product.price.toLocaleString()}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              Category:{" "}
              <span className="font-medium text-gray-700">
                {product.category}
              </span>
            </p>
            <p>
              Style:{" "}
              <span className="font-medium text-gray-700">
                {Array.isArray(product.style)
                  ? product.style.join(", ")
                  : product.style}
              </span>
            </p>
            <p>
              Vehicle:{" "}
              <span className="font-medium text-gray-700">
                {product.vehicleType}
              </span>
            </p>
            <p>
              Stock:{" "}
              <span className="font-medium text-gray-700">{product.stock}</span>
            </p>
            <p>
              Status:{" "}
              <span
                className={
                  product.isAvailable
                    ? "text-green-600 font-medium"
                    : "text-red-500"
                }
              >
                {product.isAvailable ? "Available" : "Out of Stock"}
              </span>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {store && (
        <div className="mt-12 p-6 bg-white border border-gray-100 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={store.avatarUrl || "/default-avatar.png"}
                alt={store.username}
                className="w-14 h-14 rounded-full border border-gray-200 object-cover"
              />
              <div>
                <h2 className="text-base font-semibold">
                  {store.storeName || store.username}
                </h2>
                <p className="text-sm text-gray-500">{store.email}</p>
              </div>
            </div>
            <button
              onClick={toggleFollow}
              className={`text-sm px-3 py-1.5 rounded border ${
                following
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 border-blue-600"
              } hover:bg-blue-700 hover:text-white`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            You may also like
          </h3>
          {loadingRelated ? (
            <p className="text-sm text-gray-500">Loading recommendations...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map((item) => (
                <div
                  key={item.id}
                  className="border rounded p-3 bg-white hover:shadow transition cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.name}
                  </p>
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

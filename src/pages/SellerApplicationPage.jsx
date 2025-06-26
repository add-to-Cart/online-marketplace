import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ApplyAsSellerPage() {
  const { user, setUser } = useUser();
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storeName.trim()) return toast.error("Store name is required");
    if (!storeDescription.trim()) return toast.error("Description is required");

    setLoading(true);
    try {
      const sellerData = {
        uid: user.uid,
        storeName: storeName.trim(),
        storeDescription: storeDescription.trim(),
        isApproved: false,
        requestedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "sellers", user.uid), sellerData);

      setUser((prev) => ({
        ...prev,
        seller: {
          ...sellerData,
          requestedAt: new Date(),
        },
      }));

      toast.success("Seller application submitted!");
      navigate("/");
    } catch (err) {
      alert(err);
      toast.error("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Apply as a Seller
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Store Name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="e.g., FastPartsPH"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Store Description
          </label>
          <textarea
            value={storeDescription}
            onChange={(e) => setStoreDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-none"
            rows={4}
            placeholder="Briefly describe what you plan to sell..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  limit,
  startAfter,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { toast } from "react-hot-toast";

const PAGE_SIZE = 5;

export default function AdminSellerDashboard() {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [approvedSellers, setApprovedSellers] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setPendingSellers([]);
    fetchPendingSellers();
    fetchApprovedSellers();
  }, []);

  const fetchPendingSellers = async (start = null) => {
    setLoading(true);
    try {
      let q = query(
        collection(db, "sellers"),
        where("isApproved", "==", false),
        orderBy("requestedAt", "desc"),
        limit(PAGE_SIZE)
      );

      if (start) q = query(q, startAfter(start));

      const snapshot = await getDocs(q);
      const sellers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPendingSellers(start ? (prev) => [...prev, ...sellers] : sellers);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (error) {
      toast.error("Failed to load seller requests.");
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedSellers = async () => {
    try {
      const q = query(
        collection(db, "sellers"),
        where("isApproved", "==", true),
        orderBy("approvedAt", "desc")
      );
      const snapshot = await getDocs(q);
      const sellers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApprovedSellers(sellers);
    } catch (error) {
      alert(error);
      toast.error("Failed to load approved sellers.");
    }
  };

  const handleApprove = async (uid, storeName) => {
    try {
      await updateDoc(doc(db, "sellers", uid), {
        isApproved: true,
        approvedAt: new Date(),
      });

      toast.success(`✅ Approved seller: ${storeName}`);
      simulateEmail(uid, storeName, "approved");
      setPendingSellers((prev) => prev.filter((s) => s.id !== uid));
      fetchApprovedSellers();
    } catch (error) {
      alert(error);
      toast.error("Failed to approve seller.");
    }
  };

  const handleReject = async (uid, storeName) => {
    try {
      await deleteDoc(doc(db, "sellers", uid));
      toast("❌ Seller application rejected.");
      simulateEmail(uid, storeName, "rejected");
      setPendingSellers((prev) => prev.filter((s) => s.id !== uid));
    } catch (error) {
      alert(error);
      toast.error("Failed to reject seller.");
    }
  };

  const simulateEmail = (uid, storeName, type) => {
    const message =
      type === "approved"
        ? `Hi ${storeName}, your seller application has been approved.`
        : `Hi ${storeName}, your seller application has been rejected.`;
    alert(`📧 Simulated Email to UID ${uid}: ${message}`);
  };

  const filteredApproved = approvedSellers.filter((seller) =>
    seller.storeName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-xl font-bold mb-4">Pending Seller Applications</h2>
        {loading && !pendingSellers.length && <p>Loading...</p>}
        {pendingSellers.length === 0 && !loading ? (
          <p className="text-gray-500">No pending applications.</p>
        ) : (
          <div className="space-y-4">
            {pendingSellers.map((seller) => (
              <div
                key={seller.id}
                className="p-4 border rounded bg-white shadow-sm"
              >
                <h3 className="text-lg font-semibold">{seller.storeName}</h3>
                <p className="text-sm text-gray-600">
                  {seller.storeDescription}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleApprove(seller.id, seller.storeName)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(seller.id, seller.storeName)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={() => fetchPendingSellers(lastVisible)}
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Approved Sellers</h2>
        <input
          type="text"
          placeholder="Search store name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        {filteredApproved.length === 0 ? (
          <p className="text-gray-500">No approved sellers found.</p>
        ) : (
          <div className="space-y-3">
            {filteredApproved.map((seller) => (
              <div
                key={seller.id}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <h4 className="font-semibold text-gray-800">
                  {seller.storeName}
                </h4>
                <p className="text-sm text-gray-600">
                  {seller.storeDescription}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

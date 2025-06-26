import { useState, useEffect } from "react";
import { db } from "@/services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const ref = collection(db, "orders");
      const q = query(ref, where("uid", "==", auth.currentUser.uid));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    load();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Recent Orders</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Buyer</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.buyerName}</td>
              <td>{o.productName}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

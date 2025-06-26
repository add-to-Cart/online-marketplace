export default function SellerSidebar({ seller }) {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <div className="text-center space-y-2">
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto" />
        <p className="text-sm text-gray-600">SELLER ID: {seller.uid}</p>
        <h2 className="font-bold">{seller.storeName}</h2>
      </div>
    </aside>
  );
}

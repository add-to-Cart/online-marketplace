export default function SalesPanel() {
  return (
    <>
      <header className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Logged in as: {user?.email}</div>
      </header>

      <section className="grid grid-cols-2 gap-6">
        <div className="p-4 border border-gray-200 rounded bg-white">
          <h2 className="text-sm text-gray-500 mb-1">Total Sales</h2>
          <p className="text-2xl font-semibold text-gray-800">₱12,340</p>
        </div>
        <div className="p-4 border border-gray-200 rounded bg-white">
          <h2 className="text-sm text-gray-500 mb-1">Orders</h2>
          <p className="text-2xl font-semibold text-gray-800">28</p>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded p-4">
        <h2 className="text-base font-medium mb-2">Recent Orders</h2>
        <p className="text-sm text-gray-500">No recent orders to show.</p>
      </section>
    </>
  );
}

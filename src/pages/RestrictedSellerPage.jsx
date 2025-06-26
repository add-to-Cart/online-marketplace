export default function RestrictedSellerPage() {
  return (
    <div className="p-8 max-w-xl mx-auto text-center text-red-600">
      <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
      <p>You must be an approved seller to access this page.</p>
    </div>
  );
}

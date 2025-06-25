import MarketplaceGrid from "@/features/marketplace/MarketplaceGrid";

export default function MarketplacePage() {
  return (
    <div className="px-4 py-6 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Marketplace</h1>
      <MarketplaceGrid />
    </div>
  );
}

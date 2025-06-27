export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-lg p-3">
      <div className="bg-gray-200 h-36 w-full rounded mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  );
}

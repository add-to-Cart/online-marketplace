export default function getRankedProducts(products) {
  if (!products || products.length === 0) return [];

  // Get min and max for normalization
  const viewsArr = products.map((p) => p.viewCount || 0);
  const soldArr = products.map((p) => p.soldCount || 0);

  const minViews = Math.min(...viewsArr);
  const maxViews = Math.max(...viewsArr);

  const minSold = Math.min(...soldArr);
  const maxSold = Math.max(...soldArr);

  const normalize = (value, min, max) => {
    if (max === min) return 0;
    return (value - min) / (max - min);
  };

  const rankedProducts = products.map((product) => {
    const views = product.viewCount || 0;
    const sold = product.soldCount || 0;
    const rating = product.rating || 0;
    const numRatings = product.numRatings || 0;

    // Normalize
    const normalizedViews = normalize(views, minViews, maxViews);
    const normalizedSold = normalize(sold, minSold, maxSold);
    const normalizedRating = rating / 5; // already between 0 and 1

    // Weighting
    const trustBoost = Math.log(numRatings + 1); // prevents overweighting 1 rating
    const score =
      normalizedSold * 0.5 +
      normalizedRating * 0.3 * trustBoost +
      normalizedViews * 0.2;

    return {
      ...product,
      score: Number(score.toFixed(4)), // optional: keep 4 decimal places
    };
  });

  // Sort by descending score
  return rankedProducts.sort((a, b) => b.score - a.score);
}

export default function formatCreatedAt(timestamp) {
  if (!timestamp) return "";
  const now = new Date();
  const createdDate = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);
  const diffMs = now - createdDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  const isToday = now.toDateString() === createdDate.toDateString();

  if (isToday && diffHours >= 1) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (isToday && diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  } else {
    return createdDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

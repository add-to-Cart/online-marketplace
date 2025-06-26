export const deleteImage = async (publicId) => {
  const res = await fetch(
    "https://express-api-d7v4.onrender.com/api/delete-image",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    }
  );

  const data = await res.json();

  if (!res.ok || data.result?.result !== "ok") {
    throw new Error(data.error || "Failed to delete image");
  }

  return true;
};

export const deleteImage = async (publicId) => {
  const res = await fetch(
    "https://express-api-d7v4.onrender.com/api/delete-image",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    }
  );

  const text = await res.text();

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }

  return JSON.parse(text).result;
};

export const deleteImage = async (publicId) => {
  const res = await fetch(
    "https://express-api-d7v4.onrender.com/api/delete-image",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    }
  );

  const text = await res.text(); // read raw text for now
  console.log("Raw delete response:", text); // ✅ view in browser console

  if (!res.ok) {
    throw new Error("Failed to delete image");
  }

  return JSON.parse(text).result;
};

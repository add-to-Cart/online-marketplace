import axios from "axios";

// Replace this with your actual Render URL (after it deploys)
const API_BASE = "https://your-api-name.onrender.com";

export async function deleteImage(publicId) {
  const res = await axios.post(`${API_BASE}/api/delete-image`, { publicId });
  return res.data;
}

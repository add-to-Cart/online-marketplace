import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

app.use(express.json());

app.post("/api/delete-image", async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ error: "Missing publicId" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: "Cloudinary deletion failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Express API is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const CLOUD_NAME = "dirp2do2b";
const UPLOAD_PRESET_AVATAR = "avatar_upload";
const UPLOAD_PRESET_PRODUCT = "product_upload";

const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
/**
 * Upload file to Cloudinary with a given preset
 */
const uploadToCloudinary = async (file, preset) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const response = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || "Upload failed");

  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
};

/**
 * Upload user avatar
 */
export const uploadAvatar = async (file) => {
  return await uploadToCloudinary(file, UPLOAD_PRESET_AVATAR);
};

/**
 * Upload product image
 */
export const uploadProductImage = async (file) => {
  return await uploadToCloudinary(file, UPLOAD_PRESET_PRODUCT);
};

/**
 * (Optional) Generate transformed image URL
 */
export const getTransformedImageUrl = ({
  publicId,
  width = 300,
  height = 300,
  crop = "fill",
}) => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},h_${height},c_${crop}/${publicId}.jpg`;
};

/**
 * ⚠️ Image deletion must be handled server-side for security
 */
export const deleteImage = async () => {
  throw new Error(
    "Image deletion requires a secure backend (not safe on client)"
  );
};

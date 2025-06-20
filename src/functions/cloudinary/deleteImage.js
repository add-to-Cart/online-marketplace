const functions = require("firebase-functions");
const cloudinary = require("./config");

exports.deleteImage = functions.https.onCall(async (data, context) => {
  const { publicId } = data;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be logged in."
    );
  }

  if (!publicId) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing publicId"
    );
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { result };
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Cloudinary deletion failed"
    );
  }
});

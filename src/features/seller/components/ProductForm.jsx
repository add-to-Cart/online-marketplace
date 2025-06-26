import { useState, useRef, useEffect } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { uploadProductImage } from "@/services/cloudinary";
import { useUser } from "@/contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm({ existingProduct = null }) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [category, setCategory] = useState("");
  const [styles, setStyles] = useState([]);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [tags, setTags] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const docRef = doc(db, "products", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setPrice(data.price || "");
        setCategory(data.category || "");
        setStyles(data.styles || []);
        setVehicleType(data.vehicleType || "");
        setDescription(data.description || "");
        setStock(data.stock || "");
        setTags(data.tags?.join(", ") || "");
        setIsAvailable(data.isAvailable ?? true);
        setPreview(data.imageUrl || "");
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="p-4 text-gray-600 text-sm">Loading user...</p>;
  }

  if (!user || !user.seller || !user.seller.isApproved) {
    navigate("/not-a-seller");
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !price ||
      !category ||
      styles.length === 0 ||
      !stock ||
      !description ||
      (!id && !image) ||
      !vehicleType
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    try {
      let imageUrl = preview;
      let publicId = null;

      if (image) {
        const upload = await uploadProductImage(image, {
          publicId: `products/${user.uid}-${name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
        });
        imageUrl = upload.url;
        publicId = upload.publicId;
      }

      const productData = {
        name: name.trim(),
        price: parseFloat(price),
        category,
        styles,
        vehicleType,
        description: description.trim(),
        stock: parseInt(stock),
        tags: tags.split(",").map((tag) => tag.trim().toLowerCase()),
        isAvailable,
        imageUrl,
        sellerId: user.uid,
        storeName: user.seller?.storeName || "",
      };

      if (publicId) {
        productData.cloudinaryId = publicId;
      }

      if (id) {
        await updateDoc(doc(db, "products", id), productData);
        alert("✅ Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: serverTimestamp(),
        });
        alert("✅ Product added successfully!");
      }

      navigate("/seller/products");
    } catch (err) {
      alert("❌ Failed to submit product", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 border border-gray-200 rounded-lg shadow-sm space-y-6"
    >
      <h2 className="text-lg font-semibold text-gray-800">Add New Product</h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <div className="mt-2 space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded border"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-sm text-red-500 hover:underline"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Price (₱)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          {[
            "Lights",
            "Rims",
            "Tires",
            "Brake System",
            "Suspension",
            "Controls",
            "Electronics",
            "Exterior Accessories",
            "Interior Accessories",
            "Protective Gear",
            "Performance Parts",
            "Body & Frame",
            "Storage",
            "Universal Accessories",
          ].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Build Styles</label>
        <div className="flex flex-wrap gap-3">
          {[
            "OEM+",
            "Touring",
            "Classic",
            "Commuter",
            "Sporty (Legal)",
            "Adventure",
          ].map((option) => (
            <label
              key={option}
              className="text-sm text-gray-700 flex items-center gap-1"
            >
              <input
                type="checkbox"
                value={option}
                checked={styles.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setStyles([...styles, option]);
                  } else {
                    setStyles(styles.filter((s) => s !== option));
                  }
                }}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Vehicle Type</label>
        <select
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
        >
          <option value="" disabled hidden>
            Select Vehicle Type
          </option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Car">Car</option>
          <option value="Universal">Universal</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. Yamaha, disc, gold"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        <label className="text-sm text-gray-700">Product is available</label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition ${
          submitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {submitting ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
}

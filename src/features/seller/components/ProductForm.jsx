import { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Rims");
  const [style, setStyle] = useState("Sporty");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Please fill out all fields");

    onAdd({ name, price, category, style });
    setName("");
    setPrice("");
    setCategory("Rims");
    setStyle("Sporty");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add Product</h2>

      <div>
        <label className="block text-sm">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Price (₱)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border px-3 py-1 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border px-3 py-1 rounded"
        >
          <option>Rims</option>
          <option>Brake Caliper</option>
          <option>Brake Lever</option>
          <option>Spokes</option>
          <option>Fairings</option>
          <option>Front Shock</option>
          <option>Rear Shock</option>
          <option>Hubs</option>
          <option>Lights</option>
          <option>Tires</option>
          <option>Chassis</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Build Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full border px-3 py-1 rounded"
        >
          <option>Sporty</option>
          <option>Classic</option>
          <option>Off-road</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Add Product
      </button>
    </form>
  );
}

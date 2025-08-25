import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("creators").insert([formData]);
    if (error) {
      console.error("Error adding creator:", error);
      alert("Failed to add creator.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add a New Creator</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g., John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input
            id="url"
            type="url"
            name="url"
            placeholder="https://example.com"
            value={formData.url}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="A short bio about the creator..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            required
          />
        </div>
        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
          <input
            id="imageURL"
            type="url"
            name="imageURL"
            placeholder="https://example.com/image.png"
            value={formData.imageURL}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Creator
        </button>
      </form>
    </div>
  );
}

export default AddCreator;
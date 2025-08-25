import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from("creators").select().eq("id", id).single();
      if (error) {
        console.error("Error fetching creator:", error);
        navigate("/"); // Redirect if creator not found
      } else {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id, navigate]);

  if (!creator) return <p className="text-center mt-10 text-gray-600">Loading Creator...</p>;

  const handleChange = (e) => setCreator({ ...creator, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("creators").update(creator).eq("id", id);
    if (error) {
      console.error("Error updating creator:", error);
      alert("Failed to update creator.");
    } else {
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this creator?")) {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) {
        console.error("Error deleting creator:", error);
        alert("Failed to delete creator.");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Creator</h2>
      <form className="space-y-6" onSubmit={handleUpdate}>
        {/* Input fields with labels for better accessibility */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input id="name" type="text" name="name" value={creator.name} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input id="url" type="url" name="url" value={creator.url} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="description" name="description" rows="4" value={creator.description} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" required />
        </div>
        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input id="imageURL" type="url" name="imageURL" value={creator.imageURL || ''} onChange={handleChange} className="w-full border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">
            Update Creator
          </button>
          <button type="button" onClick={handleDelete} className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300">
            Delete Creator
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCreator;
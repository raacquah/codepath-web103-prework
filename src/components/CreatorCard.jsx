import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function CreatorCard({ creator }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    // A confirmation step is good practice for delete actions
    if (window.confirm(`Are you sure you want to delete ${creator.name}?`)) {
      const { error } = await supabase.from("creators").delete().eq("id", creator.id);
      if (error) {
        console.error("Error deleting creator:", error);
      } else {
        navigate(0); // refresh page
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 m-4 w-72 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-100"
        />
      )}
      <h2 className="text-xl font-bold text-gray-800 mb-1">{creator.name}</h2>
      <p className="text-gray-500 mb-4 text-center px-2">{creator.description}</p>

      <div className="flex justify-center items-center space-x-4 mt-auto pt-4 border-t border-gray-200 w-full">
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
        >
          Visit
        </a>
        <Link
          to={`/creator/${creator.id}`}
          className="text-green-600 hover:text-green-800 font-medium transition-colors"
        >
          View
        </Link>
        <Link
          to={`/edit/${creator.id}`}
          className="text-gray-500 hover:text-gray-700 font-medium transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CreatorCard;
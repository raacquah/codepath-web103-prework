import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";

function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase.from("creators").select().eq("id", id).single();
      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id]);

  if (!creator) return <p className="text-center mt-10 text-gray-600">Loading Creator...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="text-center">
        {creator.imageURL && (
          <img
            src={creator.imageURL}
            alt={creator.name}
            className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-8 border-gray-100"
          />
        )}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{creator.name}</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">{creator.description}</p>
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors duration-300 text-lg"
        >
          Visit Website
        </a>
      </div>
      <div className="mt-10 text-center">
        <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
          &larr; Back to All Creators
        </Link>
      </div>
    </div>
  );
}

export default ViewCreator;
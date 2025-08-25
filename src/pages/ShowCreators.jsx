import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import CreatorCard from "../components/CreatorCard";
import { Link } from "react-router-dom";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("creators").select().order('created_at', { ascending: false });
      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data);
      }
      setLoading(false);
    };
    fetchCreators();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center items-center mb-8">
        <Link
          to="/add"
          className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
        >
          Add New Creator
        </Link>
      </div>
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading Creators...</p>
      ) : creators.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10 p-8 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">No creators found.</h3>
            <p>Why not be the first to add one?</p>
        </div>
      )}
    </div>
  );
}

export default ShowCreators;
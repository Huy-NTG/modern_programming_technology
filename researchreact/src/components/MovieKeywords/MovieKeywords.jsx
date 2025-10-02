import React from 'react'
import { useEffect, useState } from "react";
import "./MovieKeywords.css"
const MovieKeywords = ({ movieId }) => {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
    const BASE_URL = "https://api.themoviedb.org/3";
    useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}/keywords`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setKeywords(data.keywords || []);
      } catch (err) {
        console.error("Error fetching keywords:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchKeywords();
  }, [movieId]);

  if (loading) return <p>Đang tải keywords...</p>;
  if (keywords.length === 0) return <p>Không có keywords nào.</p>;
    return (
        <div className="movie-keywords">
            <h3>Keywords</h3>
            <div className="keywords-list">
                {keywords.map((kw) => (
                <span className="keyword-tag" key={kw.id}>
                    {kw.name}
                </span>
                ))}
            </div>
        </div>
    )
}

export default MovieKeywords

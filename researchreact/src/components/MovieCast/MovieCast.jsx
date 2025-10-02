import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCast.css"
const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setCast(data.cast || []);
      } catch (err) {
        console.error("Error fetching cast:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) return <p>Đang tải diễn viên...</p>;

  return (
    <div className="movie-cast">
      <h2>Cast</h2>
      <div className="cast-list">
        {cast.slice(0, 10).map((actor) => (
          <Link key={actor.id} to={`/actor/${actor.id}`} className="cast-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={actor.name}
            />
            <div className="cast-info">
              <p className="actor-name">{actor.name}</p>
              <p className="character-name">as {actor.character}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieCast

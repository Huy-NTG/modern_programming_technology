import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './ActorKnowFor.css'

const ActorKnowFor = ({ actorId }) => {
  const [movies, setMovies] = useState([]);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/person/${actorId}/movie_credits?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        const data = await res.json();

        if (data.cast) {
          // Sắp xếp theo vote_average (từ cao xuống thấp)
          // const sorted = [...data.cast].sort(
          //   (a, b) => b.vote_average - a.vote_average
          // );
          // Lấy top 6 phim
          // setMovies(sorted.slice(0, 10));
           setMovies(data.cast.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching known for movies:", error);
      }
    };

    fetchMovies();
  }, [actorId]);

  if (movies.length === 0) return <p className="loading">Loading movies...</p>;
  return (
    <div className="actor-known-for">
      <h3>Known For</h3>
      <div className="movie-grid">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}  className="actor-movie-card">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
            />
            <p className="movie-title">{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ActorKnowFor
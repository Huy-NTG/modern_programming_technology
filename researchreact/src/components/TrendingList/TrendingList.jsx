import React from 'react'
import { useEffect, useState } from "react";
import './TrendingList.css'
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};
const TrendingList = ({ timeWindow = "day" }) => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrending = async () => {
        try {
            const res = await fetch(
            `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=en-US`,
            options
            );
            const data = await res.json();
            setMovies(data.results || []);
        } catch (err) {
            console.error("Error fetching trending:", err);
        }
        };

        fetchTrending();
    }, [timeWindow]);
  return (
     <div className="trending-list">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="trending-card"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
            {/* Rating vòng tròn */}
            <div className='rating-container'>
              <CircularProgressbar
                value={movie.vote_average * 10}
                text={`${Math.round(movie.vote_average * 10)}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: movie.vote_average >= 7 ? "green" : "orange",
                  trailColor: "#222",
                  textSize: "30px",
                })}
              />
            </div>
          <div className="trending-info">
            <h4>{movie.title}</h4>
            <p>{new Date(movie.release_date).toDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrendingList
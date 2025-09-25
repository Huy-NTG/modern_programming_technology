import React from 'react'
import './MovieCard.css'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const MovieCard = ({ movie, onClick, variant = "popular" }) => {
  return (
    <div className={`movie-card ${variant}`} onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="rating-container-movieCard">
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
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
       
        {/* <p>{movie.overview.substring(0, 100)}...</p> */}
      </div>
    </div>
  )
}

export default MovieCard

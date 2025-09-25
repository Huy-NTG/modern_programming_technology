import React from 'react'
import './TrendingCard.css'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./TrendingCard.css";
const TrendingCard = ({ movie, onClick }) => {
  return (
    <div className="trending-card" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      {/* Rating vòng tròn */}
      <div className="rating-container">
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
  )
}

export default TrendingCard
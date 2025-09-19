import React from 'react'
import './MovieCard.css'
const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Release: {movie.release_date}</p>
        <p>⭐ {movie.vote_average}</p>
        <p>{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  )
}

export default MovieCard

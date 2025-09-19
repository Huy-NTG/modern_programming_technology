// components/MovieList.jsx
import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import './MovieList.css'
const MovieList = ({ movies, onMovieClick }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;

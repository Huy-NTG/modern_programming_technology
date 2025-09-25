// components/MovieList.jsx
import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import './MovieList.css'
const MovieList = ({ movies, onMovieClick, variant = "popular"  }) => {
  return (
    <div className={`movie-list ${variant}`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onMovieClick(movie.id)}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default MovieList;

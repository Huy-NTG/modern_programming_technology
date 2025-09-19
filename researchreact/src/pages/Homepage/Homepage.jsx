import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from '../../components/MovieList/MovieList';
import Pagination from '../../components/Pagination/Pagination';

import PosterHeader from '../../components/PosterHeader/PosterHeader';
import TrendingList from '../../components/TrendingList/TrendingList';
import LatestTrailers from '../../components/LatestTrailers/LatestTrailers';
import './Homepage.css'
const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [trendingType, setTrendingType] = useState("day");

  const navigate = useNavigate();
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          options
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [page]);
  return (
    <div className="homepage">
    <PosterHeader />

    <div className="container-trending-Option">
        <h3>Trending</h3>
        <div className="trending-option-btn">
          <button
            onClick={() => setTrendingType("day")}
            className={trendingType === "day" ? "active" : ""}
          >
            Today
          </button>
          <button
            onClick={() => setTrendingType("week")}
            className={trendingType === "week" ? "active" : ""}
          >
          This Week
          </button>
        </div>
    </div>

    <TrendingList timeWindow={trendingType} />

    {/* <h1>🎬 Popular Movies</h1>
    <MovieList movies={movies} onMovieClick={(id) => navigate(`/movie/${id}`)} />

    <Pagination
      page={page}
      totalPages={totalPages}
      onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
      onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    /> */}

    <LatestTrailers />
    </div>
  );
}

export default Homepage

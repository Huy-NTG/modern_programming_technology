import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from '../../components/MovieList/MovieList';
import Pagination from '../../components/Pagination/Pagination';
import PosterHeader from '../../components/PosterHeader/PosterHeader';
import TrendingList from '../../components/TrendingList/TrendingList';
import LatestTrailers from '../../components/LatestTrailers/LatestTrailers';
import Footer from '../../components/Footer/Footer';
import './Homepage.css'
const Homepage = () => {
  const [trendingType, setTrendingType] = useState("day");
  const [popularMovies, setPopularMovies] = useState([]);
  const navigate = useNavigate();
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        setPopularMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching popular movies:", err);
      }
    };

    fetchPopular();
  }, []);
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
    <LatestTrailers />
    <h1>🎬What's Popular Movies</h1>
    <MovieList
      movies={popularMovies.slice(0, 20)} // chỉ lấy 20 phim
      onMovieClick={(id) => navigate(`/movie/${id}`)}
      variant="homepage"
    />
    <Footer />
    </div>
  );
}
export default Homepage
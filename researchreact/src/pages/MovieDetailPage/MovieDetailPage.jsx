import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import "./MovieDetailPage.css";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieDetailItem from "../../components/MovieDetailItem/MovieDetailItem";
import MovieReviewPreview from "../../components/MovieReviewPreview/MovieReviewPreview";
import MovieKeywords from "../../components/MovieKeywords/MovieKeywords";
import MovieList from "../../components/MovieList/MovieList";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, popularRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }),
          fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }),
        ]);

        const [movieData, popularData] = await Promise.all([
          movieRes.json(),
          popularRes.json(),
        ]);

        setMovie(movieData);
        setPopularMovies(popularData.results || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <h2>Đang tải...</h2>;
  if (!movie) return <h2>Không tìm thấy phim</h2>;

  return (
    <>
      <MovieDetailItem
        movie={movie}
        isTrailerOpen={isTrailerOpen}
        setIsTrailerOpen={setIsTrailerOpen}
      />

      <MovieCast movieId={id} />

      <h3>Review</h3>
      <div className="container-info">
        <div className="review-preview">
          <MovieReviewPreview movieId={id} />
        </div>
        <div className="keywords">
          <MovieKeywords movieId={id} />
        </div>
      </div>

      <MovieList
        movies={popularMovies.slice(0, 20)} // chỉ lấy 20 phim
        onMovieClick={(id) => navigate(`/movie/${id}`)}
        variant="homepage"
      />

      <Footer />
    </>
  );
};

export default MovieDetailPage;

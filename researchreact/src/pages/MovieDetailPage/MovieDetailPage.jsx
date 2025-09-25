import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./MovieDetailPage.css";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieDetailItem from '../../components/MovieDetailItem/MovieDetailItem';
import MovieReviewPreview from "../../components/MovieReviewPreview/MovieReviewPreview";
const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
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
      <MovieReviewPreview movieId={id} />
    </>
  );
};

export default MovieDetailPage;
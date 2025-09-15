import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MdFormatListBulletedAdd,
  MdFavorite
} from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./MovieDetailPage.css";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
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
      <div
        className="movie-detail"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
            movie.backdrop_path || movie.poster_path
          })`,
        }}
      >
        <div className="overlay"></div>

        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

        {/* Nội dung */}
        <div className="content-container">
          <h1>{movie.title}</h1>

          {/* Info row */}
          <div className="info-row">
            <ul>
              <li>{movie.release_date}</li>
              <li>{movie.genres.map((g) => g.name).join(", ")}</li>
              <li>{movie.runtime} phút</li>
            </ul>
          </div>

          {/* Rating */}
          <div className="rating-container">
            <div style={{ width: 80 }}>
              <CircularProgressbar
                value={movie.vote_average * 10}
                text={`${Math.round(movie.vote_average * 10)}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: movie.vote_average >= 7 ? "green" : "orange",
                  trailColor: "#222",
                })}
              />
            </div>
            <p>{movie.vote_count.toLocaleString()} lượt đánh giá</p>
          </div>

          {/* Action buttons */}
          <div className="option-button-container">
            <button className="button button-addList">
              <MdFormatListBulletedAdd />
            </button>
            <button className="button button-favorite">
              <MdFavorite />
            </button>
            <button className="button button-playTrailer" onClick={() => setIsTrailerOpen(true)}>
              <FaPlay /> Play trailer
            </button>
          </div>
          {/* Modal trailer */}
          <TrailerModal
            isOpen={isTrailerOpen}
            onClose={() => setIsTrailerOpen(false)}
            movieId={id}
          />

          {/* Tagline */}
          {movie.tagline && <p><i>{movie.tagline}</i></p>}

          {/* Overview */}
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Homepage */}
      {movie.homepage && (
        <p>
          <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
            🔗 Trang chủ phim
          </a>
        </p>
      )}
      
    </>
  );
};

export default MovieDetailPage;
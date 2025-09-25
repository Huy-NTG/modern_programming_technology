import React from 'react'
import "./MovieDetailItem.css"
import {
  MdFormatListBulletedAdd,
  MdFavorite
} from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./MovieDetailItem.css";
import TrailerModal from "../TrailerModal/TrailerModal";
import MovieDetailPage from '../../pages/MovieDetailPage/MovieDetailPage';
const MovieDetailItem = ({ movie, isTrailerOpen, setIsTrailerOpen }) => {
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

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />

       
        <div className="content-container">
          <h1>{movie.title}</h1>
          <div className="info-row">
            <ul>
              <li>{movie.release_date}</li>
              <li>{movie.genres.map((g) => g.name).join(", ")}</li>
              <li>{movie.runtime} phút</li>
            </ul>
          </div>
          <div className="rating-container-movieDetail"> {/*cần chú ý khi đặt tên class để tránh trùng với tên class khác trong componet khác */}
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
              user score
            </div>
            {/* <p>{movie.vote_count.toLocaleString()} lượt đánh giá</p> */}
          </div>

        
          <div className="option-button-container">
            <button className="button button-addList">
              <MdFormatListBulletedAdd />
            </button>
            <button className="button button-favorite">
              <MdFavorite />
            </button>
            <button
              className="button button-playTrailer"
              onClick={() => setIsTrailerOpen(true)}
            >
              <FaPlay /> Play trailer
            </button>
          </div>
          <TrailerModal
            isOpen={isTrailerOpen}
            onClose={() => setIsTrailerOpen(false)}
            movieId={movie.id}
          />          
          {movie.tagline && (
            <p>
              <i>{movie.tagline}</i>
            </p>
          )}
          <h2>Overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>      
      {/* {movie.homepage && (
        <p>
          <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
            🔗 Trang chủ phim
          </a>
        </p>
      )} */}
       
    </>
  )
}

export default MovieDetailItem
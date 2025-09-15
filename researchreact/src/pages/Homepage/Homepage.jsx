import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Homepage.css'
const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // tổng số trang từ API
  const navigate = useNavigate();
  
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDIxMjVkOWRiYTBiMzYzMTA5MGQwNzUzYTg0N2UxYSIsIm5iZiI6MTc1NzU2MTExMy40OTMsInN1YiI6IjY4YzI0MTE5OThjMTdlYTg2ZDA2YjA0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JE2giA_6wXa_IQEGwfrnqPLftKn5bi9toSyXQJHKOAQ",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages); // API trả về tổng số trang
      })
      .catch((err) => console.error(err));
  }, [page]); // chạy lại khi page thay đổi

  return (
    <div className="homepage">
      <h1>🎬 Popular Movies</h1>
      {/*hiển thị danh sách phim*/}
      <div className="movie-list">
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
            >
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
        ))}
      </div>

      {/* thanh Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Prev
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default Homepage

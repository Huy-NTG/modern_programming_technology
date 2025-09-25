import React from 'react'
import "./MovieReviewsPage.css"
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieReviewsPage = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${id}/reviews?language=en-US&page=1`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setReviews(data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [id]);

  if (loading) return <p>Đang tải reviews...</p>;
  if (!reviews.length) return <p>Chưa có review nào cho bộ phim này.</p>;
  return (
    <div className="movie-reviews-page">
      <h2>Tất cả đánh giá</h2>
      <Link to={`/movie/${id}`} className="back-link">
        ← Quay lại chi tiết phim
      </Link>
      <div className="review-list">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h4>{review.author}</h4>
            {review.author_details.rating && (
              <p>⭐ {review.author_details.rating}/10</p>
            )}
            <p>{review.content}</p>
            <a href={review.url} target="_blank" rel="noreferrer">
              Xem chi tiết
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MovieReviewsPage
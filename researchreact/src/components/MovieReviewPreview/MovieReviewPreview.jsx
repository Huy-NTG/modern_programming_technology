import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MovieReviewPreview.css"
const MovieReviewPreview = ({ movieId }) => {
    const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setReview(data.results[0]); // lấy review đầu tiên
        }
      } catch (err) {
        console.error("Error fetching review:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Đang tải review...</p>;
  if (!review) return <p>Chưa có review nào.</p>;

  return (
    <div className="review-preview">
      <h2>Đánh giá nổi bật</h2>
      <div className="review-card">
        <h4>{review.author}</h4>
        <p className="review-content">
          {review.content.length > 200
            ? review.content.slice(0, 200) + "..."
            : review.content}
        </p>
        <Link to={`/movie/${movieId}/reviews`} className="read-more">
          Read all reviews
        </Link>
      </div>
    </div>
  )
}

export default MovieReviewPreview
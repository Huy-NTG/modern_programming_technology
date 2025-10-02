import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import User_default from "../../assets/img/profile_Default.png"
import "./MovieReviewPreview.css"

const MovieReviewPreview = ({ movieId }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return User_default; 
    if (avatarPath.startsWith("/https")) {
      return avatarPath.substring(1); 
    }
    return `https://image.tmdb.org/t/p/w200${avatarPath}`;
  };
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
          setReview(data.results[0]); // chỉ lấy review đầu tiên
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
     <div className="review-card-container">
      <div className="review-header">
        <img
          src={getAvatarUrl(review.author_details.avatar_path)}
          alt={review.author}
          className="review-avatar"
        />
        <div>
          <h4>{review.author}</h4>
          {review.author_details.rating && (
            <p>⭐ {review.author_details.rating}/10</p>
          )}
        </div>
      </div>
      <p>{review.content.slice(0, 250)}...</p>
      <a href={review.url} target="_blank" rel="noreferrer">
        Xem chi tiết review
      </a>
      <br />
      <Link to={`/movie/${movieId}/reviews`} className="see-all-btn">
        See all reviews →
      </Link>
    </div>
  )
}

export default MovieReviewPreview
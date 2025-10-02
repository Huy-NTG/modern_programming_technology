import React from 'react'
import "./MovieReviewsContainer.css"
import { Link } from "react-router-dom";
import ReviewsItems from '../ReviewsItems/ReviewsItems';

const MovieReviewsContainer = ({id, reviews}) => {
  return (
    <div className="movie-reviews-page">
      {/* Header container */}
      <div className="reviews-header">
        <h2>Tất cả đánh giá</h2>
        <Link to={`/movie/${id}`} className="back-link">
          ← back to main
        </Link>
      </div>

      {/* List reviews */}
      <div className="review-list">
        {reviews.map((review) => (
          <ReviewsItems key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

export default MovieReviewsContainer

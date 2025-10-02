import React from 'react'
import "./ReviewsItem.css"
import User_default from "../../assets/img/profile_Default.png";


const ReviewsItems = ({ review }) => {
    const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return User_default;
        if (avatarPath.startsWith("/https")) {
        return avatarPath.substring(1);
        }
        return `https://image.tmdb.org/t/p/w200${avatarPath}`;
    };
    return (
        <div className="review-card">
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
        <p>{review.content}</p>
        <a href={review.url} target="_blank" rel="noreferrer">
            Xem chi tiết
        </a>
        </div>
    )
}

export default ReviewsItems

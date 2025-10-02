import React from 'react'
import "./MovieReviewsPage.css"
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import MovieReviewsContainer from '../../components/MovieReviewsContainer/MovieReviewsContainer';
import Footer from '../../components/Footer/Footer';
const MovieReviewsPage = () => {
  const { id } = useParams(); // lấy id phim từ URL
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

  if (loading) return <p>Đang tải review...</p>;
  if (reviews.length === 0) return <p>Chưa có review nào.</p>;
  return (
    <>
      <MovieReviewsContainer id={id} reviews={reviews} />
      <Footer />
   </>
   
  )
}

export default MovieReviewsPage
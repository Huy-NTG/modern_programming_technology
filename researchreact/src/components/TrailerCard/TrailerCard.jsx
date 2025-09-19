import React from 'react'
import './TrailerCard.css'
import { useNavigate } from "react-router-dom";
const TrailerCard = ({ trailer, onPlay }) => {
const navigate = useNavigate();

  return (
    <div
      className="trailer-card"
      onClick={() => onPlay(trailer.id)}
    >
      <div className="trailer-thumb">
        <img
          src={`https://image.tmdb.org/t/p/w500${trailer.poster}`}
          alt={trailer.title}
        />
        <div className="play-overlay">▶</div>
      </div>
      <h4>{trailer.title}</h4>
      <p>{trailer.trailerName}</p>
    </div>
  );
}

export default TrailerCard

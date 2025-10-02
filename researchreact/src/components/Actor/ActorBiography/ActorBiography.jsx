import React from 'react'
import { useState, useEffect } from "react";
import './ActorBiography.css'
const ActorBiography = ({ actorId }) => {
  const [actor, setActor] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";
  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/person/${actorId}?language=en-US`
        );
        const data = await res.json();
        setActor(data);
      } catch (error) {
        console.error("Error fetching actor biography:", error);
      }
    };

    fetchActor();
  }, [actorId]);

  if (!actor) return <p className="loading">Loading...</p>;

  const bio = actor.biography || "No biography available.";
  const isLong = bio.length > 300;
  const displayedBio = expanded ? bio : bio.substring(0, 300) + (isLong ? "..." : "");
  return (
    <div className="actor-biography">
      <h2 className="actor-name">{actor.name}</h2>
      <h3>Biography</h3>
      <p className="actor-bio">{displayedBio}</p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="read-more-btn"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  )
}

export default ActorBiography

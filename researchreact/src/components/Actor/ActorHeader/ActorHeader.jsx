import React from 'react'
import { FaTwitter, FaInstagram, FaLink } from "react-icons/fa";
import { useEffect, useState } from "react";
import User_default from "../../../assets/img/profile_Default.png";
import './ActorHeader.css'
const ActorHeader = ({ actorId }) => {
  const [actor, setActor] = useState(null);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
  const BASE_URL = "https://api.themoviedb.org/3";
  useEffect(() => {
    const fetchActor = async () => {
      try {
        const res = await fetch(`${BASE_URL}/person/${actorId}?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setActor(data);
      } catch (err) {
        console.error("Error fetching actor:", err);
      }
    };
    fetchActor();
  }, [actorId]);

  if (!actor) return <p>Loading actor info...</p>;
  return (
    <div className="actor-header">
      {/* Profile image */}
      <div className="actor-profile">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : User_default
          }
          alt={actor.name}
        />
      </div>

      {/* Social icons */}
      <div className="actor-social">
        {actor.imdb_id && (
          <a
            href={`https://www.imdb.com/name/${actor.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLink /> Link to profile
          </a>
        )}
        {/* ⚠️ Twitter & Instagram không có trực tiếp từ API này, 
            bạn cần gọi thêm endpoint /person/{id}/external_ids */}
        {actor.homepage && (
          <a href={actor.homepage} target="_blank" rel="noopener noreferrer">
            <FaLink />
          </a>
        )}
      </div>

      {/* Personal info */}
      <div className="actor-info">
        <h2>Personal Info</h2>
        
        <p><strong>Known For:</strong> <br/> {actor.known_for_department}</p>
        <p><strong>Birthday:</strong> <br/> {actor.birthday || "Unknown"}</p>
        {/**hiện ngày mất nếu có */}
        {actor.deathday && <p><strong>Died:</strong> {actor.deathday}</p>}
        <p><strong>Place of Birth:</strong> <br/> {actor.place_of_birth || "Unknown"}</p>
        <p><strong>Also Known As:</strong> <br/> {actor.also_known_as?.join(", ")}</p>
        {/* <p><strong>Popularity:</strong> {actor.popularity}</p> */}
      </div>
    </div>
  )
}

export default ActorHeader

import React from 'react'
import { useEffect, useState } from "react";
import TrailerList from '../TrailerList/TrailerList';
import './LatestTrailers.css'
import TrailerModal from '../TrailerModal/TrailerModal';
const LatestTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerId, setSelectedTrailerId] = useState(null);
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await res.json();
        const movies = data.results.slice(0, 15);

        let trailersList = [];

        for (const movie of movies) {
          const resVideos = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
            options
          );
          const videoData = await resVideos.json();
          const trailer = videoData.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          );

          if (trailer) {
            trailersList.push({
              id: movie.id,
              title: movie.title,
              videoKey: trailer.key,
              poster: movie.backdrop_path || movie.poster_path,
              trailerName: trailer.name,
            });
          }

          if (trailersList.length >= 10) break;
        }

        setTrailers(trailersList);
      } catch (err) {
        console.error("Error fetching trailers:", err);
      }
    };

    fetchTrailers();
  }, []);
  const handlePlay = (id) => {
    setSelectedTrailerId(id);
    setIsModalOpen(true);
  };
  return (
    <div className="latest-trailers">
      <h2>🎬 Latest Trailers</h2>
      <TrailerList trailers={trailers} onPlay={handlePlay} />
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieId={selectedTrailerId}
      />
    </div>
  );
}

export default LatestTrailers

import React, { useEffect, useState } from "react";
import "./TrailerModal.css";
import { IoMdClose } from "react-icons/io";
const TrailerModal = ({ isOpen, onClose, movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailerKey(trailer ? trailer.key : null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen, movieId]);

  if (!isOpen) return null;

  return (
    <div className="trailer-overlay" onClick={onClose}>
      <div className="trailer-container" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-close" onClick={onClose}>
         <IoMdClose />
        </button>
        {loading ? (
          <p style={{ color: "white" }}>Đang tải trailer...</p>
        ) : trailerKey ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p style={{ color: "white" }}>Không có trailer</p>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;

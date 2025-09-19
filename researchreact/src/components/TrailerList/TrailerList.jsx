import React from 'react'
import './TrailerList.css'
import TrailerCard from '../TrailerCard/TrailerCard';
const TrailerList = ({ trailers, onPlay }) => {
  return (
     <div className="trailers-list">
      {trailers.map((trailer) => (
        <TrailerCard key={trailer.id} trailer={trailer} onPlay={onPlay} />
      ))}
    </div>
  )
}

export default TrailerList
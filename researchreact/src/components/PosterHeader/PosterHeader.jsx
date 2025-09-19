import React from 'react'
import './PosterHeader.css'
import poster_header from '../../assets/img/poster_header.png'
const PosterHeader = () => {
  return (
    <>
    <div className="poster-header">
      <div className="overlay"></div>
      <img src={poster_header} alt="" className='img-header' />
      <div className="content">
        <h1>Welcome to MovieApp!</h1>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
      </div>
    </div>
    </>
    
  )
}

export default PosterHeader

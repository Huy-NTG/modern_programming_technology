import React from 'react'
import './Footer.css'
import logo_img from '../../assets/img/logo.png'
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        {/* Logo + Author */}
        <div className="footer-section info-author">
          <img src={logo_img} alt="logo" className="logo" />
          <h1 className="author-name">Nguyen Huy</h1>
        </div>

        {/* Description */}
        <p className="description">
          This is a movie app built with React and The Movie Database (TMDb) API. 
          It allows users to browse and search for movies, view details, and watch trailers.
        </p>   

        {/* Links */}
        <div className="footer-section links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
        </div>

        {/* Social icons */}
        <div className="footer-section social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
          <a href="https://github.com/Huy-NTG" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} Nguyen Huy. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

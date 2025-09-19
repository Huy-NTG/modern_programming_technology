import { Link } from "react-router-dom";
import { FaHome, FaSearch  } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaList } from "react-icons/fa";
import logo_img from '../../assets/img/logo.png'
import SearchBar from "../SearchBar/SearchBar";
import './Navbar.css';
const Navbar = () => {
  return (
    <>
      <nav className="navbar-container">
      <img src={logo_img} alt="" className="logo-navbar" />
        <Link to="/" className="nav-link">
          <FaHome className="nav-icon" /> Home
        </Link>
        <Link to="/movie" className="nav-link">
          <FaHome className="nav-icon" /> Movie
        </Link>
        <Link to="/tvshow" className="nav-link">
          <FaHome className="nav-icon" /> TVshow
        </Link>
        
        <Link to="/favorites" className="nav-link">
          <MdFavorite className="nav-icon" />Favorites
        </Link>
        <Link to="/category" className="nav-link">
          <FaList className="nav-icon" />Danh sách phim
        </Link>
      </nav>
      <SearchBar />
    </>
  );
};

export default Navbar;
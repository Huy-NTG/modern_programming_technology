import { Link } from "react-router-dom";
import { FaHome, FaSearch  } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaList } from "react-icons/fa";
import logo_img from '../../assets/img/logo.png'
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar-container">
    <img src={logo_img} alt="" className="logo-navbar" />
      <Link to="/" className="nav-link">
        <FaHome className="nav-icon" /> Home
      </Link>
      <Link to="/search" className="nav-link">
        <div className="search-container">
            <FaSearch className="search-icon"/>
            <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </Link>
      <Link to="/favorites" className="nav-link">
        <MdFavorite className="nav-icon" />Favorites
      </Link>
      <Link to="/category" className="nav-link">
        <FaList className="nav-icon" />Danh sách phim
      </Link>
    </nav>
  );
};

export default Navbar;
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/Homepage/Homepage';
import SearchPage from './pages/SearchPage/SearchPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import FavoritesPage from './pages/Favorites/FavoritesPage';
import Category from './pages/CategoryPage/CategoryPage';
import MainLayout from './layouts/MainLayout';
import TVshowpage from './pages/TVshow/TVshowpage';
import MoviePage from './pages/moviepage/MoviePage';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/homepage" />} /> {/* Chuyển hướng về trang HomePage */}
            <Route path="/homepage" element={<HomePage />} /> {/* url đến HomePage */}
            <Route path="/search/:keyword" element={<SearchPage />} />{/* url đến SearchPage với keyword được nhập */}
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/category" element={<Category />} /> {/* url đến CategoryPage */}
            <Route path="/favorites" element={<FavoritesPage />} /> {/* url đến FavoritesPage */}
            <Route path="/tvshow" element={<TVshowpage />} /> {/* url đến TVShow */}
            <Route path="/movie" element={<MoviePage />} /> {/* url đến danh sách movie */}

          </Route>
        </Routes>
    </Router>
    </div>
  )
}

export default App

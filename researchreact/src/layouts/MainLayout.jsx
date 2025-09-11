import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
const MainLayout = () => {
  return (
     <div>
      <Navbar />
      <main className="container">
        <Outlet /> {/* Nơi các trang con sẽ hiển thị */}
      </main>
    </div>
  )
}

export default MainLayout
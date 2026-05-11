import React from 'react'
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"

const AppLayout = ({children}) => {
    
    const location = useLocation();

    const noLayoutRoutes = ["/mitra"];
    const showLayout = !noLayoutRoutes.includes(location.pathname);
  return (
    <>
        {showLayout && <Navbar />}
        {children}
        {showLayout && <Footer />}
    </>
  )
}

export default AppLayout;
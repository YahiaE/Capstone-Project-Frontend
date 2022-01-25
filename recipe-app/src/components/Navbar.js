import React from 'react'
import { Link } from "react-router-dom"
import logoHover from '../images/logoHover.gif'
import logo from '../images/logo1.png'
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  let navigate = useNavigate();
    return (
      <nav className="nav_bar">
        <img src={logo} alt="logo" className='logo_img' onClick={()=> {navigate("/")}} />
        <img src={logoHover} alt="logo" className='active' onClick={()=> {navigate("/")}} /> 
  
        <Link to="/campuses" className="links">
          All Recipes
        </Link>
  
        <Link to="/students" className="links">
          Create Recipes
        </Link>
  
      </nav>
    );
  }
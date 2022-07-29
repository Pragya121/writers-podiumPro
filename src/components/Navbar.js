import React from 'react'

import { Outlet, Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import data from '.././assets/data'
import "./Navbar.css"
function Navbar() {
  const [isLoading, setIsLoading]  = React.useState(false);
  const signOut = (e)=>{
    setIsLoading(true);
    data.signOut(data.auth).then(() => {
      // Sign-out successful.
      console.log("Signed out")
      localStorage.removeItem("token");
      localStorage.removeItem("loginData");
      setIsLoading(false)
      window.location.reload();
    }).catch((error) => {
      // An error happened.
      alert("error in signing out!");
      setIsLoading(false);
      console.log(error);
    });
   
   }
  return (
    <div>  <nav className="app__navbar">
    <div className="app__navbar-logo">
      <img src={data.logo} alt="app__logo" />
    </div>
    <div>
      <ul className='app__navbar-links'> 
  
        <li className='p__opensans'><Link to="/"> <button>Home </button></Link>
        </li>
        <li className='p__opensans'>    <button onClick={signOut}>Sign Out</button>
        </li>
        </ul>
      </div>
   
    </nav></div>
  )
}

export default Navbar
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import images from '../assets/data'
import "./Navbar.css"
function Navbar() {
  return (
    <div>  <nav className="app__navbar">
    <div className="app__navbar-logo">
      <img src={images.logo} alt="app__logo" />
    </div>
    <ul className='app__navbar-links'>
      <li className='p__opensans'> Home</li>
      <li className='p__opensans'>View ongoing tasks</li>
      <li className='p__opensans'> Accept/Reject tasks</li>

    </ul>
    </nav></div>
  )
}

export default Navbar
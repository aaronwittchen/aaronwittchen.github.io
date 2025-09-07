import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <div id='NavbarTitle'>
      <div className='navbar-text-container'>
        <span className="navbar-text visible">
          aaron wittchen
        </span>
      </div>
      <hr className='border' style={{ width: '80%' }} />
    </div>
  );
};

export default Navbar;

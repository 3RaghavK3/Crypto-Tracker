import React from 'react';
import logo from '../assets/logo.svg';
import sun from '../assets/sun.svg';
import './Header.css';

export function Header() {
  return (
    <header className="header">
      {/* Left Logo + Title */}
      <div className="header-left">
        <img src={logo} className="logo" alt="Logo" />
        <span className="title">CRYPTO.</span>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <span>Home</span>
        <span>Market</span>
        <span>Compare</span>
        <span>Categories</span>
        <span>Movers</span>
        <span>New</span>
      </nav>

      {/* Sun Icon */}
      <div className="theme-icon">
        <img src={sun} alt="Sun" />
      </div>
    </header>
  );
}

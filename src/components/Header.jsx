import React from 'react';
import logo from '../assets/logo.svg';
import sun from '../assets/sun.svg';
import './Header.css';

export function Header() {
  return (
    <header className="header">

      <div className="header-left">
        <img src={logo} className="logo" alt="Logo" />
        <span className="title">CRYPTO.</span>
      </div>

      <div className="nav">
          <span>Market</span>
          <span>Compare</span>
          <div className="theme-icon">
            <img src={sun} alt="Sun" />
          </div>
      </div>

    </header>
  );
}

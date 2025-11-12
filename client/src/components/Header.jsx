// @ts-ignore
import logo from '../assets/logo.svg';
// @ts-ignore
import sun from '../assets/sun.svg';
import './Header.css';
import { useNavigate } from 'react-router-dom';
export function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} className="logo" alt="Logo" />
        <span className="title" onClick={() => {
            navigate('/');}}>CRYPTO.</span>
      </div>

      <div className="nav">
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          Market
        </span>
        <span
          onClick={() => {
            navigate('/trending');
          }}
        >
          Trending
        </span>
        <span
          onClick={() => {
            navigate('/wishlist');
          }}
        >
          Wishlist
        </span>
        
      </div>
    </header>
  );
}

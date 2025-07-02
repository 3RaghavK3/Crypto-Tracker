import { Global } from './Global';
import './Homepage.css';
import { Market } from './market';
import { Trending } from './Trending';
import { Note } from './note';
import { Header } from './Header';
import { Footer } from './Footer';
export function Homepage() {
  return (
    <>
    <Header/>
      <div className="grid-container">
        <Global />
      </div>
      <Market />
     
      
    </>
  );
}

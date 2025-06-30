import { Global } from './Global';
import './Homepage.css';
import { Market } from './market';
import { Trending } from './Trending';
import { Note } from './note';
export function Homepage() {
  return (
    <>
      <div className="grid-container">
        <Trending />
        <Global />
      </div>
      <Note/>
      <Market />
    </>
  );
}

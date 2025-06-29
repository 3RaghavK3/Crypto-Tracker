import { Global } from './Global';
import './Homepage.css';
import { Market } from './market';
import { Trending } from './Trending';

export function Homepage() {
  return (
    <>
      <div className="grid-container">
        <Trending />
        <Global />
      </div>

      <Market />
    </>
  );
}

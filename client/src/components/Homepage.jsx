import { Global } from './Global';
import './Homepage.css';
import { Market } from './market';
import { Header } from './Header';
export function Homepage() {
  return (
    <>
      <Header />
        <Global />
      <Market />
    </>
  );
}

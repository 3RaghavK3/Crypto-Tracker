import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Routes, Route } from 'react-router-dom';
import { CoinDetail } from './components/Coindetail';
import { WishlistProvider } from './context/wishlistcontext';
import { Wishlist } from './components/wishlist';
import { Trending } from './components/Trending';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/coindetail/:id" element={<CoinDetail />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </WishlistProvider>
     
    </>
  );
}

export default App;

import { useState } from 'react';
import { Homepage } from './components/Homepage';
import { Routes, Route } from 'react-router-dom';
import { CoinDetail } from './components/Coindetail';
import { WishlistProvider } from './context/wishlistcontext';
import { Wishlist } from './components/wishlist';
import { Trending } from './components/Trending';
import { FormatProvider } from './context/Formatingcontext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormatProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/coindetail/:id/:symbol" element={<CoinDetail />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </WishlistProvider>
      </FormatProvider>
    </>
  );
}

export default App;

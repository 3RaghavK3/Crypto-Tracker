import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { MainLayout } from './layout/MainLayout';
import { Homepage } from './components/Homepage';
import { FooterProvider } from './context/footercontext';
import { Routes,Route } from 'react-router-dom';
import { CoinDetail } from './components/Coindetail';
import { WishlistProvider } from './context/wishlistcontext';
import { Wishlist } from './components/wishlist';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FooterProvider>
        <WishlistProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/coindetail/:id" element={<CoinDetail/>}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
            </Routes>
        </MainLayout>
        </WishlistProvider>
      </FooterProvider>
    </>
  );
}

export default App;

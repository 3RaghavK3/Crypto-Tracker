import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistcontext';
import { CoinCard } from './CoinCard';
import { Header } from './Header';

export function Wishlist() {
  const { LikedCoins } = useContext(WishlistContext);

  return (
    <>
      <Header />

      {LikedCoins && LikedCoins.length > 0 ? (
        <div className='grid mt-4
            lg:grid-cols-[100px_200px_repeat(2,minmax(0,1fr))] lg:text-lg
            md:grid-cols-[50px_100px_repeat(2,minmax(0,1fr))] md:text-base
            grid-cols-[40px_40px_repeat(2,minmax(0,1fr))] text-sm
            text-white items-center cursor-pointer px-2 w-full max-w-full min-w-full gap-y-2'> 

              <div className='font-bold'></div>
              <div className='font-bold'>#</div>
              <div className='font-bold'>Name</div>
              <div className='font-bold'>Current Price</div>
            
              {LikedCoins.map((coin) => {
                const { id, rank, name, symbol, price, image } = coin;
                return (
                  <CoinCard
                    key={id}
                    id={id}
                    rank={rank}
                    name={name}
                    symbol={symbol}
                    image={image}
                    price={price}
                    change7d={undefined}
                    change1hr={undefined}
                    change24hr={undefined}
                    marketcap={undefined}
                    volume={undefined}
                    circulatingsupply={undefined}
                    sparkline={undefined}
                  />
                );
              })}
        </div>
      ) : (
        <div className='flex flex-1 items-center justify-center min-h-screen text-xl md:text-3xl lg:text-5xl text-white'>
          No coins added to wishlist.
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import './Trending.css';
import { CoinCard } from './CoinCard';
import { Header } from './Header';

export function Trending() {
  const [trendingArray, settrendingarray] = useState(null);

  useEffect(() => {
    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/api/trending`)
      .then((res) => res.json())
      .then((data) => {
        settrendingarray(data['coins']);
        console.log(data['coins'])
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header />
      {trendingArray && trendingArray.length > 0 ? (
      
          <div className='grid mt-4
            lg:grid-cols-[50px_100px_repeat(2,minmax(0,1fr))] lg:text-lg
            md:grid-cols-[50px_100px_repeat(2,minmax(0,1fr))] md:text-base
            grid-cols-[40px_40px_repeat(2,minmax(0,1fr))] text-sm
            text-white items-center cursor-pointer px-2 w-full max-w-full min-w-full gap-y-2'> 

              <div className='font-bold'></div>
              <div className='font-bold'>#</div>
              <div className='font-bold'>Name</div>
              <div className='font-bold'>Current Price</div>


              {trendingArray.map((coin) => {
                return (
                  <CoinCard
                    rank={coin.item.market_cap_rank}
                    key={coin.item.id}
                    id={coin.item.id}
                    image={coin.item.thumb}
                    name={coin.item.name}
                    symbol={coin.item.symbol}
                    price={coin.item.data.price}
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
        <div className='flex flex-1 items-center justify-center min-h-screen text-lg text-white'>
          Loading..
        </div>
      )}
    </>
  );
}

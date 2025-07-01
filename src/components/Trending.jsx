import { useEffect, useState } from 'react';
import './Trending.css';
import { CoinCard } from './CoinCard';

export function Trending({
rank ,id,image,symbol,name,price
}) {
  const [trendingArray, settrendingarray] = useState(null);

  
  useEffect(() => {
    fetch('http://localhost:3000/get/trending')
      .then((res) => res.json())
      .then((data) => {
        console.log(data['coins']);
        settrendingarray(data['coins']);
      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <>
      <div
        className="widget"
        style={{
          overflowY: 'scroll',
        }}
      >
        <span className="title-name">Trending</span>
        <table
          style={{
            height: '100%',
            width: '100%',
            color: 'white',
            padding: 0,
            margin: 0,
            textAlign: 'left',
          }}
        >
          <thead
            style={{
              fontSize: '1.25rem',
            }}
          >
            <tr>
              <th></th>
              <th>#</th>
              <th>Name</th>
              <th>Current Price</th>
            </tr>
          </thead>

          <tbody style={{
            
          }}>
            {trendingArray?.map((coin) => {
              return (
               
                 <CoinCard rank={coin.item.market_cap_rank}
                  key={coin.item.id}
                  id={coin.item.id}
                  image={coin.item.thumb}
                  name={coin.item.name}
                  symbol={coin.item.symbol}
                  price={coin.item.data.price}/>

               
            )})}
          </tbody>
        </table>
      </div>
    </>
  );
}

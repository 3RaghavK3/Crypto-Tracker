import { useEffect, useState } from 'react';
import './Trending.css';
import { CoinCard } from './CoinCard';
import { Header } from './Header';

export function Trending() {
  const [trendingArray, settrendingarray] = useState(null);

  useEffect(() => {
    // @ts-ignore
    fetch(`http://localhost:3000/api/trending`)
      .then((res) => res.json())
      .then((data) => {
        settrendingarray(data['coins']);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header />
      {trendingArray && trendingArray.length > 0 ? (
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

            <tbody style={{}}>
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
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flex: '1',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontSize: '4rem',
            color: 'white',
          }}
        >
          Loading..
        </div>
      )}
    </>
  );
}

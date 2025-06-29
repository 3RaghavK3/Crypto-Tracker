import { useEffect, useState } from 'react';
import './Trending.css';

export function Trending() {
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

  const formatNumber = (num) => {
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

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
            border: '1px solid red',
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
              <th>#</th>
              <th>Name</th>
              <th>Current Price</th>
            </tr>
          </thead>

          <tbody className="inter-text">
            {trendingArray?.map((coin) => {
              return (
                <tr key={coin.item.id}>
                  <td>{coin.item.market_cap_rank}</td>
                  <td
                    style={{
                      fontSize: '1.25rem',
                    }}
                  >
                    {coin.item.name} ({coin.item.symbol})
                  </td>

                  <td>${formatNumber(coin.item.data.price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

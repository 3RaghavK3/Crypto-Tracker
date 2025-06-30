import { useEffect, useState } from 'react';
import './Trending.css';
import { useNavigate} from 'react-router-dom';

export function Trending() {
  const [trendingArray, settrendingarray] = useState(null);
  const navigate=useNavigate();
  
  
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

          <tbody style={{
            
          }}>
            {trendingArray?.map((coin) => {
              return (
                <tr key={coin.item.id} onClick={() => navigate(`/coindetail/${coin.item.id}`)}>
                  <td>{coin.item.market_cap_rank}</td>
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <img src={coin.item.thumb} className="symbol-coin" />
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{coin.item.name}</span>&nbsp;
                        <span style={{ fontWeight: 400, color: 'rgb(163, 158, 158)' }}>
                          ({coin.item.symbol?.toUpperCase()})
                        </span>
                      </div>
                    </div>
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

import './Global.css';
import { useState, useEffect } from 'react';
import { Market } from './market';
import { Trending } from './Trending';
export function Global() {
  const [globalarray, settglobalarray] = useState(null);

  useEffect(() => {
    // @ts-ignore
    fetch(`/api/global`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data);
        settglobalarray(json.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="widget" style={{ flex: 2, color: 'white' }}>
        {/* <span className="title-name">Global</span> */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
          }}
        >
          <div
            className="grid-wrapper"
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              padding: '5px',
              backgroundColor: 'black',
            }}
          >
            <div className="global-item">
              <div className="global-title">Market-Cap</div>
              <div className="value">
                {globalarray ? `$${formatNumber(globalarray.total_market_cap.btc)}` : 'Loading...'}
              </div>
            </div>

            <div className="global-item">
              <div className="global-title">Total Volume (24h)</div>
              <div className="value">
                {globalarray ? `$${formatNumber(globalarray.total_volume.usd)}` : 'Loading...'}
              </div>
            </div>

            <div className="global-item">
              <div className="global-title">24h Market Cap Change (%)</div>
              <div className="value">
                {globalarray ? (
                  <>
                    <span className="value">
                      {'$' + formatNumber(globalarray.market_cap_change_percentage_24h_usd) + '%'}
                    </span>

                    {globalarray.market_cap_change_percentage_24h_usd > 0 ? (
                      <span className="value" style={{ color: '#17D082' }}>
                        ⮝
                      </span>
                    ) : (
                      <span className="value" style={{ color: '#F43D46' }}>
                        ⮟
                      </span>
                    )}
                  </>
                ) : (
                  'Loading...'
                )}
              </div>
            </div>

            <div className="global-item">
              <div className="global-title">Active Cryptos</div>
              <div className="value">
                {globalarray ? formatNumber(globalarray.active_cryptocurrencies) : 'Loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
export function Global() {
  const [globalarray, settglobalarray] = useState(null);

  useEffect(() => {
    // @ts-ignore
    fetch(`${import.meta.env.VITE_API_URL}/api/global`)
      .then((res) => res.json())
      .then((json) => {
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
      <div className="relative bg-[#0d1421] flex-2 text-white md:text-lg lg:text-2xl text-sm">
     

        <div className='flex flex-row h-64 lg:h-96'>
          <div
            className="flex-2 grid grid-cols-2 grid-rows-2 gap-2 lg:gap-3 p-2 bg-black">
            <div className="rounded-md bg-[#0d1421] p-2">
              <div className="flex flex-col font-bold text-white">Market-Cap</div>
              <div className="font-semibold text-[#f2d27b] break-words">
                {globalarray ? `$${formatNumber(globalarray.total_market_cap.btc)}` : 'Loading...'}
              </div>
            </div>

            <div className="rounded-md bg-[#0d1421] p-2">
              <div className="flex flex-col font-bold text-white">Total Volume (24h)</div>
              <div className="font-semibold text-[#f2d27b] break-words">
                {globalarray ? `$${formatNumber(globalarray.total_volume.usd)}` : 'Loading...'}
              </div>
            </div>

            <div className="rounded-md bg-[#0d1421] p-2">
              <div className="flex flex-col font-bold text-white">24h Market Cap Change (%)</div>
              <div className="font-semibold text-[#f2d27b] break-words">
                {globalarray ? (
                  <>
                    <span className="font-semibold text-[#f2d27b] break-words">
                      {'$' + formatNumber(globalarray.market_cap_change_percentage_24h_usd) + '%'}
                    </span>

                    {globalarray.market_cap_change_percentage_24h_usd > 0 ? (
                      <span className="font-semibold text-[#f2d27b] break-words" style={{ color: '#17D082' }}>
                        ⮝
                      </span>
                    ) : (
                      <span className="font-semibold text-[#f2d27b] break-words" style={{ color: '#F43D46' }}>
                        ⮟
                      </span>
                    )}
                  </>
                ) : (
                  'Loading...'
                )}
              </div>
            </div>

            <div className="rounded-md bg-[#0d1421] p-2">
              <div className="flex flex-col font-bold text-white break-words">Active Cryptos</div>
              <div className="font-semibold text-[#f2d27b]">
                {globalarray ? formatNumber(globalarray.active_cryptocurrencies) : 'Loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

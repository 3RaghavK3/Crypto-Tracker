import { ArrowDown, ArrowUp, ThumbsDown, ThumbsUp } from 'lucide-react';
import { use, useContext, useEffect, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { Header } from './Header';
import { FormatContext } from '../context/Formatingcontext';

export function CoinDetail() {
  const { id } = useParams();
  const [CoinDetailArray, setCoinDetailArray] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/coindetail?id=${id}`)
      .then((res) => {
        if (res.status === 429) {
          return res.json().then((data) => {
            setErrorMsg(data.message);
            setLoading(false)
            setCoinDetailArray(null);
          });
        } else {
          return res.json().then((data) => {
            setCoinDetailArray(data);
            setLoading(false)
            setErrorMsg(null);
          });
        }
      })
      .catch((e) => console.error(e + ' Error in fetching coindetail'))
  }, [id]);


  

  const [currency, setcurrency] = useState({ name: 'usd', symbol: '$' });

  const market_price_change_perc = {
    '1h': CoinDetailArray?.market_data?.price_change_percentage_1h_in_currency?.[currency.name],
    '24h': CoinDetailArray?.market_data?.price_change_percentage_24h_in_currency?.[currency.name],
    '7d': CoinDetailArray?.market_data?.price_change_percentage_7d_in_currency?.[currency.name],
    '14d': CoinDetailArray?.market_data?.price_change_percentage_14d_in_currency?.[currency.name],
    '30d': CoinDetailArray?.market_data?.price_change_percentage_30d_in_currency?.[currency.name],
  };

  const { formatnumber } = useContext(FormatContext);

  return (
    <>
      <Header />
        
      <div className="p-4 text-white">
        {errorMsg
        ? <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl text-center'>{errorMsg}</div>
          :
          loading?<div className="flex items-center justify-center h-screen text-white text-3xl">
          Loading...
           </div>
           :<>
           <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-3xl text-center'>{errorMsg}</div>
        
          <div className="bg-[#0d1421] text-white flex justify-between px-4 py-2 items-center text- rounded-xl">
            <div className="flex gap-8">
              <div>
                <span>{CoinDetailArray?.name} </span>
                <span>({CoinDetailArray?.symbol})</span>
              </div>
              <div>|</div>
              <div>
                {currency.symbol}
                {formatnumber(
                  CoinDetailArray?.market_data?.current_price[currency.name],
                  currency.name
                )}
              </div>
              <div>|</div>
              <div className="flex gap-2">
                {market_price_change_perc['24h'] > 0 ? (
                  <ArrowUp className="text-green-500" />
                ) : (
                  <ArrowDown className="text-red-500" />
                )}

                <span
                  className={`${
                    market_price_change_perc['24h'] > 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {Number(market_price_change_perc['24h']).toFixed(2)}%{' '}
                </span>
                <span> 24h</span>
              </div>
              <div>|</div>
              <div>Rank #{CoinDetailArray?.market_cap_rank}</div>
            </div>

            <div className="flex gap-4 items-center">
              <span className="text-xl">
                {' '}
                Last Updated at {new Date(CoinDetailArray?.last_updated).toLocaleTimeString()}{' '}
              </span>
              <div className="flex">
                <div
                  className={`p-2 rounded-sm cursor-pointer ${currency.name == 'usd' ? 'bg-green-500' : 'bg-black'}`}
                  onClick={() => setcurrency({ name: 'usd', symbol: '$' })}
                >
                  USD $
                </div>
                <div
                  className={`p-2 rounded-sm cursor-pointer ${currency.name == 'inr' ? 'bg-green-500' : 'bg-black'}`}
                  onClick={() => setcurrency({ name: 'inr', symbol: '₹' })}
                >
                  INR ₹
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3  gap-4 my-4">
            <div className="bg-[#0d1421] grid grid-cols-2 gap-2 p-4">
              <div className="border border-2 border-white p-2 flex flex-col justify-around">
                <div className="flex flex-col items-center ">
                  <div>Current Price</div>
                  <div className="font-bold text-2xl">
                    {currency.symbol}
                    {formatnumber(
                      CoinDetailArray?.market_data?.current_price[currency.name],
                      currency.name
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <span>24 High:</span>
                  <span>
                    {currency.symbol}
                    {formatnumber(
                      CoinDetailArray?.market_data?.high_24h[currency.name],
                      currency.name
                    )}
                  </span>
                </div>

                <div className="flex gap-2">
                  <span>24 Low:</span>
                  <span>
                    {currency.symbol}
                    {formatnumber(CoinDetailArray?.market_data?.low_24h[currency.name], currency.name)}
                  </span>
                </div>
              </div>

              <div className="border border-2 border-white">
                <div className="flex justify-center border-2">Performance</div>

                <div className="flex flex-col">
                  {Object.entries(market_price_change_perc).map(([key, value]) => {
                    return (
                      <>
                        <div className="flex justify-around">
                          <div>{key}</div>
                          {value > 0 ? (
                            <div className="text-green-500 flex">
                              <span>
                                <ArrowUp />
                              </span>
                              <span>+{Number(value).toFixed(2)}%</span>
                            </div>
                          ) : (
                            <div className="text-red-500 flex">
                              <span>
                                <ArrowDown />
                              </span>
                              <span>{Number(value).toFixed(2)}%</span>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="border border-2 border-white col-span-2  flex flex-col justify-between">
                <div className="flex justify-center border-2 ">Historical Prices</div>
                <div className="flex p-4 gap-2">
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <span>ATH:</span>
                      <span>
                        {currency.symbol}
                        {formatnumber(CoinDetailArray?.market_data?.ath[currency.name], currency.name)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span>On:</span>
                      <span>
                        {new Date(
                          CoinDetailArray?.market_data?.ath_date[currency.name]
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span>At:</span>
                      <span>
                        {new Date(
                          CoinDetailArray?.market_data?.ath_date[currency.name]
                        ).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex">
                      <span>ATH%:</span>
                      <span>
                        {CoinDetailArray?.market_data?.ath_change_percentage[currency.name] > 0 ? (
                          <ArrowUp className="text-green-500" />
                        ) : (
                          <ArrowDown className="text-red-500" />
                        )}
                      </span>

                      <span
                        className={`${
                          CoinDetailArray?.market_data?.ath_change_percentage[currency.name] > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {Number(
                          CoinDetailArray?.market_data?.ath_change_percentage[currency.name]
                        ).toFixed(2)}
                        %{' '}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex gap-2">
                      <span>ATL:</span>
                      <span>
                        {currency.symbol}
                        {formatnumber(CoinDetailArray?.market_data?.atl[currency.name], currency.name)}
                      </span>
                    </div>

                    <div className="flex gap-2 ">
                      <span>On:</span>
                      <span>
                        {new Date(
                          CoinDetailArray?.market_data?.atl_date[currency.name]
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <span>At:</span>
                      <span>
                        {new Date(
                          CoinDetailArray?.market_data?.atl_date[currency.name]
                        ).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex">
                      <span>ATL%:</span>
                      <span>
                        {CoinDetailArray?.market_data?.atl_change_percentage[currency.name] > 0 ? (
                          <ArrowUp className="text-green-500" />
                        ) : (
                          <ArrowDown className="text-red-500" />
                        )}
                      </span>

                      <span
                        className={`${
                          CoinDetailArray?.market_data?.atl_change_percentage[currency.name] > 0
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {Number(
                          CoinDetailArray?.market_data?.atl_change_percentage[currency.name]
                        ).toFixed(2)}
                        %{' '}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1421] col-span-1  flex flex-col items-center justify-center border-1">
              <div className="flex gap-2 text-4xl font-bold">
                <span>{CoinDetailArray?.name}</span>
                <span>({CoinDetailArray?.symbol?.toUpperCase()})</span>
              </div>

              <img src={CoinDetailArray?.image?.large} className="object-contain" />
            </div>

            <div className="bg-[#0d1421] grid grid-cols-2 grid-rows-2 p-4 gap-2">
              <div className="flex flex-col items-center justify-center border-2">
                <div className="text-3xl">Rank</div>
                <div className="text-5xl font-bold">#{CoinDetailArray?.market_cap_rank}</div>
              </div>

              <div className="border-2 flex flex-col justify-between">
                <div className="flex justify-center border-2">Market Sentiment</div>

                <div className="flex items-center justify-center gap-1">
                  <ThumbsUp className="text-green-500" />
                  <span>{CoinDetailArray?.sentiment_votes_up_percentage}% Bearish</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <ThumbsDown className="text-red-500" />
                  <span>{CoinDetailArray?.sentiment_votes_down_percentage}% Burrish</span>
                </div>

                <div className="flex justify-center border-2">Wishlist</div>

                <div className="flex justify-center text-2xl gap-2">
                  <span className="text-xl font-bold ">
                    {formatnumber(
                      CoinDetailArray?.watchlist_portfolio_users,
                      currency.name,
                      `compact`
                    )}
                  </span>
                  <span className="text-lg">Users</span>
                </div>
              </div>

              <div className="flex flex-col border-2 p-2 justify-around items-center">
                <div className="border-2 w-full text-center">Market Statistics</div>

                <div className="flex">Market Cap</div>

                <div className="text-2xl font-bold text-center">
                  {currency.symbol}
                  {formatnumber(
                    CoinDetailArray?.market_data?.market_cap[currency.name],
                    currency.name,
                    'compact'
                  )}
                </div>

                <div className="flex items-center justify-center gap-2">
                  {CoinDetailArray?.market_data?.market_cap_change_percentage_24h_in_currency[
                    currency.name
                  ] > 0 ? (
                    <ArrowUp className="text-green-500" />
                  ) : (
                    <ArrowDown className="text-red-500" />
                  )}
                  <span
                    className={
                      CoinDetailArray?.market_data?.market_cap_change_percentage_24h_in_currency[
                        currency.name
                      ] > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {Number(
                      CoinDetailArray?.market_data?.market_cap_change_percentage_24h_in_currency[
                        currency.name
                      ]
                    ).toFixed(2)}
                    %
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center border-2 p-2 justify-around">
                <div className="border-2 w-full text-center ">Supply Info</div>
                <div>Circulating Supply</div>
                <div className="font-bold text-center">
                  {formatnumber(CoinDetailArray?.market_data?.circulating_supply, currency.name)}{' '}
                  {CoinDetailArray?.symbol?.toUpperCase()}
                </div>
                <div>Max Supply</div>
                <div className="font-bold text-center gap-2 flex">
                  {CoinDetailArray?.market_data?.max_supply
                    ? formatnumber(CoinDetailArray?.market_data?.max_supply, currency?.name)
                    : 'No limit '}
                  {CoinDetailArray?.symbol?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0d1421] p-4 border-2 w-full">{CoinDetailArray?.description?.en}</div>
          </>
          }
          
        </div>
      </>
    );
  }

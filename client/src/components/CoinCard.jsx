import { useNavigate } from 'react-router-dom';
import { SparkLine } from './SparkLine';
import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistcontext';

export function CoinCard({
  id,
  rank,
  image,
  name,
  symbol,
  price,
  change7d,
  change1hr,
  change24hr,
  marketcap,
  volume,
  circulatingsupply,
  sparkline,
}) {
  const coinData = {
    id,
    rank,
    image,
    name,
    symbol,
    price,
    change7d,
    change1hr,
    change24hr,
    marketcap,
    volume,
    circulatingsupply,
    sparkline,
  };

  const navigate = useNavigate();

  const { LikedCoins, setLikedCoins } = useContext(WishlistContext);

  const isLiked = LikedCoins.some((coin) => coin.id === id);

  const toggleStar = () => {
    if (isLiked) {
      setLikedCoins(LikedCoins.filter((coin) => coin.id !== id));
    } else {
      setLikedCoins([coinData, ...LikedCoins]);
    }
  };

  const formatNumber = (num) => {
    return typeof num === 'number'
      ? num.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : '--';
  };

  const checkTrend = (percentage) => {
    if (typeof percentage !== 'number') return ['gray', ''];
    return percentage > 0 ? ['#17D082', '⮝'] : ['#F43D46', '⮟'];
  };

  return (
     <div className='contents text-sm lg:text-lg md:text-base bg-[#0d1421] ' onClick={() => navigate(`/coindetail/${id}`)}>
      <div 
        onClick={(e) => {
          e.stopPropagation();
          toggleStar();
        }}
      >
        <div className='flex items-center justify-center p-3 '>
          <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polygon
              fill={isLiked ? 'yellow' : 'none'}
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="12 2 15.09 8.26 22 9.27 
                    17 14.14 18.18 21.02 
                    12 17.77 5.82 21.02 
                    7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
        </div>
      </div >

      {rank !== undefined && <div>{rank}</div >}

      {image && name && symbol && (
    <div className="">
      <div className="flex items-center gap-2">
        <img src={image} className="symbol-coin" alt="logo" />
        <div className="flex items-center">
          <span>{name}</span>
          <span className="text-gray-400 ml-1 hidden md:block lg:block">
            ({symbol.toUpperCase()})
          </span>
        </div>
      </div>
    </div>
  )}


      {price !== undefined && <div  className=' p-2'>${formatNumber(price)}</div >}

      {change1hr !== undefined && (
        <div className='hidden lg:block' style={{ color: checkTrend(change1hr)[0]  }}>
          {`${formatNumber(change1hr)}% ${checkTrend(change1hr)[1]}`}
        </div >
      )}

      {change24hr !== undefined && (
        <div  style={{ color: checkTrend(change24hr)[0] }} className=''>
          {`${formatNumber(change24hr)}% ${checkTrend(change24hr)[1]}`}
        </div >
      )}

      {change7d !== undefined && (
        <div className='hidden lg:block '  style={{ color: checkTrend(change7d)[0] }}>
          {`${formatNumber(change7d)}% ${checkTrend(change7d)[1]}`}
        </div >
      )}

      {marketcap !== undefined && <div  className=' p-2 hidden md:block lg:block'>${formatNumber(marketcap)}</div >}

      {volume !== undefined && <div  className=' p-2 hidden lg:block'>${formatNumber(volume)}</div >}

      {circulatingsupply !== undefined && symbol !== undefined && (
        <div  className=' p-2 hidden lg:block'>{`${formatNumber(circulatingsupply)} ${symbol.toUpperCase()}`}</div >
      )}

      {sparkline !== undefined && (
        <div className='hidden md:block lg:block' >
          <SparkLine color={checkTrend(change7d)} prices={sparkline} />
        </div >
      )}
    </div>
    
   
  );
}

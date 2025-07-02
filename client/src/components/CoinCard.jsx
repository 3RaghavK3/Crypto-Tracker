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
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : '--';
  };

  const checkTrend = (percentage) => {
    if (typeof percentage !== 'number') return ['gray', ''];
    return percentage > 0 ? ['#17D082', '⮝'] : ['#F43D46', '⮟'];
  };

  return (
    <tr onClick={() => navigate(`/coindetail/${id}`)}>
      <td
        onClick={(e) => {
          e.stopPropagation();
          toggleStar();
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
          }}
        >
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
      </td>

      {rank !== undefined && <td>{rank}</td>}

      {image !== undefined && name !== undefined && symbol !== undefined && (
        <td>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }}>
            <img src={image} className="symbol-coin" alt="logo" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>{name}</span>&nbsp;
              <span style={{ fontWeight: 400, color: 'rgb(163, 158, 158)' }}>
                ({symbol?.toUpperCase()})
              </span>
            </div>
          </div>
        </td>
      )}

      {price !== undefined && <td>${formatNumber(price)}</td>}

      {change1hr !== undefined && (
        <td style={{ color: checkTrend(change1hr)[0] }}>
          {`${formatNumber(change1hr)}% ${checkTrend(change1hr)[1]}`}
        </td>
      )}

      {change24hr !== undefined && (
        <td style={{ color: checkTrend(change24hr)[0] }}>
          {`${formatNumber(change24hr)}% ${checkTrend(change24hr)[1]}`}
        </td>
      )}

      {change7d !== undefined && (
        <td style={{ color: checkTrend(change7d)[0] }}>
          {`${formatNumber(change7d)}% ${checkTrend(change7d)[1]}`}
        </td>
      )}

      {marketcap !== undefined && <td>${formatNumber(marketcap)}</td>}

      {volume !== undefined && <td>${formatNumber(volume)}</td>}

      {circulatingsupply !== undefined && symbol !== undefined && (
        <td>{`${formatNumber(circulatingsupply)} ${symbol.toUpperCase()}`}</td>
      )}

      {sparkline !== undefined && (
        <td>
          <SparkLine color={checkTrend(change7d)} prices={sparkline} />
        </td>
      )}
    </tr>
  );
}

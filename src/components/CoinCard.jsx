import star from '../assets/star.svg';
import { useNavigate } from 'react-router-dom';
import { SparkLine } from './SparkLine';

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

    console.log('🪙 CoinCard Props Debug:');
console.log('id:', id);
console.log('rank:', rank);
console.log('image:', image);
console.log('name:', name);
console.log('symbol:', symbol);
console.log('price:', price);
console.log('change1hr:', change1hr);
console.log('change24hr:', change24hr);
console.log('change7d:', change7d);
console.log('marketcap:', marketcap);
console.log('volume:', volume);
console.log('circulating_supply:', circulatingsupply);
console.log('sparkline:', sparkline);

  const navigate = useNavigate();

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
      <td>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
          <img style={{ height: '15px' }} src={star} alt="star" />
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

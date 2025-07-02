import { useContext } from 'react';
import { WishlistContext } from '../context/wishlistcontext';
import { CoinCard } from './CoinCard';
import { Header } from './Header';

export function Wishlist() {
  const { LikedCoins } = useContext(WishlistContext);

  return (
    <>
      <Header />

      {LikedCoins && LikedCoins.length > 0 ? (
        <div
          className="widget"
          style={{
            overflowY: 'scroll',
          }}
        >
          <span className="title-name">Wishlist</span>
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
            <tbody>
              {LikedCoins.map((coin) => {
                const { id, rank, name, symbol, price, image } = coin;
                console.log(name);
                console.log(symbol);
                return (
                  <CoinCard
                    key={id}
                    id={id}
                    rank={rank}
                    name={name}
                    symbol={symbol}
                    image={image}
                    price={price} change7d={undefined} change1hr={undefined} change24hr={undefined} marketcap={undefined} volume={undefined} circulatingsupply={undefined} sparkline={undefined}                  />
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
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '4rem',
            color: 'white',
          }}
        >
          No coins added to Wishlist
        </div>
      )}
    </>
  );
}

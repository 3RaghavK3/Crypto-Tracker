import { createElement, useEffect, useState, useContext, useRef } from 'react';
import './Homepage.css';
import star from '../assets/star.svg';
import { footercontext } from '../context/footercontext';
import { param, s } from 'framer-motion/client';
import { Link, useFetcher } from 'react-router-dom';
import { CoinCard } from './CoinCard';
import { WishlistContext } from '../context/wishlistcontext';
import { Footer } from './Footer';
import { Note } from './note';

export function Market() {
  const [marketArray, setmarketarray] = useState(null);
  const [originalArray, setoriginalarray] = useState(null);
  const { page, setPage, perPage, setPerPage } = useContext(footercontext);
  const [lastsortedkey, setlastsortedkey] = useState(null);
  const [sortstate, setsortstate] = useState(2);
  const {LikedCoins,setLikedCoins}=useContext(WishlistContext);


  useEffect(() => {
    fetch(`http://localhost:3000/market?page=${page}&perPage=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setmarketarray(data);
        setoriginalarray(data);
      })
      .catch((e) => console.log(e));
  }, [page, perPage]);


  const default_sort = (parameter) => {
    setmarketarray(originalArray);
  };

  const asc_sort = (parameter) => {
    if (parameter === 'name') {
      setmarketarray([...marketArray].sort((a, b) => a[parameter].localeCompare(b[parameter])));
    } else {
      setmarketarray([...marketArray].sort((a, b) => a[parameter] - b[parameter]));
    }
  };

  const desc_sort = (parameter) => {
    if (parameter === 'name') {
      setmarketarray([...marketArray].sort((a, b) => b[parameter].localeCompare(a[parameter])));
    } else {
      setmarketarray([...marketArray].sort((a, b) => b[parameter] - a[parameter]));
    }
  };

  const sortStates = {
    0: asc_sort,
    1: desc_sort,
    2: default_sort,
  };

  const handleSort = (parameter) => {
    let newSortState;

    if (lastsortedkey !== parameter) {
      newSortState = 0;
    } else {
      newSortState = (sortstate + 1) % 3;
    }

    setlastsortedkey(parameter);
    setsortstate(newSortState);
    sortStates[newSortState](parameter);
  };

  const getsortsymbol = (parameter) => {
    if (lastsortedkey !== parameter) return '';
    if (sortstate == 2) return '';
    if (sortstate == 0) return '⮝';
    if (sortstate == 1) return '⮟';
  };

  return (
    <>
      <div >
        {marketArray && marketArray.length>0 ?
        <div className="widget">
          <Note/>
           <table
          className="inter-text"
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
              <th onClick={() => handleSort('name')}>Name {getsortsymbol('name')}</th>
              <th onClick={() => handleSort('current_price')}>
                Price {getsortsymbol('current_price')}
              </th>
              <th onClick={() => handleSort('price_change_percentage_1h_in_currency')}>
                1h % {getsortsymbol('price_change_percentage_1h_in_currency')}
              </th>
              <th onClick={() => handleSort('price_change_percentage_24h_in_currency')}>
                24h % {getsortsymbol('price_change_percentage_24h_in_currency')}
              </th>
              <th onClick={() => handleSort('price_change_percentage_7d_in_currency')}>
                7d % {getsortsymbol('price_change_percentage_7d_in_currency')}
              </th>
              <th onClick={() => handleSort('market_cap')}>
                Market Cap {getsortsymbol('market_cap')}
              </th>
              <th onClick={() => handleSort('total_volume')}>
                Total Volume {getsortsymbol('total_volume')}
              </th>
              <th onClick={() => handleSort('circulating_supply')}>
                Circulating Supply {getsortsymbol('circulating_supply')}
              </th>
              <th style={{ textAlign: 'right' }}>Last 7 days</th>
            </tr>
          </thead>

          <tbody>
            {marketArray?.map((coin) => {
              return ( 
                  <CoinCard 
                  key={coin.id}
                  id={coin.id}
                  rank={coin.market_cap_rank} 
                  image={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  change7d={coin.price_change_percentage_7d_in_currency}
                  change1hr={coin.price_change_percentage_1h_in_currency}
                  change24hr={coin.price_change_percentage_24h_in_currency}
                  marketcap={coin.market_cap}
                  volume={coin.total_volume}
                  circulatingsupply={coin.circulating_supply}
                  sparkline={coin.sparkline_in_7d.price}
                  />
              );
            })}
          </tbody>
        </table>
        <Footer/>
        </div>
        :
          <div style={{
            display:"flex",
            flex:"1",
            alignItems:"center",
            justifyContent:"center",
            fontSize:"5rem",
            color:"white"
          }}>

            Loading..
          </div>
        }
        
      </div>
    </>
  );
}

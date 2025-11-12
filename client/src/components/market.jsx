import { createElement, useEffect, useState, useContext, useRef } from 'react';
import './Homepage.css';
import { param, s } from 'framer-motion/client';
import { Link, useFetcher } from 'react-router-dom';
import { CoinCard } from './CoinCard';
import { WishlistContext } from '../context/wishlistcontext';
import { Note } from './note';

export function Market() {
  const [marketArray, setmarketarray] = useState([]);
  const [originalArray, setoriginalarray] = useState([]);
  const [lastsortedkey, setlastsortedkey] = useState(null);
  const [sortstate, setsortstate] = useState(2);
  const { LikedCoins, setLikedCoins } = useContext(WishlistContext);
  const window_size = 8;
  const [windowstart, setwindow] = useState(0);

  const windowsentinel = useRef(null);
  const backendsentinel = useRef(null);
  const counter = Math.floor(100 / window_size) - 1;
  const unit_coutner = useRef(0);
  const [page, setPage] = useState(1);

  const displayNext = () => {
    setwindow((prev) => {
      console.log(prev + window_size);
      unit_coutner.current++;
      if (unit_coutner.current == counter) {
        setPage((p) => p + 1);
        unit_coutner.current = 0;
      }
      return prev + window_size;
    });
  };

  useEffect(() => {
    // @ts-ignore
    fetch(`http://localhost:3000/api/market?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setmarketarray((prev) => [...(prev || []), ...data]);
        setoriginalarray((prev) => [...(prev || []), ...data]);
      })
      .catch((e) => console.log(e));
  }, [page]);

  useEffect(() => {
    if (marketArray.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            displayNext();
          }
        });
      },
      { rootMargin: '0px 0px 100px 0px', threshold: 0 }
    );

    if (windowsentinel.current) {
      observer.observe(windowsentinel.current);
    }

    return () => {
      if (windowsentinel.current) {
        observer.unobserve(windowsentinel.current);
      }
    };
  }, [marketArray]);

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
      <div>
        {marketArray && marketArray.length > 0 ? (
          <div className="widget">
            {/* <Note/> */}
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

              <tbody style={{fontSize:'1rem'}}>
                {marketArray.slice(0, window_size + windowstart)?.map((coin) => {
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
            <div ref={windowsentinel} style={{ height: '1px', opacity: '0' }}></div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              color: 'white',
            }}
          >
            Loading..
          </div>
        )}
      </div>
    </>
  );
}

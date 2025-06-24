import { createElement, useEffect, useState } from "react";
import "./Homepage.css";
import star from "../assets/star.svg";
import { SparkLine } from "./SparkLine";
import { motion } from "framer-motion";

export function Market() {
  const [marketArray, setmarketarray] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/get/market")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setmarketarray(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const formatNumber = (num) => {
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

 const checkTrend = (percentage) => {
  if (percentage > 0) return ["#17D082", "⮝"];
  else return ["#F43D46", "⮟"];
};



  return (
    <>
      <div className="widget">
        <table className="inter-text"
          style={{
            height: "100%",
            width: "100%",
            color: "white",
            padding: 0,
            margin: 0,
            textAlign: "left",
          }}
        >
          <thead
            style={{
              fontSize: "1.25rem",
            }}
          >
            <tr>
              <th></th>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>1h %</th>
              <th>24h %</th>
              <th>7d %</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
              <th>Circulating Supply</th>
              <th style={{textAlign:"right"}}>Last 7 days</th>
            </tr>
          </thead>

            <tbody>
            {marketArray?.map((coin) => {
              return (
                <tr key={coin.id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding:"10px"
                      }}
                    >
                    <img style={{ height: "15px"}} src={star} />
                    </div>
                  </td>
                  <td>{coin.market_cap_rank}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <img src={coin.image} className="symbol-coin" />
                      <div 
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{coin.name}</span>&nbsp;
                        <span style={{ fontWeight: 400 ,color:"rgb(163, 158, 158)"}}>
                          ({coin.symbol.toUpperCase()})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>${formatNumber(coin.current_price)}</td>
                  {console.log(coin.price_change_percentage_7d_in_currency)}
                  <td style={{
  color: checkTrend(coin.price_change_percentage_1h_in_currency)[0] 
}}>
  {`${formatNumber(coin.price_change_percentage_1h_in_currency)}%
 ${checkTrend(coin.price_change_percentage_1h_in_currency)[1] } `}
</td>
<td style={{
  color: checkTrend(coin.price_change_percentage_24h_in_currency)[0]
}}>
  {`${formatNumber(coin.price_change_percentage_24h_in_currency)}%
  ${checkTrend(coin.price_change_percentage_24h_in_currency)[1] } `}
</td>
                 <td style={{
  color: checkTrend(coin.price_change_percentage_7d_in_currency)[0]
}}>
  {`${formatNumber(coin.price_change_percentage_7d_in_currency)}%
  ${checkTrend(coin.price_change_percentage_7d_in_currency)[1] } `}
</td>
                  <td>{`$${formatNumber(coin.market_cap)}`}</td>
                  <td>{`$${formatNumber(coin.total_volume)}`}</td>
                  <td>
                    {`${formatNumber(coin.circulating_supply)} ${coin.symbol.toUpperCase()}`}
                  </td>

                  <td>
                    <SparkLine color={checkTrend(coin.price_change_percentage_7d_in_currency)} 
                            prices={coin.sparkline_in_7d.price}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
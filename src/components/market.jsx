import { createElement, useEffect, useState } from "react";
import "./Homepage.css"

export function Market(){
        const [marketArray,setmarketarray]=useState(null);
        
    
         useEffect(() => {
       fetch("http://localhost:3000/get/market")
       .then((res)=>res.json())
       .then((data)=>{
        console.log(data)
        setmarketarray(data);
       })
       .catch((e)=>console.log(e))
    }
   , []);
    
      const formatNumber = (num) => {
  return Number.isInteger(num) ? num : num.toFixed(2);
};

      return(
        <>
                <div className="widget">
                <span className="title-name">Market</span>
                <table style={{
                    height:"100%",
                    width:"100%",
                    color:"white",
                    border:"1px solid red",
                    padding:0,
                    margin:0,
                    textAlign:"left",
                }}>
                   <thead style={{
                    fontSize:"1.25rem"
                   }}>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Current Price</th>
                    <th>24h % Change</th>
                    <th>Market Cap</th>
                    <th>Total Volume</th>
                    <th>Circulating Supply</th>
                </tr>
                </thead>

                
                <tbody>
                 {marketArray?.map(coin => {
                    return(
                        <tr  key={coin.id}>
                            <td>{coin.market_cap_rank}</td>
                             <td style={{
                                fontSize:"1.5rem"
                             }}>{coin.name} ({coin.symbol})</td>
                          
                            <td>${formatNumber(coin.current_price)}</td>
<td>{formatNumber(coin.price_change_24h)}</td>
<td>{formatNumber(coin.market_cap)}</td>
<td>{formatNumber(coin.total_volume)}</td>
<td>{formatNumber(coin.circulating_supply)}</td>
                        </tr>
                    )
                })}
                </tbody>
               
                </table>
                </div>
                
        </>
        )



}


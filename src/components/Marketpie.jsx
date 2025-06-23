import React from "react";
import { Chart ,ArcElement,Tooltip,Legend} from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Global.css"

Chart.register(ArcElement,Tooltip,Legend)


export function Marketpie({info}){

        if (!info || !info.market_cap_percentage) {
    return <p>Loading...</p>;
    }   

      
      const labels=Object.keys(info.market_cap_percentage)
      const backgroundColors=labels.map(()=>{
            const r=Math.floor(Math.random()*256)
            const g=Math.floor(Math.random()*256)
            const b=Math.floor(Math.random()*256)
             return `rgba(${r}, ${g}, ${b}, 0.6)`;
      })

        const data={
            labels,
            datasets:[{
                     data: Object.values(info.market_cap_percentage),
                     backgroundColor:backgroundColors
            }]
        }

        return(
            <>
            <div className="market-pie-chart" >
                <div style={{ color: "white", textAlign: "center",border:"1px solid white",height:"fit-content",fontSize:"1.5rem",marginBottom:"10px" }}>
        Market Cap Dominance
      </div>

            <div style={{height:"75%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Pie data={data}
                options={
                    {
                        
                        plugins:{
                            legend:{
                                display:false
                            }
                        }
                    }
                }/>
            </div>
                
            </div>
            </>
        )
}
import { useContext } from "react";
import { WishlistContext } from "../context/wishlistcontext";
import { CoinCard } from "./CoinCard";

export function Wishlist(){
    const {LikedCoins,setLikedCoins}=useContext(WishlistContext);
    
    return(
        <>
                <table style={{
                height:"80%",
                padding:"0 auto",
                border:"1px solid red",
                color:"white"
            }}>
            
            {LikedCoins.map((coin )=>(
                    <CoinCard key={coin.id}{...coin} />
            ))}
            
            </table>
        </>
    )
    

  
}
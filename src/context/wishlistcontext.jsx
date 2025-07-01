import { createContext, useState } from "react"


export const WishlistContext=createContext();

export const WishlistProvider=({children})=>{

    const[LikedCoins,setLikedCoins]=useState([])


    return(
        <WishlistContext.Provider value={{LikedCoins,setLikedCoins}}>
                {children}
        </WishlistContext.Provider>
    )
}
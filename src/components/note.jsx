import { useEffect, useRef, useState } from "react";
import "./note.css"

export function Note(){
    const noteRef=useRef(null)
    const [shownote,setshownote]=useState(false);

    const ShowNote=()=>{
        setshownote(!shownote)
    }

    useEffect(()=>{
        if(shownote){
            noteRef.current.classList.add("show")
            noteRef.current.classList.remove("hide")
        }
        else{
            noteRef.current.classList.add("hide")
            noteRef.current.classList.remove("show")
        }
    },[shownote])


    return(
        <>
        <div className="note" onMouseEnter={ShowNote}
        onMouseLeave={ShowNote}>

            <div style={{
                fontSize:"1.25rem",
                borderBottom:"1px solid grey"
            }}>Tip</div>

            <ul ref={noteRef}
            >
                <li> Use the options at the bottom to select how many rows per page, navigate pages</li>
                <li> Sort by clicking column headers.</li>
            </ul>
        </div>
        </>
    )
}
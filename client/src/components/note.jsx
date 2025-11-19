import { useState } from "react";

export function Note() {
  const [clicked,setclicked]=useState(false);
  return (
    <div className="px-2 bg-black">
           <div className=" text-white rounded-lg shadow-lg p-1 ">
      <div className="border-b border-gray-600 cursor-pointer flex items-center gap-2 text-base lg:text-xl" onClick={()=>setclicked(!clicked)}>
        <span>Note</span>
        <span className="text-red-500">(Click)</span>
      </div>

      <div className={`transition-all duration-300 text-sm  ${!clicked ? 'opacity-0 max-h-0 pointer-events-none':'opacity-100 max-h-96 pointer-events-auto'} `}>
        <ul className="list-disc p-4">
        <li>Sort by clicking column headers (applies to visible coins).</li>
        <li>
          Click on a coin row to view its details.
        </li>
        </ul>
        
      </div>
    </div>
    </div>
   
  );
}

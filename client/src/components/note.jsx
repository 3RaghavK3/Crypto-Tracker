import { useState } from 'react';

export function Note() {
  const [shownote, setshownote] = useState(false);

  return (
    <div 
      className="bg-black-800 text-white rounded-lgshadow-lg  pl-4"
      onMouseEnter={() => setshownote(true)} 
      onMouseLeave={() => setshownote(false)}
    >
      <div className="text-xl border-b border-gray-600 flex gap-2 items-center">
          <span>Note</span>
          <span className='text-sm text-red-500'>(Hover)</span>
      </div>

      <ul
        className={`list-disc transition-all duration-300 ease-in-out pl-4 ${
          shownote ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
        }`}
      > 
        <li>Make changes slowly to avoid hitting API limits</li>
        <li>Sort by clicking column headers.</li>
        <li>The initial sort affects only loaded items. Full sorting is applied as additional items are fetched.</li>
        
      </ul>
    </div>
  );
}
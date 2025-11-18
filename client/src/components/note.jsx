export function Note() {
  return (
    <div className="px-2 bg-black">
           <div className=" text-white rounded-lg shadow-lg p-1 group">
      <div className="border-b border-gray-600 cursor-pointer flex items-center gap-2 text-base lg:text-xl">
        <span>Note</span>
        <span className="text-red-500">(Hover)</span>
      </div>

      <div className="transition-all duration-300  opacity-1 max-h-0 pointer-events-none group-hover:opacity-100 group-hover:max-h-96 text-sm">
        <ul className="list-disc p-4">
        <li>Sort by clicking column headers.</li>
        <li>
          The initial sort affects only loaded items. Full sorting is applied as additional items are fetched.
        </li>
        </ul>
        
      </div>
    </div>
    </div>
   
  );
}

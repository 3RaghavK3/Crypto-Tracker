import logo from '../assets/logo.svg';
import sun from '../assets/sun.svg';
import moon from '../assets/moon.svg';

export function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-[#141414] text-white border border-black px-6 py-3">
      {/* Left Logo + Title */}
      <div className="flex items-center h-[50px] gap-2">
        <img src={logo} className="h-full" alt="Logo" />
        <span className="text-2xl font-[400] font-['Paytone_One']">CRYPTO.</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-10 text-[1.5rem] font-['Acme'] font-normal border border-white px-4 py-1 rounded">
        <span>Home</span>
        <span>Market</span>
        <span>Compare</span>
        <span>Categories</span>
        <span>Movers</span>
        <span>New</span>
      </nav>

      {/* Sun Icon */}
      <div>
        <img src={sun} className="h-8 w-8" alt="Sun" />
      </div>
    </header>
  );
}

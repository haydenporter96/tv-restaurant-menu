
import React from 'react';

const Header = () => {
  return (
    <header className="overflow-hidden" style={{ height: '120px' }}>
      <img 
        src="/lovable-uploads/fbb940dc-fdcf-48fd-9586-5c3df39a248e.png"
        alt="BIB Noodle Bar Header"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to gradient background if header image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.className = "bg-gradient-to-r from-red-800 to-red-900 text-white py-6 px-8 shadow-lg flex items-center justify-center";
            parent.innerHTML = '<div class="text-center"><div class="w-32 h-16 bg-white/20 border-2 border-white/30 rounded-lg flex items-center justify-center mb-2"><span class="text-sm font-medium">LOGO</span></div><h1 class="text-4xl font-bold tracking-wide">Restaurant Menu</h1></div>';
          }
        }}
      />
    </header>
  );
};

export default Header;


import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-red-800 to-red-900 text-white py-6 px-8 shadow-lg">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-16 bg-white/20 border-2 border-white/30 rounded-lg flex items-center justify-center mb-2">
            <span className="text-sm font-medium">LOGO</span>
          </div>
          <h1 className="text-4xl font-bold tracking-wide">Restaurant Menu</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

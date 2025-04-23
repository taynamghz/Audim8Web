'use client';

import { useRef, useEffect } from 'react';

export default function Footer() {
  return (
    <footer className="w-full h-[30vh] relative bg-white z-50">

      {/* Logo in the bottom-left corner */}
      <div className="absolute bottom-8 left-8 z-50">
        <img 
          src="/images/logo2.png" // Logo path
          alt="Logo" 
          className="w-20 h-40" // Adjust the logo size if needed
        />
      </div>

      {/* Film tape image in the bottom-right corner */}
      <div className="absolute bottom-8 right-8 z-50">
        <img 
          src="/images/filmTape3.png" // Path to the film tape image
          alt="Film Tape"
          className="w-180 h-90" // Adjust the size as needed
        />
      </div>
    </footer>
  );
}

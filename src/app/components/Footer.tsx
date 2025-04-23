'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full h-[30vh] relative bg-white z-50">

      {/* Logo in the bottom-left corner */}
      <div className="absolute bottom-8 left-8 z-50">
        <Image 
          src="/images/lgoo.png" // Make sure this path is correct and starts with /
          alt="Logo" 
          width={100} 
          height={30}
        />
      </div>

      {/* Film tape image in the bottom-right corner */}
      <div className="absolute bottom-8 right-8 z-50">
        <Image 
          src="/images/filmTape3.png"
          alt="Film Tape"
          width={180} 
          height={90}
        />
      </div>
    </footer>
  );
}

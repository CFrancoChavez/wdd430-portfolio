'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {year} | Cesar Franco Chavez | All rights reserved</p>
      </div>
    </footer>
  );
}
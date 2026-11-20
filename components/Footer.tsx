'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function Footer() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => 2026
  );

  return (
    <footer className="bg-gray-800 text-white py-4 mt-12">
      <div className="container mx-auto text-center">
        <p>Copyright &copy; {year} | Cesar Franco Chavez | All rights reserved</p>
      </div>
    </footer>
  );
}
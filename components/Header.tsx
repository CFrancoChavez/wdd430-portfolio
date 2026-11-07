import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="max-w-4xl mx-auto px-4 text-2xl font-bold mb-2">
        Cesar Franco Chavez
      </div>
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <ul className="flex gap-6">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/about" className="hover:underline">About</Link></li>
          {/* Nueva sección global en el Header */}
          <li><Link href="/projects" className="hover:underline">Projects</Link></li>
        </ul>
      </nav>
    </header>
  );
}
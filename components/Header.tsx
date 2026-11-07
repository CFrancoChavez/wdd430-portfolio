import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div id="header-title" className="max-w-4xl mx-auto px-4 text-2xl font-bold mb-2">
        Cesar Franco Chavez
      </div>
      <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center" aria-label="Primary">
        <NavLinks />
      </nav>
    </header>
  );
}
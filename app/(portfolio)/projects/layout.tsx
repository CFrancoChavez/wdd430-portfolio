import Link from 'next/link';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Navegación secundaria con texto visible */}
      <nav className="flex space-x-4 border-b border-gray-300 pb-3 text-sm font-semibold text-gray-700">
        <Link href="/projects" className="hover:text-blue-600 transition-colors">
          Overview
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/projects/opensource" className="hover:text-blue-600 transition-colors">
          Open Source
        </Link>
        <span className="text-gray-400">|</span>
        <Link href="/projects/school" className="hover:text-blue-600 transition-colors">
          School
        </Link>
      </nav>

      {/* Contenido dinámico */}
      <div>{children}</div>
    </section>
  );
}
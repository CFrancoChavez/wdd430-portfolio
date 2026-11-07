'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <ul className="flex gap-6">
      {links.map(({ href, label }) => {
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

        return (
          <li key={href}>
            <Link
              href={href}
              className={`transition-colors ${
                isActive
                  ? 'font-bold underline text-white'
                  : 'hover:underline text-blue-100'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
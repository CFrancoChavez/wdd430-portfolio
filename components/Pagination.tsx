'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between pt-4 border-t border-gray-200">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          ← Previous
        </span>
      )}

      <span className="text-sm text-gray-600">
        Page <strong className="text-gray-900">{currentPage}</strong> of{' '}
        <strong className="text-gray-900">{totalPages}</strong>
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          Next →
        </span>
      )}
    </nav>
  );
}
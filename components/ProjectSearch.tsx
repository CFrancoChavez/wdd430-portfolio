'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="w-full">
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        placeholder="Search projects by title, description, or technology..."
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}
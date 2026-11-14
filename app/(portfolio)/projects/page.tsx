import { Suspense } from 'react';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { ProjectSearch } from '@/components/ProjectSearch';
import { Pagination } from '@/components/Pagination';

async function ProjectsList({
  searchParamsPromise,
}: {
  searchParamsPromise?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const [projects, totalPages] = await Promise.all([
    fetchFilteredProjects(query, currentPage),
    fetchProjectsPages(query),
  ]);

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <p className="text-gray-600">No projects found matching &ldquo;{query}&rdquo;.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">{p.title}</h2>
              <p className="text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default function ProjectsOverviewPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Projects Overview</h1>

      <Suspense fallback={<div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p className="text-gray-600">Loading projects...</p>}>
        <ProjectsList searchParamsPromise={props.searchParams} />
      </Suspense>
    </div>
  );
}
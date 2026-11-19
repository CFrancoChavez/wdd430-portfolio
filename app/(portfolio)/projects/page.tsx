import { Suspense } from 'react';
import Link from 'next/link';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';
import { deleteProject } from '@/lib/actions';
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
          {projects.map((p) => {
            const deleteProjectWithId = deleteProject.bind(null, String(p.id));

            return (
              <div
                key={p.id}
                className="p-5 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">{p.title}</h2>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {p.type}
                    </span>
                  </div>
                  <p className="text-gray-600">{p.description}</p>
                  {Array.isArray(p.technologies) && p.technologies.length > 0 && (
                    <p className="text-sm text-gray-700">
                      <strong>Technologies:</strong> {p.technologies.join(', ')}
                    </p>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-indigo-600 hover:underline font-medium"
                    >
                      View Project &rarr;
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/projects/${p.id}/edit`}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Edit
                  </Link>
                  <form action={deleteProjectWithId}>
                    <button
                      type="submit"
                      className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-900">Projects Overview</h1>
        <Link
          href="/projects/create"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          + New Project
        </Link>
      </div>

      <Suspense fallback={<div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse" />}>
        <ProjectSearch />
      </Suspense>

      <Suspense fallback={<p className="text-gray-600">Loading projects...</p>}>
        <ProjectsList searchParamsPromise={props.searchParams} />
      </Suspense>
    </div>
  );
}
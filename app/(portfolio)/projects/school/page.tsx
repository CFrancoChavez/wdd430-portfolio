import { Suspense } from 'react';
import { getProjects } from '@/lib/projects-db';

function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse grid gap-4">
      <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
        <div className="h-6 w-1/2 rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
      </div>
      <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
        <div className="h-6 w-2/5 rounded bg-slate-200" />
        <div className="h-4 w-3/4 rounded bg-slate-200" />
      </div>
    </div>
  );
}

async function SchoolList() {
  const projects = await getProjects('school');

  return (
    <div className="grid gap-4">
      {projects.map((p) => (
        <div key={p.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">{p.title}</h2>
          <p className="text-gray-600">{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function SchoolProjectsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">School Projects</h1>
      <Suspense fallback={<ProjectCardSkeleton />}>
        <SchoolList />
      </Suspense>
    </div>
  );
}
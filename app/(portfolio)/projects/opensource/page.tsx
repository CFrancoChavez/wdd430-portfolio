import { Suspense } from 'react';
import { getProjects } from '@/lib/projects-db';

async function OpenSourceList() {
  const projects = await getProjects('opensource');

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

export default function OpenSourceProjectsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Open Source Projects</h1>
      <Suspense fallback={<p className="text-gray-600">Loading open source projects...</p>}>
        <OpenSourceList />
      </Suspense>
    </div>
  );
}
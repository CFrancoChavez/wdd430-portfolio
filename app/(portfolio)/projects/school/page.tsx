import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjectsPage() {
  const projects = getProjects('school');

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">School Projects</h1>
      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">{p.title}</h2>
            <p className="text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
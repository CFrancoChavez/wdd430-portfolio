import Link from 'next/link';
import { createProject } from '@/lib/actions';

export default function CreateProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add a new open source or school project to your portfolio database.
        </p>
      </div>

      <form
        action={createProject}
        className="space-y-5 bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
      >
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g., Sacrament Meeting Planner"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            placeholder="Describe what the project does and the problem it solves..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-800 mb-1">
            Project Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue="school"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white focus:border-indigo-600 focus:outline-none"
          >
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
        </div>

        <div>
          <label htmlFor="technologies" className="block text-sm font-medium text-gray-800 mb-1">
            Technologies (comma-separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-800 mb-1">
            Repository or Demo URL (optional)
          </label>
          <input
            id="link"
            name="link"
            type="url"
            placeholder="https://github.com/CFrancoChavez/..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Save Project
          </button>
          <Link
            href="/projects"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
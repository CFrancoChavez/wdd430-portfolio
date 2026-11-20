import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add a new open source or school project to your portfolio database.
        </p>
      </div>

      <CreateProjectForm />
    </div>
  );
}
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Esqueleto del título */}
      <div className="h-9 w-64 rounded bg-slate-200" />

      {/* Esqueleto de tarjetas de proyectos */}
      <div className="grid gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
          <div className="h-6 w-1/2 rounded bg-slate-200" />
          <div className="h-4 w-5/6 rounded bg-slate-200" />
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200 space-y-3">
          <div className="h-6 w-2/5 rounded bg-slate-200" />
          <div className="h-4 w-3/4 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
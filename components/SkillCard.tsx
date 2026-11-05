interface SkillCardProps {
  category: string;
  skills: string[];
}

export default function SkillCard({ category, skills }: SkillCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-4">
      <h3 className="text-xl font-bold text-blue-600 mb-3">{category}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
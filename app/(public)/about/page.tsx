import type { Metadata } from 'next';
import SkillCard from '@/components/SkillCard';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about my background, technical skills, and full-stack web development experience.',
};

export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-lg text-gray-800 mb-6">
        Welcome! I am a full-stack web development student working with Next.js App Router, React, and TypeScript.
      </p>
      <SkillCard
        category="Technical Skills"
        skills={['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Git & GitHub', 'REST APIs']}
      />
    </main>
  );
}
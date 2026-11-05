import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'React Core Concepts Practice',
    description: 'An interactive HTML practice file demonstrating React components, props, state, and DOM manipulation.',
    technologies: ['React', 'JavaScript', 'HTML5', 'Babel'],
    link: 'https://github.com/tu-usuario/wdd430-react-dom-practice'
  },
  {
    title: 'Stripe Architecture Research',
    description: 'A full-stack architectural breakdown of Stripe Dashboard tech stack and transaction layer.',
    technologies: ['React', 'TypeScript', 'Ruby', 'PostgreSQL'],
    link: 'https://github.com/tu-usuario/wdd430-portfolio'
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
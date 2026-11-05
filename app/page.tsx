import ProjectList from '@/components/ProjectList';

const projects = [
  {
    title: 'Sleep Outside E-Commerce App',
    description: 'An e-commerce web application for outdoor gear featuring dynamic product catalogs, cart management, and modular JavaScript architecture.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST API', 'Vite'],
    link: 'https://github.com/CFrancoChavez/wdd330-sleepoutside'
  },
  {
    title: 'CryptoDash - Cryptocurrency Dashboard',
    description: 'A real-time cryptocurrency tracking dashboard that visualizes market trends, prices, and live data from external crypto APIs.',
    technologies: ['JavaScript', 'Tailwind CSS', 'REST API', 'Vite'],
    link: 'https://github.com/CFrancoChavez/cryptodash'
  }
];

export default function Home() { 
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-800">
          I'm a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}
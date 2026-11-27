import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Cesar Franco Chavez for full-stack web development opportunities.',
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">
        Contact Me
      </h1>
      <p className="text-gray-700 leading-relaxed">
        Feel free to reach out via email or connect with me on social media.
      </p>
    </main>
  );
}
'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const skills = {
    'Languages': ['TypeScript', 'JavaScript', 'Rust', 'Python', 'Bash'],
    'Frontend': ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    'Backend': ['Node.js', 'Express', 'REST APIs', 'PostgreSQL'],
    'Tools': ['Git', 'Docker', 'Linux', 'VS Code', 'Cursor']
  };

  const projects = [
    {
      title: 'Personal Portfolio',
      description: 'Clean, minimal portfolio website built with Next.js and TypeScript. Features responsive design and smooth animations.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/natasha-veda/natasha-portfolio'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-mono text-[var(--color-accent)] border border-[var(--color-border)] rounded">
            Available for work
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-text)]">
            Natasha
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-2xl">
            Senior Software Engineer specializing in React, TypeScript, and Node.js. 
            Building clean, performant web applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-[var(--color-text)] text-white font-medium rounded hover:bg-[var(--color-text-secondary)] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              View Projects
            </a>
            <a
              href="https://github.com/natasha-veda"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] font-medium rounded hover:border-[var(--color-text)] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-text)]">
            About
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-[var(--color-text-secondary)] mb-4">
                I'm a Senior Software Engineer with expertise in building modern web applications. 
                I focus on writing clean, maintainable code and creating exceptional user experiences.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)]">
                When I'm not coding, I'm exploring new technologies, contributing to open source, 
                and sharing knowledge with the developer community.
              </p>
            </div>
            <div className="bg-[var(--color-bg-secondary)] p-6 rounded border border-[var(--color-border)]">
              <h3 className="text-xl font-bold mb-4 text-[var(--color-text)]">Quick Facts</h3>
              <ul className="space-y-2 text-[var(--color-text-secondary)]">
                <li className="flex items-start">
                  <span className="text-[var(--color-accent)] mr-2">▸</span>
                  <span>5+ years of professional experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-accent)] mr-2">▸</span>
                  <span>Full-stack development expertise</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-accent)] mr-2">▸</span>
                  <span>Open source contributor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-accent)] mr-2">▸</span>
                  <span>Based in India, working globally</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-text)]">
            Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <div
                key={category}
                className="p-6 border border-[var(--color-border)] rounded hover:border-[var(--color-text)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-lg font-bold mb-4 text-[var(--color-text)] font-mono">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded border border-[var(--color-border)] font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-700 ease-out">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--color-text)]">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className="p-6 border border-[var(--color-border)] rounded hover:border-[var(--color-text)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded font-mono border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--color-accent)] hover:underline font-medium"
                >
                  View on GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
        <div className="fade-in opacity-0 translate-y-4 transition-all duration-700 ease-out text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--color-text)]">
            Get In Touch
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/natasha-veda"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] font-medium rounded hover:border-[var(--color-text)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              GitHub
            </a>
            <a
              href="mailto:natasha@example.com"
              className="px-6 py-3 bg-[var(--color-text)] text-white font-medium rounded hover:bg-[var(--color-text-secondary)] hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 border-t border-[var(--color-border)] mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[var(--color-text-secondary)]">
          <p className="font-mono">© 2024 Natasha. All rights reserved.</p>
          <p className="font-mono mt-2 md:mt-0">Built with Next.js & TypeScript</p>
        </div>
      </footer>

      <style jsx>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </main>
  );
}

import { useState } from 'react'
import { Brain, Code, ExternalLink, Github, Globe, Laptop, Smartphone, Calendar, FlaskConical, Sliders } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// Icon mapping: Use component references (e.g., Brain) instead of JSX tags (e.g., <Brain />)
const CATEGORY_ICONS = {
  'Machine Learning': Brain,
  'Research': Sliders,
  'Data Science': Brain,
  'Full Stack': Laptop,
  'Mobile Development': Smartphone,
  'Web Development': Globe,
};

function ProjectCard({ project, i }) {
  if (!project) return null;

  const technologies = project.technologies || [];
  const highlights = project.highlights || [];

  return (
    <RoughBox
      filter="sm"
      tilt={i % 2 === 0 ? 'r' : 'l'}
      color="#475569"
      className="mb-12 p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
        <div>
          <h3 className="font-pen text-lg font-bold text-slate-900 dark:text-slate-100">
            {project.title}
          </h3>
        </div>
        <div className="shrink-0">
          <p className="font-marker text-base font-bold text-slate-400 dark:text-slate-500">
            {project.duration}
          </p>
        </div>
      </div>

      <p className="mt-2 font-pen text-[15px] text-slate-500 dark:text-slate-400">
        {project.description}
      </p>

      {technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech, idx) => (
            <span key={idx} className="px-2.5 py-0.5 xs:text-xs font-medium bg-slate-100/50 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200 rounded">
              {tech}
            </span>
          ))}
        </div>
      )}

      {highlights.length > 0 && (
        <div className="mt-4 space-y-1">
          <p className="font-semibold text-slate-700 dark:text-slate-200">Highlights:</p>
          <ul className="mt-1 space-y-0.5 pl-5 list-disc text-slate-600 dark:text-slate-400">
            {highlights.map((hl, idx) => (
              <li key={idx}>{hl}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <span className="px-2.5 py-0.5 xs:text-xs font-medium bg-slate-100/50 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200 rounded">
          {project.status}
        </span>
        {project.github && (
          <a href={project.github} className="text-sm underline hover:no-underline">
            Github
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-0.5 xs:text-xs font-medium bg-slate-100/50 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200 rounded hover:bg-slate-200/50 dark:hover:bg-slate-700/30"
          >
            Demo
          </a>
        )}
      </div>
    </RoughBox>
  );
}

export default function Projects({ projects = [] }) {
  const featuredProjects = projects.filter(p => p.featured);
  const regularProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-8">
      <SectionHeading
        id="projects-title"
        label="// selected work"
        title="Projects"
        hint={`${projects.length} total`}
      />

      <div className="space-y-8">
        {featuredProjects.length > 0 && (
          <>
            <h2 className="font-marker text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-4">
              Featured Projects
            </h2>
            <div className="space-y-6">
              {featuredProjects.map((proj, idx) => (
                <ProjectCard key={proj.id} project={proj} i={idx} />
              ))}
            </div>
          </>
        )}
        {regularProjects.length > 0 && (
          <>
            <h2 className="font-marker text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-4">
              Other Projects
            </h2>
            <div className="space-y-6">
              {regularProjects.map((proj, idx) => (
                <ProjectCard key={proj.id} project={proj} i={featuredProjects.length + idx} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

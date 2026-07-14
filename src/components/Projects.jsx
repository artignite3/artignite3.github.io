import { useState } from 'react'
import { Brain, Bot, Code2, Database, ExternalLink, Github, Globe, Laptop, Smartphone, Calendar, FlaskConical, Sliders, Wrench } from 'lucide-react'
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

// Mapping from project categories to style keys used in CoursesTaken section
const PROJECT_CATEGORY_STYLES = {
  'Machine Learning • NLP': 'ml',
  'Machine Learning': 'ml',
  'Research': 'ml',
  'Full Stack': 'web',
  'Mobile Development': 'tools',
  'Web Development': 'web',
};

// Style definitions matching those in CoursesTaken.jsx
const CATEGORY_STYLES = {
  languages: {
    icon: Code2,
    iconClass: 'text-sky-500 dark:text-sky-400',
    chipClass: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
    bgColor: '#eff6ff', // blue-50
  },
  ml: {
    icon: Bot,
    iconClass: 'text-violet-500 dark:text-violet-400',
    chipClass: 'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200',
    bgColor: '#f5f3ff', // indigo-50
  },
  web: {
    icon: Globe,
    iconClass: 'text-amber-500 dark:text-amber-400',
    chipClass: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100',
    bgColor: '#fffbeb', // amber-50
  },
  databases: {
    icon: Database,
    iconClass: 'text-emerald-500 dark:text-emerald-400',
    chipClass: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
    bgColor: '#ecfdf5', // emerald-50
  },
  tools: {
    icon: Wrench,
    iconClass: 'text-rose-500 dark:text-rose-400',
    chipClass: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
    bgColor: '#fff1f2', // rose-50
  },
};

function ProjectCard({ project, i }) {
  if (!project) return null;

  const technologies = project.technologies || [];
  const highlights = project.highlights || [];

  // Helper: background color based on project status
  function getStatusBgColor(status) {
    const s = (status || '').toLowerCase();
    if (s.includes('present') || s.includes('ongoing') || s.includes('active')) {
      return '#10b981'; // green-500
    }
    if (s.includes('completed') || s.includes('finished') || s.includes('done')) {
      return '#6b7280'; // gray-500
    }
    if (s.includes('research') || s.includes('study') || s.includes('investigation')) {
      return '#3b82f6'; // blue-500
    }
    // default
    return '#6b7280';
  }

  // Border color for the card (same as status background for simplicity)
  const borderColor = getStatusBgColor(project.status);

  // Get category style for technology chips
  const categoryStyleKey = PROJECT_CATEGORY_STYLES[project.category] || 'tools'; // default to tools
  const chipClass = CATEGORY_STYLES[categoryStyleKey].chipClass;

  return (
    <RoughBox
      filter="sm"
      tilt={i % 2 === 0 ? 'r' : 'l'}
      color={borderColor}
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
            <span
              key={idx}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-bold tracking-tight ${chipClass}`}
            >
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
        <span
          className="px-2.5 py-0.5 xs:text-xs font-medium rounded text-white"
          style={{ backgroundColor: getStatusBgColor(project.status) }}
        >
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
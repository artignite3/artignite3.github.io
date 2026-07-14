import { Briefcase, GraduationCap } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

// Helper function to determine icon based on timeline entry title
const getIconForTimelineEntry = (title) => {
  const lowerTitle = title.toLowerCase()
  if (lowerTitle.includes('b.tech') ||
      lowerTitle.includes('bachelor') ||
      lowerTitle.includes('degree') ||
      lowerTitle.includes('education') ||
      lowerTitle.includes('university') ||
      lowerTitle.includes('college') ||
      lowerTitle.includes('school')) {
    return GraduationCap
  } else {
    // Default to briefcase for work/experience items
    return Briefcase
  }
}

const isExperienceOrEducation = (title) => {
  const lowerTitle = title.toLowerCase()
  return (
    lowerTitle.includes('b.tech') ||
    lowerTitle.includes('bachelor') ||
    lowerTitle.includes('degree') ||
    lowerTitle.includes('education') ||
    lowerTitle.includes('university') ||
    lowerTitle.includes('college') ||
    lowerTitle.includes('school') ||
    lowerTitle.includes('class') ||
    lowerTitle.includes('jee') ||
    lowerTitle.includes('iapt') ||
    lowerTitle.includes('nsep') ||
    lowerTitle.includes('cbse') ||
    lowerTitle.includes('exam') ||
    lowerTitle.includes('assistant') ||
    lowerTitle.includes('intern') ||
    lowerTitle.includes('coordinator') ||
    lowerTitle.includes('lead') ||
    lowerTitle.includes('tech meet') ||
    lowerTitle.includes('research') ||
    lowerTitle.includes('club') ||
    lowerTitle.includes('production') ||
    lowerTitle.includes('member') ||
    lowerTitle.includes('event') ||
    lowerTitle.includes('contest') ||
    lowerTitle.includes('competition') ||
    lowerTitle.includes('contestant') ||
    lowerTitle.includes('participant') ||
    lowerTitle.includes('contingent') 
  )
}

export default function ExperienceTimeline({ timeline = [] }) {
  const filteredTimeline = timeline.filter((node) => isExperienceOrEducation(node.title))

  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-8">
      <SectionHeading
        id="experience-title"
        label="// trajectory"
        title="Experience & Education"
        hint="git log --oneline"
      />

      <ol className="relative ml-1 space-y-4 lg:grid lg:grid-cols-[1fr_3rem_1fr] lg:gap-y-4 lg:space-y-0">
        <span
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-300/80 dark:bg-slate-700 lg:block"
          aria-hidden="true"
        />
        {filteredTimeline.map((node, index) => {
          const isFirst = index === 0;
          const Icon = getIconForTimelineEntry(node.title);
          const isLeft = index % 2 === 0;
          const isPresent = node.present ?? false;
          const isHighlighted = isPresent || isFirst;

          const titleColor = 'text-slate-900 dark:text-slate-100';
          const yearColor = isHighlighted ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400';
          const markerBorderColor = isHighlighted ? '#2563eb' : '#64748b';
          const markerIconColor = isHighlighted ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400';
          const boxColor = isFirst ? '#2563eb' : '#475569';

          return (
            <li key={index} className="relative pl-14 lg:col-span-3 lg:col-span-3 lg:grid lg:grid-cols-[1fr_3rem_1fr] lg:items-start lg:pl-0">
              {/* Node marker (a small drawn circle) */}
              <span
                className="absolute left-0 top-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white lg:left-1/2 lg:-translate-x-1/2"
                style={{
                  filter: 'url(#rough-sm)',
                  border: `2px solid ${markerBorderColor}`,
                }}
                aria-hidden="true"
              >
                <Icon className={`h-4 w-4 ${markerIconColor}`} />
              </span>

              <div className={`lg:max-w-xl ${isLeft ? 'lg:col-start-1 lg:justify-self-end lg:mr-3' : 'lg:col-start-3 lg:justify-self-start lg:ml-3'}`}>
                <RoughBox
                  filter="sm"
                  tilt={index % 2 === 0 ? 'r' : 'l'}
                  color={boxColor}
                  className="p-3.5 sm:p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                    <h3 className={`font-pen text-lg font-bold ${titleColor}`}>{node.title}</h3>
                    {/* Year pinned in a marker badge */}
                    <span className="shrink-0 text-right">
                      <span
                        className={`block font-marker text-base font-bold ${yearColor}`}>
                        {node.year}
                      </span>
                    </span>
                  </div>
                  <p className="font-pen mt-0.5 text-[15px] text-slate-500 dark:text-slate-400">{node.description}</p>
                </RoughBox>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
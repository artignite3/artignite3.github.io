import { Bot, BookMarked, Code2, Database, Globe, GraduationCap, Wrench } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

const CATEGORY_STYLES = {
  languages: {
    icon: Code2,
    iconClass: 'text-sky-500 dark:text-sky-400',
    chipClass:
      'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200',
    bgColor: '#eff6ff', // blue-50
  },
  ml: {
    icon: Bot,
    iconClass: 'text-violet-500 dark:text-violet-400',
    chipClass:
      'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200',
    bgColor: '#f5f3ff', // indigo-50
  },
  web: {
    icon: Globe,
    iconClass: 'text-amber-500 dark:text-amber-400',
    chipClass:
      'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100',
    bgColor: '#fffbeb', // amber-50
  },
  databases: {
    icon: Database,
    iconClass: 'text-emerald-500 dark:text-emerald-400',
    chipClass:
      'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200',
    bgColor: '#ecfdf5', // emerald-50
  },
  tools: {
    icon: Wrench,
    iconClass: 'text-rose-500 dark:text-rose-400',
    chipClass:
      'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200',
    bgColor: '#fff1f2', // rose-50
  },
}

const CATEGORY_ORDER = [
  { key: 'languages', title: 'Languages' },
  { key: 'ml', title: 'ML / AI' },
  { key: 'web', title: 'Web & Backend' },
  { key: 'databases', title: 'Databases & Storage' },
  { key: 'tools', title: 'Tools & Platforms' },
]

const normalizeSkills = (skills = {}) => ({
  languages: skills.languages ?? [],
  ml: skills.techStack?.machineLearning ?? skills.machineLearning ?? [],
  web: [
    ...(skills.frontend ?? []),
    ...(skills.backend ?? []),
  ],
  databases: skills.techStack?.database ?? skills.databases ?? [],
  tools: skills.techStack?.deployment ?? skills.cloudAndTools ?? [],
})

export default function CoursesTaken({ teaching = [], skills = {} }) {
  const categories = normalizeSkills(skills)
  const hasSkills = CATEGORY_ORDER.some(({ key }) => categories[key].length > 0)
  if (!teaching.length && !hasSkills) return null

  return (
    <section id="teaching" aria-labelledby="courses-title" className="scroll-mt-8">
      <SectionHeading
        id="courses-title"
        label="// technical profile"
        title="Technical Skills & Relevant Coursework"
        hint="./resume"
      />

      <div className="space-y-6">
        <RoughBox filter="sm" tilt="l" color="#0f172a" className="p-5 sm:p-6">
          <div className="space-y-4">
            {CATEGORY_ORDER.map(({ key, title }) => {
              const { icon: Icon, iconClass, chipClass, bgColor } = CATEGORY_STYLES[key]
              const items = categories[key]

              return (
                <section
                  key={title}
                  className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/20 xl:flex-row xl:items-start xl:gap-6"
                >
                  <div className="flex w-full shrink-0 items-center gap-2 xl:w-56 xl:pt-1">
                    <Icon className={`h-4 w-4 ${iconClass}`} aria-hidden="true" />
                    <h3 className="font-pen text-[17px] font-bold text-slate-900 dark:text-slate-100">
                      {title}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-wrap gap-2 xl:pt-0.5">
                    {items.length ? (
                      items.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-bold tracking-tight ${chipClass}`}
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="font-pen text-[14px] text-slate-400 dark:text-slate-500">
                        Not listed
                      </span>
                    )}
                  </div>
                </section>
              )
            })}

            {teaching.length ? (
              <section className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/20 xl:flex-row xl:items-start xl:gap-6">
                <div className="flex w-full shrink-0 items-center gap-2 xl:w-56 xl:pt-1">
                  <BookMarked className="h-4 w-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  <h3 className="font-pen text-[17px] font-bold text-slate-900 dark:text-slate-100">
                    Relevant Coursework
                  </h3>
                </div>

                <ul className="grid flex-1 gap-x-8 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
                  {teaching.map((course) => (
                    <li
                      key={course}
                      className="font-pen flex items-start gap-2 text-[15px] text-slate-600 dark:text-slate-300"
                    >
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-teal-500 dark:text-teal-400" aria-hidden="true" />
                      <span>{course}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </RoughBox>
      </div>
    </section>
  )
}

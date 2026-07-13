import { Award } from 'lucide-react'
import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

export default function Achievements({ achievements = [] }) {
  if (!achievements.length) return null

  return (
    <section id=  "achievements" aria-labelledby="achievements-title" className="scroll-mt-8">
      <SectionHeading id="achievements-title" label="// accomplishments" title="Achievements" hint="./achievements" />

      <div className="space-y-6">
        <RoughBox filter="sm" tilt="r" color="#b45309" className="p-5">
          <h3 className="font-pen flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            <Award className="h-5 w-5 text-amber-600" aria-hidden="true" />
            Notable Achievements
          </h3>
          <div className="mt-3 space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-200">{achievement.title}</p>
                {achievement.year && (
                  <p className="text-slate-500 dark:text-slate-400"><span className="font-medium">Year:</span> {achievement.year}</p>
                )}
                <p className="text-slate-600 dark:text-slate-300">{achievement.description}</p>
              </div>
            ))}
          </div>
        </RoughBox>
      </div>
    </section>
  )
}

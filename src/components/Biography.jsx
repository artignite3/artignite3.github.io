import SectionHeading from './SectionHeading'
import RoughBox from './RoughBox'

export default function Biography({ text }) {
  return (
    <section id="biography" aria-labelledby="biography-title" className="scroll-mt-8">
      <SectionHeading
        id="biography-title"
        label="//about"
        title="About Me"
        hint="~ readme.md"
      />
      <RoughBox filter="sm" color="#334155" className="p-6 sm:p-8">
        <p className="font-pen text-[17px] leading-8 text-slate-700 dark:text-slate-300">{text}</p>
      </RoughBox>
    </section>
  )
}
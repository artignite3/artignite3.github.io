import { useState, useEffect } from "react";
import profile from "./data/profileData.json";
import RoughFilters from "./components/RoughFilters";
import MainNav from "./components/MainNav";
import IdentityPanel from "./components/IdentityPanel";
import Biography from "./components/Biography";
import Interests from "./components/Interests";

import ExperienceTimeline from "./components/ExperienceTimeline";
// import Publications from './components/Publications'
// import TeachingAndHonors from './components/TeachingAndHonors'
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import CoursesTaken from "./components/CoursesTaken";
import Achievements from "./components/Achievements";
import BackToTop from "./components/BackToTop";

// The whole UI is driven by profileData.json — nothing below is hardcoded
// content. Swap the JSON and the page re-renders for any faculty member.
export default function App() {
  const {
    identity,
    metrics,
    biography,
    researchInterests: interests,
    skills,
    projects,
    achievements,
    coursework,
    contact,
    timeline,
  } = profile;

  // Canonical "all publications" destination for the popup footer.
  const scholarUrl = identity.links?.find((l) => l.icon === "scholar")?.url;

  // Theme state management
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setIsDark(storedTheme === "dark");
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    // Apply theme to document
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div id="top" className="min-h-screen">
      {/* Hand-drawn SVG ink filters, injected once */}
      <RoughFilters />

      {/* Skip link for keyboard / screen-reader users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      {/* Sticky, responsive site navigation + theme toggle */}
      <MainNav
        name={identity.name}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* LEFT — Identity Anchor (sticky on desktop) */}
        <IdentityPanel identity={identity} metrics={metrics} />

        {/* RIGHT — Data Canvas */}
        <main
          id="main"
          className="w-full px-5 py-10 sm:px-8 lg:w-[65%] lg:border-l lg:border-slate-200 lg:px-12 lg:py-16 dark:lg:border-slate-700"
        >
          <div className="space-y-12">
            <Biography text={biography} />
            <Interests interests={interests} />
            <ExperienceTimeline timeline={timeline} />
            <Projects projects={projects} />
            <CoursesTaken teaching={coursework} skills={skills} />
            <Achievements achievements={achievements} />
            <Contact contact={contact} />
            <BackToTop />
          </div>

          {/* Footer / colophon */}
          <footer className="mt-16 border-t-2 border-dashed border-slate-300 pt-6 dark:border-slate-700">
            <p className="font-pen text-sm text-slate-400 dark:text-slate-500">
              {identity.institution} · {identity.department}
            </p>
          </footer>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}

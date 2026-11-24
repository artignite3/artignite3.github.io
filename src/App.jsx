import { useCallback, useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import profile from "./data/profileData.json";
import RoughFilters from "./components/RoughFilters";
import MainNav from "./components/MainNav";
import CommandPalette from "./components/CommandPalette";
import Intro from "./components/Intro";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import GitHubActivity from "./components/GitHubActivity";
import Toolbox from "./components/Toolbox";
import Education from "./components/Education";
import Contact from "./components/Contact";
import BackToTop from "./components/BackToTop";

/* global __BUILD_DATE__, __COMMIT__ */
const builtOn = new Date(__BUILD_DATE__).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// All content comes from profileData.json.
export default function App() {
  const p = profile;
  const [paletteOpen, setPaletteOpen] = useState(false);

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = useCallback(
    () =>
      setIsDark((d) => {
        try {
          localStorage.setItem("theme", d ? "light" : "dark");
        } catch {}
        return !d;
      }),
    [],
  );

  // ⌘K / Ctrl+K opens the command menu, "/" too when not typing.
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div id="top" className="min-h-screen">
      <RoughFilters />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <MainNav
        name={p.identity.name}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        identity={p.identity}
        onToggleTheme={toggleTheme}
      />

      <main id="main" className="mx-auto max-w-5xl space-y-24 px-5 pb-24 sm:px-8">
        <Intro identity={p.identity} research={p.research?.[0]} />
        <About identity={p.identity} biography={p.biography} focus={p.researchHighlights} learning={p.currentlyLearning} />
        <Experience experience={p.experience} positions={p.positions} leadership={p.leadership} />
        <Projects projects={p.projects} />
        <GitHubActivity user={p.identity.githubUser} />
        <Toolbox skills={p.skills} coursework={p.coursework} />
        <Education education={p.education} achievements={p.achievements} />
        <Contact contact={p.contact} links={p.identity.links} />
      </main>

      <footer className="mx-auto max-w-5xl px-5 pb-12 sm:px-8">
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-xs text-fg-3">
          <p>
            {p.identity.name} · {p.identity.institution}
          </p>
          <p>
            Built with React and Vite · updated {builtOn}
            {__COMMIT__ ? ` · ${__COMMIT__}` : ""} ·{" "}
            <a href={p.identity.sourceRepo} target="_blank" rel="noreferrer noopener" className="text-fg-2 hover:text-fg">
              source
            </a>
          </p>
        </div>
      </footer>

      <BackToTop />
      <Analytics />
    </div>
  );
}

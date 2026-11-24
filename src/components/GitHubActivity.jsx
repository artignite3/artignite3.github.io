import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const CACHE_KEY = 'gh-repos-v1'
const TTL = 10 * 60 * 1000

function ago(iso) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const days = Math.round((new Date(iso) - Date.now()) / 86400000)
  if (Math.abs(days) < 7) return rtf.format(days, 'day')
  if (Math.abs(days) < 60) return rtf.format(Math.round(days / 7), 'week')
  return rtf.format(Math.round(days / 30), 'month')
}

// Recently pushed public repos, fetched live from the GitHub API.
export default function GitHubActivity({ user }) {
  const [repos, setRepos] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!user) return
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
      if (cached && Date.now() - cached.at < TTL) {
        setRepos(cached.repos)
        return
      }
    } catch {}

    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=20`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const list = data
          .filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase())
          .slice(0, 6)
          .map(({ name, html_url, description, language, pushed_at, stargazers_count }) => ({
            name,
            html_url,
            description,
            language,
            pushed_at,
            stargazers_count,
          }))
        setRepos(list)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos: list }))
        } catch {}
      })
      .catch(() => setFailed(true))
  }, [user])

  if (!user) return null

  return (
    <section id="github" aria-labelledby="github-title" className="scroll-mt-24">
      <SectionHeading id="github-title" title="Recently on GitHub" note="live from the GitHub API" />

      {failed ? (
        <p className="text-sm text-fg-2">
          Could not load repositories right now. They are all on{' '}
          <a href={`https://github.com/${user}`} className="font-medium text-accent hover:text-fg">
            github.com/{user}
          </a>
        </p>
      ) : (
        <ul className="divide-y divide-line border-y border-line" aria-busy={!repos}>
          {(repos ?? Array.from({ length: 4 }, () => null)).map((r, i) =>
            r ? (
              <li key={r.name}>
                <a
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid gap-1 py-4 transition-colors duration-150 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div className="min-w-0">
                    <p className="inline-flex items-center gap-1 font-mono text-sm text-fg group-hover:text-accent">
                      {r.name}
                      <ArrowUpRight className="h-3.5 w-3.5 text-fg-3 group-hover:text-accent" strokeWidth={1.5} aria-hidden="true" />
                    </p>
                    {r.description ? <p className="mt-0.5 truncate text-sm text-fg-2">{r.description}</p> : null}
                  </div>
                  <p className="font-mono text-xs tabular-nums text-fg-3">
                    {[r.language, r.stargazers_count ? `${r.stargazers_count} ★` : null, `pushed ${ago(r.pushed_at)}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </a>
              </li>
            ) : (
              <li key={i} className="py-4" aria-hidden="true">
                <div className="h-4 w-40 rounded bg-raised" />
                <div className="mt-2 h-4 w-72 max-w-full rounded bg-raised" />
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  )
}

import { useEffect } from 'react'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const PRODUCTS = [
  {
    id: 'zeuschat',
    badge: 'Web App',
    name: 'ZeusChat',
    tagline: 'The geospatial analyst that never sleeps.',
    desc: 'A conversational web interface backed by 400+ live geospatial datasets. Ask a question in plain English — ZeusChat picks the right sources, fetches them in real time, maps the results, and synthesizes a written answer. Then ask a follow-up.',
    features: [
      'Conversational session memory — follow-ups understand prior context',
      'Results appear on an interactive map instantly',
      '400+ integrated data sources: AIS, SAR, ACLED, NDBC, Overture, GDELT, and more',
      'Export any result as GeoJSON, CSV, or Parquet',
      'Share map views and reports with a single link',
      'No GIS software, no query language, no learning curve',
    ],
    href: 'https://agenticearth.app',
    cta: 'Open ZeusChat →',
    accent: true,
  },
  {
    id: 'zeuslm',
    badge: 'Private Intelligence',
    name: 'ZeusLM',
    tagline: 'Your private geo intelligence layer.',
    desc: 'Bring your own data — field surveys, sensor feeds, proprietary datasets — and combine it with Agentic Earth\'s global sources. ZeusLM builds a private knowledge graph over your operational data, enabling analysis no public dataset can replicate.',
    features: [
      'Upload CSV, GeoJSON, Parquet, Shapefile, or TIFF',
      'Query your data alongside 400+ live global sources',
      'Private knowledge graph — your data never trains public models',
      'Spatial joins, clustering, and statistical analysis out of the box',
      'Like NotebookLM — but for your operational geospatial data',
      'API-accessible for integration into existing pipelines',
    ],
    href: 'https://agenticearth.app',
    cta: 'Learn more →',
    accent: false,
  },
  {
    id: 'cli-api',
    badge: 'Developer',
    name: 'AE CLI & API',
    tagline: 'Build anything on top of live geo data.',
    desc: 'Programmatic access to the same intelligence engine that powers ZeusChat. Query 400+ data sources with natural language, get results back as GeoDataFrames or raw files, stream events in real time, and wire it all into your own products and pipelines.',
    features: [
      'pip install agenticearth — one-line install',
      'ae ask and ae chat for terminal-native workflows',
      'Python SDK returns GeoDataFrames (geopandas) or raw dicts',
      'Streaming event API for real-time tool progress',
      'Export GeoJSON, CSV, Parquet from any query',
      'Multi-turn history for programmatic conversation loops',
    ],
    href: '/developers',
    cta: 'Developer docs →',
    accent: false,
    internal: true,
  },
]

export default function ProductsPage() {
  useReveal()

  return (
    <div className="min-h-screen bg-surface text-white pt-16">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 animate-[fadein_0.6s_ease_both]">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Products</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-4 mb-5 tracking-tight leading-tight">
            Three ways to work<br />
            <span className="text-accent">with Agentic Earth</span>
          </h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Whether you're an analyst, researcher, or developer — there's an interface built for how you work.
          </p>
        </div>
      </section>

      {/* ── Product cards ── */}
      <section className="py-6 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {PRODUCTS.map(({ id, badge, name, tagline, desc, features, href, cta, accent, internal }) => (
            <div
              key={id}
              className={`reveal rounded-2xl p-8 md:p-10 ${accent ? 'border-gradient glass' : 'glass border border-white/[0.07]'}`}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block text-xs font-mono text-accent/60 tracking-widest uppercase mb-2">{badge}</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{name}</h2>
                  <p className="text-dim text-base mt-1 italic">{tagline}</p>
                </div>
                {internal ? (
                  <a
                    href={href}
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white font-semibold text-sm hover:border-accent/30 transition-all self-start"
                  >
                    {cta}
                  </a>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all self-start ${
                      accent
                        ? 'bg-accent text-[#080810] hover:bg-white'
                        : 'border border-white/10 text-white hover:border-accent/30'
                    }`}
                  >
                    {cta}
                  </a>
                )}
              </div>

              {/* Description */}
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-3xl">{desc}</p>

              {/* Features */}
              <ul className="grid sm:grid-cols-2 gap-3">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-dim">
                    <span className="text-accent mt-0.5 shrink-0 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-24 px-6 border-t border-white/[0.05] mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-10 text-center">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Compare</span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">Which product is right for you?</h2>
          </div>
          <div className="reveal overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-6 text-dim font-medium w-1/3">Feature</th>
                  <th className="text-center py-3 px-4 text-white font-bold">ZeusChat</th>
                  <th className="text-center py-3 px-4 text-white font-bold">ZeusLM</th>
                  <th className="text-center py-3 px-4 text-white font-bold">CLI & API</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Interface',       'Web app',       'Web app',       'Terminal / code'],
                  ['Live global data','✓',             '✓',             '✓'],
                  ['Your own data',   '—',             '✓',             '✓'],
                  ['Interactive map', '✓',             '✓',             '—'],
                  ['Python SDK',      '—',             '—',             '✓'],
                  ['GeoDataFrames',   '—',             '—',             '✓'],
                  ['Session memory',  '✓',             '✓',             '✓ (manual)'],
                  ['No-code setup',   '✓',             '✓',             '—'],
                ].map(([feat, a, b, c]) => (
                  <tr key={feat} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-6 text-dim">{feat}</td>
                    <td className="py-3 px-4 text-center text-white/80">{a}</td>
                    <td className="py-3 px-4 text-center text-white/80">{b}</td>
                    <td className="py-3 px-4 text-center text-white/80">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="border-gradient rounded-3xl p-12 glass">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Get started</span>
            <h2 className="text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
              Your data is one question away.
            </h2>
            <p className="text-dim text-lg mb-10 max-w-md mx-auto">
              No setup. No GIS software. No learning curve. Sign in and start asking.
            </p>
            <a
              href="https://agenticearth.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-accent text-[#080810] font-bold text-lg hover:bg-white transition-all glow-accent"
            >
              Try Agentic Earth free
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
              </svg>
            </a>
            <p className="text-dim/50 text-xs mt-4 font-mono">Free tier available · No credit card required</p>
          </div>
        </div>
      </section>
    </div>
  )
}

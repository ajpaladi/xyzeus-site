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

function CodeBlock({ code, label }) {
  return (
    <div>
      {label && (
        <div className="text-[10px] font-mono text-accent/60 tracking-widest uppercase mb-2">{label}</div>
      )}
      <pre className="bg-panel border border-white/[0.07] rounded-xl p-5 text-sm font-mono text-white/75 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function DevelopersPage() {
  useReveal()

  return (
    <div className="min-h-screen bg-surface text-white pt-16">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 animate-[fadein_0.6s_ease_both]">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">For developers</span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-4 mb-5 tracking-tight leading-tight">
            Build on geospatial<br />
            <span className="text-accent">intelligence</span>
          </h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed mb-8">
            The Agentic Earth API gives you natural-language access to 400+ live geospatial datasets —
            returned as GeoJSON, CSV, Parquet, or GeoDataFrames.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://docs.agenticearth.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-[#080810] font-bold text-sm hover:bg-white transition-all"
            >
              Read the docs →
            </a>
            <a
              href="https://pypi.org/project/agenticearth/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-accent/30 transition-all"
            >
              View on PyPI ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Install steps ── */}
      <section className="py-14 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto reveal">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { step: '01', label: 'Install', cmd: 'pip install agenticearth' },
              { step: '02', label: 'Authenticate', cmd: 'ae login' },
              { step: '03', label: 'Query', cmd: 'ae ask "vessels near Strait of Hormuz"' },
            ].map(({ step, label, cmd }) => (
              <div key={step} className="glass rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-accent/50">{step}</span>
                  <span className="text-xs text-dim font-semibold uppercase tracking-wider">{label}</span>
                </div>
                <code className="text-sm font-mono text-white/80 break-all">{cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Code examples ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-10">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Examples</span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">Zero to geodata in a few lines</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal">
              <CodeBlock
                label="Python SDK — simple query"
                code={`import agenticearth as ae

result = ae.query(
    "ACLED conflict events in Sudan last 30 days"
)
print(result.answer)

# Save to file
result.save("sudan.geojson")

# GeoDataFrame (requires geopandas)
gdf = result.fetch()
print(gdf.shape)   # (142, 9)
print(gdf.crs)     # EPSG:4326`}
              />
            </div>

            <div className="reveal">
              <CodeBlock
                label="CLI — interactive session"
                code={`ae chat

  > vessels near Strait of Hormuz
  ✓ get_ais_vessels  (312 features)

  There are 312 AIS-tracked vessels...
  The heaviest concentration is in the
  northbound lane — 47 tankers...

  > which are supertankers carrying crude?
  ✓ get_ais_vessels  (18 features)

  > /save hormuz_vlccs.geojson
  ✓ Saved → hormuz_vlccs.geojson`}
              />
            </div>

            <div className="reveal">
              <CodeBlock
                label="Streaming events"
                code={`from agenticearth import AgenticEarth

client = AgenticEarth()

def on_event(event):
    if event.type == "tool_start":
        print(f"▶ Running {event.tool}...")
    elif event.type == "tool_done":
        print(f"✓ {event.tool} — {event.count} features")
    elif event.type == "text_delta":
        print(event.text, end="", flush=True)

result = client.query(
    "vessel traffic near the Strait of Hormuz",
    on_event=on_event,
)`}
              />
            </div>

            <div className="reveal">
              <CodeBlock
                label="Multi-turn with history"
                code={`from agenticearth import AgenticEarth

client = AgenticEarth()
history = []

r1 = client.query(
    "ACLED events in Mali last 90 days",
    history=history,
)
history += [
    {"role": "user",
     "content": "ACLED events in Mali last 90 days"},
    {"role": "assistant", "content": r1.answer},
]

r2 = client.query(
    "now filter to fatalities > 10",
    history=history,
)
r2.save("mali_high_fatality.geojson")`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── QueryResult reference ── */}
      <section className="py-14 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-8">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">SDK</span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">QueryResult</h2>
            <p className="text-dim text-sm mt-2">Every <code className="text-accent/80">query()</code> call returns a QueryResult with these properties and methods.</p>
          </div>
          <div className="reveal">
            <CodeBlock
              code={`result = ae.query("...")

result.answer          # str  — the agent's written response
result.result_keys     # list[str] — keys for fetching geo data

result.fetch()                              # GeoDataFrame (first key)
result.fetch(result_key="get_ais_a1b2")    # specific key
result.fetch(format="parquet")             # Parquet bytes → GeoDataFrame

result.save("output.geojson")   # GeoJSON
result.save("output.csv")       # CSV (properties only)
result.save("output.parquet")   # Parquet`}
            />
          </div>
        </div>
      </section>

      {/* ── Doc links ── */}
      <section className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-10">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Documentation</span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">Everything you need</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '⚡',
                title: 'Quickstart',
                desc: 'Install, authenticate, and run your first geospatial query in under a minute.',
                href: 'https://docs.agenticearth.app/quickstart',
                cta: 'Get started →',
              },
              {
                icon: '⌨️',
                title: 'CLI Reference',
                desc: 'Full reference for ae ask, ae chat, ae export, ae upload, and all commands.',
                href: 'https://docs.agenticearth.app/cli',
                cta: 'CLI docs →',
              },
              {
                icon: '🐍',
                title: 'Python SDK',
                desc: 'AgenticEarth class, QueryResult, streaming events, error handling, and GeoDataFrame output.',
                href: 'https://docs.agenticearth.app/sdk/',
                cta: 'SDK docs →',
              },
            ].map(({ icon, title, desc, href, cta }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal glass rounded-xl p-6 group block hover:border-accent/20 transition-all"
              >
                <span className="text-2xl mb-3 block">{icon}</span>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">{title}</h3>
                <p className="text-dim text-sm leading-relaxed mb-4">{desc}</p>
                <span className="text-xs font-mono text-accent">{cta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Error handling ── */}
      <section className="py-14 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-8">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Error handling</span>
            <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">Production-ready</h2>
          </div>
          <div className="reveal">
            <CodeBlock
              code={`from agenticearth import (
    AgenticEarth,
    AuthError,
    InsufficientCreditsError,
    AgenticEarthError,
)

client = AgenticEarth()

try:
    result = client.query("global shipping lanes")
    result.save("lanes.geojson")
except AuthError:
    print("Invalid API key — run \`ae login\`")
except InsufficientCreditsError:
    print("Out of credits — upgrade at agenticearth.app")
except AgenticEarthError as e:
    print(f"SDK error: {e}")`}
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="border-gradient rounded-3xl p-12 glass">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Get your key</span>
            <h2 className="text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
              Ready to start building?
            </h2>
            <p className="text-dim text-lg mb-10 max-w-md mx-auto">
              API and CLI access requires a Pro plan. Sign in and generate your key in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://agenticearth.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-[#080810] font-bold text-base hover:bg-white transition-all glow-accent"
              >
                Get API key
              </a>
              <a
                href="https://docs.agenticearth.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-base hover:border-accent/30 transition-all"
              >
                Read the docs ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

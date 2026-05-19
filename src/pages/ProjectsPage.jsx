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

const DATA_FAMILIES = [
  {
    name: 'Vector & Feature Data',
    icon: '🗺️',
    desc: 'Live and static vector datasets — boundaries, points, lines, and polygons — from authoritative global sources.',
    examples: ['AIS vessel positions', 'ACLED conflict events', 'Overture buildings & places', 'FEMA flood zones', 'OpenStreetMap features', 'GDELT news events', 'ADS-B live aircraft', 'USGS earthquake feeds'],
  },
  {
    name: 'Raster & Imagery',
    icon: '🛰️',
    desc: 'Satellite and aerial imagery with multi-spectral, SAR, thermal, and change-detection capabilities.',
    examples: ['Sentinel-1 SAR (10m)', 'Sentinel-2 multispectral', 'Wyvern hyperspectral', 'Maxar open data', 'NASA GIBS layers', 'MODIS thermal', 'GFS weather grids', 'OpenTopography DEMs'],
  },
  {
    name: 'Point Cloud & Elevation',
    icon: '📡',
    desc: 'High-resolution 3D terrain data from lidar and photogrammetry sources across global coverage areas.',
    examples: ['NOAA coastal lidar', 'USGS 3DEP lidar', 'OpenTopography collections', 'TNM elevation tiles', 'State lidar clearinghouses', 'Planetary Computer lidar', 'Airborne survey datasets'],
  },
  {
    name: 'Tabular & Text Intelligence',
    icon: '📊',
    desc: 'Structured socioeconomic, demographic, and news data enriched with geospatial context.',
    examples: ['US Census ACS', 'LODES jobs/workers', 'Eurostat NUTS regions', 'World Bank indicators', 'EIA energy reports', 'GDELT global news graph', 'Wikipedia geo articles', 'Windy webcam feeds'],
  },
]

const ANALYTICAL_CAPABILITIES = [
  { label: 'Spatial SQL', desc: 'ST_Within, ST_Intersects, ST_Distance — full PostGIS-style geometry operations' },
  { label: 'Spatial autocorrelation', desc: "Moran's I, LISA clusters — identify spatial dependence and hot spots" },
  { label: 'NDVI & vegetation index', desc: 'Normalized Difference Vegetation Index from multispectral raster data' },
  { label: 'Multispectral analysis', desc: 'Band arithmetic, false color composites, change detection across time series' },
  { label: 'Clustering & segmentation', desc: 'K-means, DBSCAN, and isochrone-based spatial grouping' },
  { label: 'Isochrone & network analysis', desc: 'Travel-time polygons, routing, and catchment area computation' },
  { label: 'Flood vulnerability scoring', desc: 'Multi-source index combining elevation, flood zones, census, and infrastructure' },
  { label: 'Cross-source correlation', desc: 'Join and correlate any two datasets by geometry, time window, or attribute' },
]

const CASE_STUDIES = [
  {
    title: 'New Orleans Flood Vulnerability Index',
    category: 'Risk & Resilience',
    summary: 'Combined FEMA flood zones, USGS elevation data, US Census demographics, and ACOE levee and dam inventories into a composite vulnerability index for every census tract in the New Orleans metro area.',
    sources: ['FEMA National Flood Hazard Layer', 'USGS 3DEP elevation', 'US Census ACS', 'USACE levee & dam databases'],
    outcome: 'Produced a tract-level vulnerability score identifying highest-risk communities — integrating five live sources in a single natural-language query.',
    img: '/images/flood.png',
  },
  {
    title: 'Three Mile Island Energy Infrastructure',
    category: 'Energy & Infrastructure',
    summary: 'Mapped the full energy infrastructure footprint around Three Mile Island — power plants, transmission lines, substations, and grid operations data — alongside land use and population density.',
    sources: ['EIA power plants', 'EIA grid operations', 'PUDL energy data', 'OpenStreetMap infrastructure', 'US Census population'],
    outcome: 'Delivered a complete infrastructure dossier — plant locations, generation capacity, grid topology, and surrounding demographics — from a single conversational session.',
    img: '/images/power.png',
  },
]

const METRICS = [
  { value: '400+', label: 'Data endpoints' },
  { value: '370',  label: 'Knowledge graph nodes' },
  { value: '8,000+', label: 'Graph edges' },
  { value: '85+',  label: 'Active users' },
  { value: '4,600+', label: 'Query events' },
]

const ROADMAP = [
  {
    phase: 'Now',
    status: 'live',
    items: [
      'ZeusChat — conversational geospatial intelligence',
      'AE CLI & Python SDK (pip install agenticearth)',
      '400+ vector, raster, point cloud, and tabular sources',
      'Knowledge graph routing (370 nodes, 8,000+ edges)',
      'GeoDataFrame output, streaming events, session memory',
    ],
  },
  {
    phase: 'Next',
    status: 'soon',
    items: [
      'ZeusLM — private knowledge graph over your own data',
      'Proprietary data partnerships (commercial satellite, signals intelligence)',
      'Real-time alert subscriptions on any geospatial condition',
      'Team workspaces and shared analysis sessions',
    ],
  },
  {
    phase: 'Ahead',
    status: 'future',
    items: [
      'ZeusLM general availability',
      'API ecosystem — third-party integrations and webhooks',
      'Vertical deployments (insurance, logistics, defense)',
      'Self-building graph from query behavioral data',
    ],
  },
]

export default function ProjectsPage() {
  useReveal()

  return (
    <div className="min-h-screen bg-surface text-white pt-16">

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-mid opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 animate-[fadein_0.6s_ease_both]">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">About Agentic Earth</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-6 tracking-tight leading-[1.05]">
            The world's data.<br />
            <span className="text-accent">One question away.</span>
          </h1>
          <p className="text-white/70 text-xl max-w-3xl leading-relaxed mb-6">
            Agentic Earth is an AI-native geospatial intelligence platform. We've connected 400+ live
            data sources — satellites, vessels, conflict trackers, weather stations, census data, and more —
            to a natural-language interface that anyone can use.
          </p>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            No GIS software. No query languages. No data engineering. Ask a question, get a map and an answer.
          </p>
        </div>
      </section>

      {/* ── Platform metrics ── */}
      <section className="py-10 px-6 border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {METRICS.map(({ value, label }) => (
              <div key={label} className="reveal text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent font-mono">{value}</div>
                <div className="text-xs text-dim mt-1 tracking-wide leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we offer ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">What we offer</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 mb-4 tracking-tight">400+ endpoints across four data families</h2>
            <p className="text-dim text-lg max-w-2xl">
              From live satellite imagery to real-time vessel positions — every source is queryable in plain English
              and returns structured, exportable geodata.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {DATA_FAMILIES.map(({ name, icon, desc, examples }) => (
              <div key={name} className="reveal glass rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-lg font-bold text-white">{name}</h3>
                </div>
                <p className="text-dim text-sm leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map(ex => (
                    <span
                      key={ex}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-dim"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Analytical intelligence ── */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Analytical intelligence</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 mb-4 tracking-tight">
              Not just data retrieval — full spatial analysis
            </h2>
            <p className="text-dim text-lg max-w-2xl">
              The agent doesn't just fetch data — it analyzes it. Spatial joins, statistical clustering,
              index construction, change detection, and more, all triggered by natural language.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ANALYTICAL_CAPABILITIES.map(({ label, desc }) => (
              <div key={label} className="reveal glass rounded-xl p-5">
                <h4 className="text-sm font-bold text-white mb-2">{label}</h4>
                <p className="text-dim text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Knowledge graph ── */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="text-xs font-mono text-accent tracking-widest uppercase">Knowledge graph</span>
              <h2 className="text-4xl font-extrabold text-white mt-3 mb-5 tracking-tight">
                Self-compounding routing intelligence
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-5">
                Beneath the natural-language interface is a structured knowledge graph connecting
                every data source, analytical method, geography, and domain concept. With 370 nodes
                and 8,000+ edges, it gives the agent a map of the data landscape before it starts querying.
              </p>
              <p className="text-dim text-base leading-relaxed mb-8">
                Every query teaches the graph: which sources co-occur, which analyses follow which
                data pulls, which geographies cluster together. Over time the routing gets faster, more
                precise, and more contextually aware — compounding value with each session.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '370', label: 'Nodes' },
                  { value: '8,000+', label: 'Edges' },
                  { value: '400+', label: 'Source nodes' },
                ].map(({ value, label }) => (
                  <div key={label} className="glass rounded-xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-accent font-mono">{value}</div>
                    <div className="text-xs text-dim mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div className="border-gradient rounded-2xl p-8 glass">
                <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-6">Graph-informed routing</h3>
                <div className="space-y-4 text-sm">
                  {[
                    { q: 'flood vulnerability in New Orleans', sources: ['FEMA NFHL', 'USGS elevation', 'US Census', 'USACE levees'] },
                    { q: 'energy infrastructure around Three Mile Island', sources: ['EIA plants', 'EIA grid ops', 'PUDL', 'OSM'] },
                    { q: 'vessel traffic near Strait of Hormuz', sources: ['AIS Stream', 'Overture ports', 'GDELT news'] },
                  ].map(({ q, sources }) => (
                    <div key={q} className="border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                      <div className="font-mono text-white/60 text-xs mb-2">› {q}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {sources.map(s => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-accent/20 text-accent/80 font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Case studies</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 tracking-tight">Real analyses, live data</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {CASE_STUDIES.map(({ title, category, summary, sources, outcome, img }) => (
              <div key={title} className="reveal glass rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover object-left-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-mono text-accent/80 uppercase tracking-widest">{category}</span>
                </div>
                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
                  <p className="text-dim text-sm leading-relaxed mb-5">{summary}</p>
                  <div className="mb-5">
                    <div className="text-[10px] font-mono text-accent/60 uppercase tracking-wider mb-2">Sources used</div>
                    <div className="flex flex-wrap gap-1.5">
                      {sources.map(s => (
                        <span key={s} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.07] text-dim">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <div className="text-[10px] font-mono text-accent/60 uppercase tracking-wider mb-1">Outcome</div>
                    <p className="text-white/70 text-sm leading-relaxed">{outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-12">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Roadmap</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 tracking-tight">Where we're going</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ROADMAP.map(({ phase, status, items }) => {
              const statusStyle = {
                live:   'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
                soon:   'text-accent border-accent/30 bg-accent/10',
                future: 'text-dim border-white/20 bg-white/5',
              }[status]
              return (
                <div key={phase} className="reveal glass rounded-2xl p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-xs font-mono px-3 py-1 rounded-full border ${statusStyle}`}>{phase}</span>
                    {status === 'live' && (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400/70 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm text-dim leading-snug">
                        <span className={`mt-0.5 shrink-0 font-bold text-xs ${status === 'live' ? 'text-emerald-400' : status === 'soon' ? 'text-accent' : 'text-dim/50'}`}>
                          {status === 'live' ? '✓' : '○'}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Closing / contact ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="border-gradient rounded-3xl p-12 glass">
            <span className="text-xs font-mono text-accent tracking-widest uppercase">Get in touch</span>
            <h2 className="text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight leading-tight">
              Building something with<br />geospatial data?
            </h2>
            <p className="text-dim text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Whether you're a researcher, analyst, or developer — we want to hear what you're working on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://agenticearth.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-[#080810] font-bold text-base hover:bg-white transition-all glow-accent"
              >
                Try for free
              </a>
              <a
                href="mailto:andyjpaladino@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-base hover:border-accent/30 transition-all"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

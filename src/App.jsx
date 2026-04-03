import { useEffect, useRef, useState } from 'react'

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ── Typing animation for hero prompt ─────────────────────────────────────────
const PROMPTS = [
  'Show AIS vessels near the Strait of Hormuz',
  'FEMA flood zones in Manhattan',
  'Infrastructure around Area 51',
  'Live aircraft over Arizona right now',
  'Hiking trails in the Sawatch Range',
  'Submarine cables crossing the North Atlantic',
  'Power plants in New Mexico',
  'Show me Milan\'s full building inventory',
  'Pittsburgh International Airport full asset report',
  'Latest tornado outbreak — news and event tracking',
  'Generate a full intelligence dossier on Kharg Island',
]

function useTypingPrompt() {
  const [text, setText] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pause | deleting

  useEffect(() => {
    const target = PROMPTS[promptIdx]
    let timeout

    if (phase === 'typing') {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 38)
      } else {
        timeout = setTimeout(() => setPhase('pause'), 2200)
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 400)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(t => t.slice(0, -1)), 18)
      } else {
        setPromptIdx(i => (i + 1) % PROMPTS.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, promptIdx])

  return text
}

// ── Data sources for marquee ───────────────────────────────────────────────────
const SOURCES_ROW1 = [
  'Overture Maps', 'OpenStreetMap', 'AIS Stream', 'ADS-B Live', 'FEMA Flood Zones',
  'US Census ACS', 'NASA GIBS', 'EIA Power Plants', 'ACLED Conflict', 'Maxar Open Data',
  'Wyvern Hyperspectral', 'Eurostat NUTS', 'OpenTopography', 'USGS Earthquakes',
  'GDELT News Intelligence', 'PUDL Power Plants', 'ICMM Global Mining',
  'WDPA Protected Areas', 'RADD Forest Alerts', 'Movebank Animal Tracking', 'Kontur Population',
]
const SOURCES_ROW2 = [
  'Submarine Cables', 'Foursquare Places', 'GeoConfirmed', 'EPA Facilities',
  'ESRI Wayback', 'Sentinel-2 SAR', 'EIA Grid Ops', 'ICMM Mining', 'Strava Segments',
  'USFWS Wetlands', 'NREL Alt Fuel', 'OpenAerialMap', 'Windy Webcams', 'Wikipedia Geo',
  'US Elections', 'LODES Jobs', 'TNM Elevation', 'GFS Weather',
  'GFW Key Biodiversity Areas', 'Tree Cover Loss', 'NDBC Wave Buoys', 'Endemic Bird Areas',
]

// ── Use cases data ─────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    img:    '/images/area51.png',
    prompt: 'Area 51 infrastructure asset summary',
    label:  'OSINT & Intelligence',
  },
  {
    img:    '/images/flood.png',
    prompt: 'FEMA flood zones in Manhattan',
    label:  'Risk & Resilience',
  },
  {
    img:    '/images/aircraft.png',
    prompt: 'Show live aircraft over Arizona',
    label:  'Live Situational Awareness',
  },
  {
    img:    '/images/milan.png',
    prompt: 'Hotels, museums, and buildings in Milan',
    label:  'Urban Intelligence',
  },
  {
    img:    '/images/subway.png',
    prompt: 'Need Manhattan subway lines now',
    label:  'Transit & Infrastructure',
  },
  {
    img:    '/images/maui.png',
    prompt: 'Flood monitoring near Wailuku River',
    label:  'Emergency Response',
  },
  {
    img:    '/images/hero.png',
    prompt: 'I need hiking trails',
    label:  'Terrain & Recreation',
  },
  {
    img:    '/images/pittsburgh.png',
    prompt: 'Pittsburgh International Airport — full asset report',
    label:  'Airport Infrastructure',
  },
  {
    img:    '/images/tornado.png',
    prompt: 'Latest tornado outbreak — news and event tracking',
    label:  'Weather & News',
  },
  {
    img:    '/images/power.png',
    prompt: 'Power infrastructure in New Mexico',
    label:  'Energy Infrastructure',
  },
  {
    img:    '/images/newark.png',
    prompt: 'Newark Liberty International Airport — full asset inventory',
    label:  'Airport OSINT',
  },
  {
    img:    '/images/tehran-sar.png',
    prompt: 'Most recent Sentinel-1 SAR imagery over Tehran',
    label:  'SAR Intelligence',
  },
  {
    img:    '/images/thermal.png',
    prompt: 'Show historical thermal imagery for this area',
    label:  'Thermal & Change Detection',
  },
  {
    img:    '/images/multilayer.png',
    prompt: 'Sentinel-2 imagery, power plants, and census boundaries',
    label:  'Multi-layer Analysis',
  },
]

// ── Capabilities ──────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
    title: 'Ask in plain English',
    body:  'No query languages, no GIS software. Describe what you need and the AI handles the rest — fetching, clipping, and joining data automatically.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
    title: 'Live data, instantly mapped',
    body:  '85+ integrated sources — satellite imagery, live vessels, aircraft, census data, conflict events, flood zones, and more. Results appear on the map in seconds.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: 'Export & share anything',
    body:  'Download any result as GeoJSON, CSV, or GeoTIFF. Share a map view with a single link. Build reports directly from the chat.',
  },
]

// ── Stat pills ────────────────────────────────────────────────────────────────
const STATS = [
  { value: '85+',    label: 'live data sources' },
  { value: '500M+',  label: 'features on demand' },
  { value: '1 line', label: 'to get started' },
]

// ── Marquee row ───────────────────────────────────────────────────────────────
function MarqueeRow({ items, reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-track overflow-hidden">
      <div
        className={`flex gap-3 whitespace-nowrap ${reverse ? 'animate-[marquee2_38s_linear_infinite]' : 'animate-[marquee_38s_linear_infinite]'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-light text-xs font-medium text-dim border border-white/5 shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Screenshot card ───────────────────────────────────────────────────────────
function ScreenshotCard({ img, prompt, label, className = '' }) {
  return (
    <div className={`relative rounded-2xl overflow-hidden screenshot-glow group ${className}`}>
      <img
        src={img}
        alt={prompt}
        className="w-full h-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.02]"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="inline-block text-[10px] font-mono font-bold tracking-widest text-accent/80 uppercase mb-1.5">
          {label}
        </span>
        <div className="flex items-start gap-2">
          <span className="text-accent mt-0.5 shrink-0 text-xs font-mono">›</span>
          <p className="text-white/90 text-sm font-medium leading-snug">{prompt}</p>
        </div>
      </div>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: '#how-it-works',  label: 'How it works' },
  { href: '#intelligence',  label: 'Intelligence' },
  { href: '#dossier',       label: 'Dossier' },
  { href: '#use-cases',     label: 'Use cases' },
  { href: '#sources',       label: 'Data sources' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1))

    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Find the last section whose top is above the middle of the viewport
      const mid = window.scrollY + window.innerHeight * 0.4
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= mid) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <img src="/images/logo.png" alt="xyzeus" className="w-8 h-8 rounded-lg" />
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-accent transition-colors">
            xyzeus
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.slice(1)
            const active = activeSection === id
            return (
              <a
                key={href}
                href={href}
                className={`transition-colors ${active ? 'text-accent font-medium' : 'text-dim hover:text-white'}`}
              >
                {label}
              </a>
            )
          })}
        </nav>

        {/* CTA */}
        <a
          href="https://xyzeus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-accent text-[#080810] text-sm font-semibold hover:bg-white transition-colors"
        >
          Open app →
        </a>
      </div>
    </header>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const prompt = useTypingPrompt()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/globe.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Left fade for headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080810] via-[#080810]/70 to-[#080810]/20" />
        {/* Strong top mask to bury the app UI chrome in the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080810] via-[#080810]/10 to-[#080810]" style={{ background: 'linear-gradient(to bottom, #080810 0%, #080810 8%, transparent 28%, #080810 100%)' }} />
        <div className="absolute inset-0 bg-radial-accent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-accent/20 text-xs font-mono text-accent mb-8 animate-[fadein_0.6s_ease_both]">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          Geospatial AI — 85+ live data sources
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-6 animate-[fadein_0.7s_0.1s_ease_both]">
          Ask a question.
          <br />
          <span className="text-accent text-glow">See the world answer.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-dim max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadein_0.7s_0.2s_ease_both]">
          xyzeus connects natural-language questions to 85+ live geospatial data sources — vessels, satellites, buildings, borders, weather, conflict, and more — mapped in seconds.
        </p>

        {/* Prompt mockup */}
        <div className="max-w-xl mx-auto mb-10 animate-[fadein_0.7s_0.3s_ease_both]">
          <div className="glass border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3 glow-accent">
            <span className="text-accent shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <span className="text-white/80 text-sm font-mono flex-1 text-left min-h-[1.25rem]">
              {prompt}
              <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse align-middle" />
            </span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadein_0.7s_0.4s_ease_both]">
          <a
            href="https://xyzeus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-accent text-[#080810] font-bold text-base hover:bg-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start for free
          </a>
          <a
            href="#use-cases"
            className="px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-medium text-base hover:border-accent/30 transition-all"
          >
            See examples ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-dim">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  )
}

// ── Stats strip ───────────────────────────────────────────────────────────────
function StatsStrip() {
  return (
    <section className="relative border-y border-white/5 py-8 overflow-hidden">
      <div className="absolute inset-0 bg-radial-mid" />
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 relative z-10">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center reveal">
            <div className="text-3xl font-extrabold text-accent font-mono">{value}</div>
            <div className="text-xs text-dim mt-1 tracking-wide">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── How it works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">How it works</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            No GIS degree required
          </h2>
          <p className="text-dim mt-4 text-lg max-w-xl mx-auto">
            The full power of geospatial data — through a conversation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {CAPABILITIES.map(({ icon, title, body }, i) => (
            <div
              key={title}
              className="glass rounded-2xl p-7 border border-white/5 hover:border-accent/20 transition-colors group reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent mb-5 group-hover:bg-accent/15 transition-colors">
                {icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-dim text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Dossier / Reports section ─────────────────────────────────────────────────
const DOSSIER_FEATURES = [
  {
    icon: '⊞',
    title: '11 datasets, one prompt',
    body: 'xyzeus pulls from every relevant source simultaneously — SAR imagery, building footprints, GeoConfirmed OSINT, power infrastructure, military airports, Wikipedia — and integrates them into a single coherent picture.',
  },
  {
    icon: '◈',
    title: 'Cross-referenced intelligence',
    body: 'Every finding is corroborated across datasets. Strike coordinates confirmed by GeoConfirmed, Wikipedia, and SAR simultaneously. Data confidence ratings included throughout.',
  },
  {
    icon: '↓',
    title: 'Publication-ready PDF export',
    body: 'Shareable reports with embedded maps, stat cards, dataset citations, and executive summaries. Ready for briefings, submissions, or archival.',
  },
]

function DossierSection() {
  return (
    <section id="dossier" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Reports & Dossiers</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            From conversation
            <br />
            <span className="text-accent text-glow">to intelligence dossier.</span>
          </h2>
          <p className="text-dim mt-4 text-lg max-w-2xl mx-auto">
            Ask a question. xyzeus fetches the data, runs the analysis, and generates a publication-ready report — complete with maps, datasets, and cross-referenced findings.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start reveal">

          {/* Document mockup — styled to match the actual report aesthetic */}
          <div className="relative">
            {/* Stacked paper effect */}
            <div className="absolute -bottom-2 -right-2 w-full h-full rounded-2xl bg-[#e8e0d0] opacity-40" />
            <div className="absolute -bottom-1 -right-1 w-full h-full rounded-2xl bg-[#ede6d8] opacity-60" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#f5f0e8' }}>
              {/* Report header */}
              <div className="px-8 pt-8 pb-6 border-b border-black/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black/40 uppercase">Dossier</span>
                  <span className="text-black/20">·</span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black/40 uppercase">xyzeus</span>
                </div>
                <h3 className="text-xl font-bold text-black/85 leading-snug mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Kharg Island Situational Report —<br />
                  Geospatial Intelligence Dossier:<br />
                  Infrastructure Inventory, Military Strike Assessment, and Strategic Asset Analysis
                </h3>
                <div className="flex items-center gap-4 text-xs text-black/50">
                  <span className="flex items-center gap-1.5">
                    <span>📅</span> March 25, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>📊</span> 11 datasets
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {['Land Use', 'Building Footprints', 'SAR Imagery', 'GeoConfirmed OSINT', 'Military Airports', 'Global Power', 'Wikipedia Geo'].map(tag => (
                    <span key={tag} className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-black/15 text-black/45">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Executive summary excerpt */}
              <div className="px-8 py-5 border-b border-black/8">
                <h4 className="text-sm font-bold text-black/70 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Executive Summary</h4>
                <p className="text-xs text-black/55 leading-relaxed">
                  This dossier integrates 11 discrete geospatial datasets — spanning land use polygons, building footprints, road networks, SAR imagery, military airport data, Wikipedia geolocated articles, and GeoConfirmed OSINT events — to produce a comprehensive situational picture of Kharg Island, Iran's single most critical petroleum export node in the northern Persian Gulf...
                </p>
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-3 divide-x divide-black/8">
                {[
                  { value: '34', label: 'pages' },
                  { value: '11', label: 'datasets' },
                  { value: '95+', label: 'structures mapped' },
                ].map(({ value, label }) => (
                  <div key={label} className="px-5 py-4 text-center">
                    <div className="text-2xl font-bold text-black/75" style={{ fontFamily: 'Georgia, serif' }}>{value}</div>
                    <div className="text-[10px] text-black/40 uppercase tracking-wide mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="px-8 py-5 flex items-center justify-between bg-black/[0.03]">
                <span className="text-xs text-black/40 font-mono">xyzeus.app/report/380ac2be3a44</span>
                <a
                  href="https://xyzeus.app/report/380ac2be3a44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-black/60 hover:text-black/85 transition-colors flex items-center gap-1"
                >
                  View live report ↗
                </a>
              </div>
            </div>

            {/* PDF download */}
            <div className="mt-3 text-center">
              <a
                href="/kharg_island_intel.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-dim/60 hover:text-accent transition-colors font-mono"
              >
                <span>↓</span> Download PDF example
              </a>
            </div>
          </div>

          {/* Feature points */}
          <div className="space-y-6">
            {DOSSIER_FEATURES.map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent shrink-0 text-lg group-hover:bg-accent/15 transition-colors">
                  {icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-dim text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}

            {/* What's inside callout */}
            <div className="glass rounded-2xl p-5 border border-white/5 mt-4">
              <p className="text-xs font-mono text-accent/80 uppercase tracking-widest mb-3">Inside the Kharg Island dossier</p>
              <ul className="space-y-2">
                {[
                  'Full-island satellite composite with 11 data layers rendered',
                  'Confirmed U.S. airstrike coordinates from GeoConfirmed OSINT',
                  'Military bunker cluster mapping (41 features, 29.26°N)',
                  'SAR change detection — pre and post strike',
                  'Oil tank farm inventory (deliberately spared per Wikipedia account)',
                  'MERSAD SAM site confirmed at 29.252°N, 50.306°E',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-dim">
                    <span className="text-accent/60 mt-0.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Intelligence / Analysis section ──────────────────────────────────────────
const ANALYSIS_POINTS = [
  {
    icon: '◈',
    title: 'Multi-source correlation',
    body:  'xyzeus pulls from multiple datasets simultaneously and cross-references them — finding patterns no single source could reveal.',
  },
  {
    icon: '⚡',
    title: 'Live situation briefs',
    body:  'Ask about an active event and get a synthesized intelligence report: gauge readings, flood watch status, affected areas, and what to watch next.',
  },
  {
    icon: '↺',
    title: 'Follow-up reasoning',
    body:  'The AI remembers what it found and suggests the next logical question — turning a single query into a full investigative workflow.',
  },
  {
    icon: '⊕',
    title: 'Anomaly detection',
    body:  'Spot the unusual: infrastructure where there should be none, vessel behavior inconsistent with declared routes, activity at sensitive sites.',
  },
]

function Intelligence() {
  return (
    <section id="intelligence" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-mid pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Intelligence</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Not just a map.{' '}
            <span className="text-accent text-glow">An analyst.</span>
          </h2>
          <p className="text-dim mt-4 text-lg max-w-2xl mx-auto">
            xyzeus doesn't stop at fetching data. It reads it, cross-references it, and tells you what it means — in plain language.
          </p>
        </div>

        {/* Split layout: screenshot left, analysis points right */}
        <div className="grid lg:grid-cols-2 gap-10 items-center reveal">

          {/* Screenshot — Maui flood analysis */}
          <div className="relative rounded-2xl overflow-hidden screenshot-glow">
            <img
              src="/images/maui.png"
              alt="xyzeus flood intelligence brief"
              className="w-full object-cover"
              loading="lazy"
            />
            {/* Overlay quote from the actual analysis */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="glass rounded-xl p-4 border border-accent/20">
                <p className="text-xs font-mono text-accent mb-2 tracking-widest uppercase">Live analysis output</p>
                <p className="text-white/90 text-sm leading-relaxed italic">
                  "Wailuku River / Iao Valley is the most critical watch point — near 10 ft stage on both NWS and USGS sensors simultaneously. This is the same drainage corridor that has historically caused devastating flooding in Central Maui."
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-mono text-red-400 font-bold tracking-wide">ACTIVE NWS FLOOD WATCH CONFIRMED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis feature points */}
          <div className="space-y-5">
            {ANALYSIS_POINTS.map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 items-start group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center text-accent shrink-0 text-lg group-hover:bg-accent/15 transition-colors">
                  {icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-dim text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}

            {/* Multi-layer example */}
            <div className="mt-6 glass rounded-2xl overflow-hidden border border-white/5">
              <img
                src="/images/multilayer.png"
                alt="Multi-layer geospatial analysis"
                className="w-full h-44 object-cover object-top"
                loading="lazy"
              />
              <div className="px-4 py-3 border-t border-white/5">
                <p className="text-xs font-mono text-accent/80 uppercase tracking-widest mb-1">Example</p>
                <p className="text-white/80 text-sm font-medium">Sentinel-2 · Power plants · Census boundaries — one prompt</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Use cases / screenshot showcase ──────────────────────────────────────────
function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Use cases</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
            One prompt. Any dataset.
          </h2>
          <p className="text-dim mt-4 text-lg max-w-xl mx-auto">
            From classified-facility OSINT to real-time flood monitoring — if the data exists, xyzeus can find it.
          </p>
        </div>

        {/* Bento grid — Row 1: large + two stacked */}
        <div className="space-y-4 reveal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Area 51 — 2 cols wide, tall */}
            <div className="md:col-span-2">
              <ScreenshotCard
                img={USE_CASES[0].img}
                prompt={USE_CASES[0].prompt}
                label={USE_CASES[0].label}
                className="h-80 md:h-96"
              />
            </div>
            {/* Flood + Aircraft stacked */}
            <div className="flex flex-col gap-4">
              <ScreenshotCard
                img={USE_CASES[1].img}
                prompt={USE_CASES[1].prompt}
                label={USE_CASES[1].label}
                className="flex-1 min-h-[11rem]"
              />
              <ScreenshotCard
                img={USE_CASES[2].img}
                prompt={USE_CASES[2].prompt}
                label={USE_CASES[2].label}
                className="flex-1 min-h-[11rem]"
              />
            </div>
          </div>

          {/* Row 2: four equal cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {USE_CASES.slice(3, 7).map(uc => (
              <ScreenshotCard
                key={uc.img}
                img={uc.img}
                prompt={uc.prompt}
                label={uc.label}
                className="h-52"
              />
            ))}
          </div>

          {/* Row 3: four equal cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {USE_CASES.slice(7, 11).map(uc => (
              <ScreenshotCard
                key={uc.img}
                img={uc.img}
                prompt={uc.prompt}
                label={uc.label}
                className="h-52"
              />
            ))}
          </div>

          {/* Row 4: three equal cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {USE_CASES.slice(11, 14).map(uc => (
              <ScreenshotCard
                key={uc.img}
                img={uc.img}
                prompt={uc.prompt}
                label={uc.label}
                className="h-60"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Data sources ──────────────────────────────────────────────────────────────
function DataSources() {
  return (
    <section id="sources" className="py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-14 reveal">
        <span className="text-xs font-mono text-accent tracking-widest uppercase">Data sources</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3 tracking-tight">
          Every source. One interface.
        </h2>
        <p className="text-dim mt-4 text-lg max-w-2xl mx-auto">
          xyzeus is pre-wired to 85+ live and archival geospatial datasets — no API keys, no data wrangling. Just ask.
        </p>
      </div>

      <div className="space-y-4 reveal">
        <MarqueeRow items={SOURCES_ROW1} />
        <MarqueeRow items={SOURCES_ROW2} reverse />
      </div>

      {/* Category pills */}
      <div className="max-w-4xl mx-auto px-6 mt-16 reveal">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Maritime & Vessels', icon: '⚓' },
            { label: 'Satellite & Imagery', icon: '🛰' },
            { label: 'Demographics', icon: '📊' },
            { label: 'Conflict & Security', icon: '🎯' },
            { label: 'Energy Infrastructure', icon: '⚡' },
            { label: 'Climate & Environment', icon: '🌍' },
            { label: 'Reference & Intelligence', icon: '🗞' },
            { label: 'Mining & Extraction', icon: '⛏' },
          ].map(({ label, icon }) => (
            <div key={label} className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/5 hover:border-accent/15 transition-colors">
              <span className="text-xl">{icon}</span>
              <span className="text-sm text-white/80 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ─────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-accent opacity-60 pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative z-10 reveal">
        <div className="border-gradient rounded-3xl p-12 glass">
          <span className="text-xs font-mono text-accent tracking-widest uppercase">Get started</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight leading-tight">
            Your data is one
            <br />
            question away.
          </h2>
          <p className="text-dim text-lg mb-10 max-w-lg mx-auto">
            No setup. No GIS software. No learning curve. Sign in and start asking.
          </p>
          <a
            href="https://xyzeus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-accent text-[#080810] font-bold text-lg hover:bg-white transition-all hover:scale-[1.02] active:scale-[0.98] glow-accent"
          >
            Try xyzeus free
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </a>
          <p className="text-dim/60 text-xs mt-4 font-mono">Free tier available · No credit card required</p>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="xyzeus" className="w-6 h-6 rounded-md opacity-80" />
          <span className="text-sm font-semibold text-white/60">xyzeus</span>
        </div>
        <p className="text-xs text-dim/50 font-mono">© 2026 xyzeus. All rights reserved.</p>
        <a
          href="https://xyzeus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent/70 hover:text-accent transition-colors font-mono"
        >
          xyzeus.app →
        </a>
      </div>
    </footer>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  useReveal()

  return (
    <div className="min-h-screen bg-surface text-white">
      <Nav />
      <Hero />
      <StatsStrip />
      <HowItWorks />
      <Intelligence />
      <DossierSection />
      <UseCases />
      <DataSources />
      <CTA />
      <Footer />
    </div>
  )
}

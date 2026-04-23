// StatBar.jsx — Availability strip + About + Writing screens
// Exports: StatBar, AboutScreen, WritingScreen, ProjectDetail, ContactScreen

const StatBar = () => (
  <div style={{
    display: 'flex', gap: '48px', alignItems: 'center',
    padding: '12px 48px', borderBottom: '1px solid #1a1a1a',
    overflowX: 'auto',
  }}>
    {[
      { label: 'Status', value: 'Available', color: '#4a9e5c', dot: true },
      { label: 'Location', value: 'Berlin, DE' },
      { label: 'Experience', value: '7 yrs' },
      { label: 'Stack', value: 'Rust / Go / Linux' },
      { label: 'Last Deploy', value: '2024-11-03' },
    ].map(s => (
      <div key={s.label} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#666' }}>{s.label}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: s.color || '#e8e8e8', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {s.dot && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.color, animation: 'blink 2s ease-in-out infinite' }}></span>}
          {s.value}
        </span>
      </div>
    ))}
    <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
  </div>
);

const SkillBar = ({ name, level }) => (
  <div style={{ marginBottom: '12px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>{name}</span>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666' }}>{level}/10</span>
    </div>
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ height: '6px', flex: 1, background: i < level ? '#e8e8e8' : '#1a1a1a', borderRadius: 0 }} />
      ))}
    </div>
  </div>
);

const AboutScreen = () => (
  <section style={{ padding: '64px 48px', maxWidth: '960px' }}>
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>02 — About</div>
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '32px' }}>Alex Kern</h2>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
      <div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 300, color: '#999', lineHeight: 1.75, marginBottom: '24px' }}>
          Systems engineer focused on compiler infrastructure, runtimes, and developer tooling. Seven years writing Rust and Go in production. Previously at Cloudflare and a stealth robotics startup.
        </p>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 300, color: '#999', lineHeight: 1.75 }}>
          Interested in problems where the machine matters — cache coherency, instruction scheduling, memory allocation. Available for contract and full-time roles.
        </p>
      </div>
      <div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.09em', color: '#444', marginBottom: '16px' }}>Skills</div>
        {[['Rust', 9], ['Go', 7], ['Linux / eBPF', 8], ['WebAssembly', 7], ['C / C++', 5]].map(([n, l]) => (
          <SkillBar key={n} name={n} level={l} />
        ))}
      </div>
    </div>
  </section>
);

const WritingScreen = () => {
  const posts = [
    { title: 'Zero-cost abstractions are a lie (sometimes)', date: '2024-10-12', readTime: '8 min', tags: ['Rust', 'Performance'] },
    { title: 'Building a compiler in a weekend', date: '2024-08-03', readTime: '12 min', tags: ['Compiler', 'WASM'] },
    { title: 'eBPF for application developers', date: '2024-05-17', readTime: '6 min', tags: ['eBPF', 'Linux'] },
    { title: 'Why I stopped using async Rust', date: '2024-02-28', readTime: '5 min', tags: ['Rust', 'Opinion'] },
  ];
  return (
    <section style={{ padding: '64px 48px', maxWidth: '720px' }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>03 — Writing</div>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '40px' }}>Posts</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map((p, i) => (
          <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer', gap: '24px' }}
            onMouseEnter={e => e.currentTarget.querySelector('.post-title').style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.querySelector('.post-title').style.color = '#e8e8e8'}
          >
            <div>
              <div className="post-title" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px', fontWeight: 500, color: '#e8e8e8', marginBottom: '8px', transition: 'color 200ms ease-out' }}>{p.title}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {p.tags.map(t => <span key={t} style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#666', border: '1px solid #222', borderRadius: '999px', padding: '2px 8px' }}>{t}</span>)}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#666', marginBottom: '4px' }}>{p.date}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.readTime} read</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProjectDetail = ({ project, onBack }) => (
  <section style={{ padding: '48px 48px', maxWidth: '800px' }}>
    <button onClick={onBack} style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#666', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', padding: 0, transition: 'color 200ms ease-out' }}
      onMouseEnter={e => e.target.style.color = '#e8e8e8'}
      onMouseLeave={e => e.target.style.color = '#666'}
    >← Back to Work</button>

    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>{project.year} — {project.category}</div>
    <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '32px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>{project.title}</h1>
    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 300, color: '#999', lineHeight: 1.75, marginBottom: '40px', maxWidth: '560px' }}>{project.description} Extended project description would appear here with implementation details, design decisions, and lessons learned.</p>

    {/* Stats */}
    <div style={{ borderTop: '1px solid #1a1a1a', marginBottom: '32px' }}>
      {[['Language', project.tags[0]], ['Status', project.status], ['Year', project.year], ['License', 'MIT']].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#999' }}>{l}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#e8e8e8' }}>{v}</span>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <button style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', background: '#fff', color: '#000', border: 'none', borderRadius: '999px', padding: '12px 28px', cursor: 'pointer', transition: 'opacity 200ms ease-out' }}
        onMouseEnter={e => e.target.style.opacity = '0.85'} onMouseLeave={e => e.target.style.opacity = '1'}
      >View Source ↗</button>
      <button style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'transparent', color: '#e8e8e8', border: '1px solid #333', borderRadius: '999px', padding: '12px 28px', cursor: 'pointer', transition: 'border-color 200ms ease-out' }}
        onMouseEnter={e => e.target.style.borderColor = '#e8e8e8'} onMouseLeave={e => e.target.style.borderColor = '#333'}
      >Live Demo ↗</button>
    </div>
  </section>
);

const ContactScreen = () => (
  <section style={{ padding: '64px 48px', maxWidth: '600px' }}>
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>04 — Contact</div>
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>Get in Touch</h2>
    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '15px', fontWeight: 300, color: '#999', lineHeight: 1.75, marginBottom: '40px' }}>Available for contract and full-time roles. Prefer async communication — email is best.</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {[['Email', 'alex@kern.dev'], ['GitHub', 'github.com/alexkern'], ['LinkedIn', 'linkedin.com/in/alexkern']].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #1a1a1a' }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.07em', color: '#666' }}>{l}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#5b9bf6', cursor: 'pointer' }}>{v} ↗</span>
        </div>
      ))}
    </div>
  </section>
);

Object.assign(window, { StatBar, AboutScreen, WritingScreen, ProjectDetail, ContactScreen });

// WorkSection.jsx — Filterable project grid
// Exports: WorkSection

const PROJECTS = [
  { id: 1, title: 'Oxide Compiler', description: 'Systems-level compiler targeting WebAssembly with zero-cost abstractions and a 400ms build time.', tags: ['Rust', 'WASM', 'Compiler'], year: '2024', status: 'deployed', category: 'systems' },
  { id: 2, title: 'Signal Protocol', description: 'Minimal pub/sub for embedded systems. Written in no_std Rust, zero heap allocation.', tags: ['Embedded', 'No-std', 'Rust'], year: '2023', status: 'deployed', category: 'systems' },
  { id: 3, title: 'Ferrite DB', description: 'Append-only log-structured storage engine with MVCC. Inspired by LevelDB.', tags: ['Go', 'Storage', 'LSM'], year: '2024', status: 'wip', category: 'systems' },
  { id: 4, title: 'Kernel Trace', description: 'eBPF-powered Linux performance tracing tool with a terminal UI.', tags: ['eBPF', 'Linux', 'Go'], year: '2023', status: 'deployed', category: 'tools' },
  { id: 5, title: 'Dev Shell', description: 'Opinionated developer environment bootstrap. One script, reproducible state.', tags: ['Bash', 'Nix', 'DevEx'], year: '2022', status: 'deployed', category: 'tools' },
  { id: 6, title: 'Static Watcher', description: 'File watcher with an event bus. Faster than chokidar, less opinionated.', tags: ['Node', 'CLI', 'FS'], year: '2022', status: 'archived', category: 'tools' },
];

const WorkSection = ({ onSelectProject }) => {
  const [filter, setFilter] = React.useState('all');
  const filters = ['All', 'Systems', 'Tools'];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section style={{ padding: '64px 48px' }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', marginBottom: '8px' }}>01 — Selected Work</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', fontWeight: 600, color: '#fff' }}>Projects</h2>
        </div>
        {/* Segmented filter */}
        <div style={{ display: 'inline-flex', background: '#111', border: '1px solid #333', borderRadius: '999px', padding: '3px', gap: '2px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f.toLowerCase())}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: '11px',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                padding: '7px 18px', borderRadius: '999px', cursor: 'pointer',
                border: 'none', transition: 'background 200ms ease-out, color 200ms ease-out',
                background: filter === f.toLowerCase() ? '#fff' : 'transparent',
                color: filter === f.toLowerCase() ? '#000' : '#666',
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map(p => (
          <ProjectCard key={p.id} project={p} onClick={() => onSelectProject(p)} />
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { WorkSection, PROJECTS });

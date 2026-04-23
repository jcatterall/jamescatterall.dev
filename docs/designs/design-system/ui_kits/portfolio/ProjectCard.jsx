// ProjectCard.jsx — Project card with tags and hover
// Exports: ProjectCard

const ProjectCard = ({ project, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const statusColors = { deployed: '#4a9e5c', wip: '#d4a843', archived: '#666' };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111', borderRadius: '12px', padding: '24px',
        border: `1px solid ${hovered ? '#666' : '#333'}`,
        cursor: 'pointer', transition: 'border-color 200ms ease-out',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px',
            fontWeight: 500, color: '#fff', marginBottom: '6px',
          }}>{project.title}</div>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px',
            fontWeight: 300, color: '#999', lineHeight: 1.5,
          }}>{project.description}</div>
        </div>
        {hovered && (
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: '16px',
            color: '#666', flexShrink: 0, marginTop: '2px',
          }}>↗</div>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Space Mono', monospace", fontSize: '10px',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            color: '#999', border: '1px solid #333', borderRadius: '999px',
            padding: '3px 10px',
          }}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '10px',
          textTransform: 'uppercase', letterSpacing: '0.07em', color: '#666',
        }}>{project.year}</span>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: '10px',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          color: statusColors[project.status] || '#666',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: statusColors[project.status] || '#666' }}></span>
          {project.status}
        </span>
      </div>
    </div>
  );
};

Object.assign(window, { ProjectCard });

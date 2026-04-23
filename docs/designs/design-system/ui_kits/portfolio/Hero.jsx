// Hero.jsx — Hero section with Doto display, status badge
// Exports: Hero

const Hero = ({ setScreen }) => (
  <section style={{
    minHeight: 'calc(100vh - 56px)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '0 48px',
    backgroundImage: 'radial-gradient(circle, #222 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    position: 'relative',
  }}>
    {/* Status badge */}
    <div style={{ marginBottom: '32px' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontFamily: "'Space Mono', monospace", fontSize: '11px',
        textTransform: 'uppercase', letterSpacing: '0.07em',
        color: '#4a9e5c', border: '1px solid #4a9e5c',
        borderRadius: '999px', padding: '4px 14px',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#4a9e5c',
          animation: 'blink 2s ease-in-out infinite',
        }}></span>
        Available for work
      </span>
    </div>

    {/* Display name */}
    <h1 style={{
      fontFamily: "'Doto', monospace", fontSize: 'clamp(48px, 8vw, 96px)',
      color: '#fff', lineHeight: 1, marginBottom: '8px', fontWeight: 400,
    }}>
      ALEX KERN
    </h1>
    <h2 style={{
      fontFamily: "'Doto', monospace", fontSize: 'clamp(24px, 4vw, 48px)',
      color: '#333', lineHeight: 1, marginBottom: '40px', fontWeight: 400,
    }}>
      SYSTEMS ENGINEER
    </h2>

    {/* Body copy */}
    <p style={{
      fontFamily: "'Space Grotesk', sans-serif", fontSize: '16px',
      fontWeight: 300, color: '#999', maxWidth: '480px',
      lineHeight: 1.7, marginBottom: '40px',
    }}>
      Building low-level systems in Rust and Go. Compilers, runtimes, and infrastructure that disappears into the background.
    </p>

    {/* CTAs */}
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <button
        onClick={() => setScreen('work')}
        style={{
          fontFamily: "'Space Mono', monospace", fontSize: '13px',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          background: '#fff', color: '#000', border: 'none',
          borderRadius: '999px', padding: '13px 32px',
          cursor: 'pointer', minHeight: '44px',
          transition: 'opacity 200ms ease-out',
        }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >View Work</button>

      <button
        onClick={() => setScreen('about')}
        style={{
          fontFamily: "'Space Mono', monospace", fontSize: '13px',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          background: 'transparent', color: '#e8e8e8',
          border: '1px solid #333', borderRadius: '999px',
          padding: '13px 32px', cursor: 'pointer', minHeight: '44px',
          transition: 'border-color 200ms ease-out',
        }}
        onMouseEnter={e => e.target.style.borderColor = '#e8e8e8'}
        onMouseLeave={e => e.target.style.borderColor = '#333'}
      >About Me</button>
    </div>

    {/* Scroll hint */}
    <div style={{
      position: 'absolute', bottom: '32px', left: '48px',
      fontFamily: "'Space Mono', monospace", fontSize: '10px',
      textTransform: 'uppercase', letterSpacing: '0.08em', color: '#444',
    }}>Scroll — 01 / 04</div>

    <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
  </section>
);

Object.assign(window, { Hero });

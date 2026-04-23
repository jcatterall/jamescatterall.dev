// Header.jsx — Sticky navigation bar
// Exports: Header
// Requires: window.Screen (current screen name), window.setScreen

const Header = ({ screen, setScreen }) => {
  const links = ['Work', 'Writing', 'About'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: '56px',
      background: 'rgba(0,0,0,0.92)', backdropFilter: 'none',
      borderBottom: '1px solid #1a1a1a',
    }}>
      <div
        onClick={() => setScreen('home')}
        style={{
          fontFamily: "'Doto', monospace", fontSize: '22px', color: '#fff',
          cursor: 'pointer', letterSpacing: '0.02em', userSelect: 'none',
        }}
      >DEV_OS</div>

      <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {links.map(l => (
          <a key={l} onClick={() => setScreen(l.toLowerCase())} style={{
            fontFamily: "'Space Mono', monospace", fontSize: '11px',
            textTransform: 'uppercase', letterSpacing: '0.07em',
            color: screen === l.toLowerCase() ? '#fff' : '#666',
            cursor: 'pointer', textDecoration: 'none', position: 'relative',
            paddingBottom: '2px', transition: 'color 200ms ease-out',
            borderBottom: screen === l.toLowerCase() ? '2px solid #fff' : '2px solid transparent',
          }}>{l}</a>
        ))}
      </nav>

      <button
        onClick={() => setScreen('contact')}
        style={{
          fontFamily: "'Space Mono', monospace", fontSize: '11px',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          background: '#fff', color: '#000', border: 'none',
          borderRadius: '999px', padding: '9px 22px', cursor: 'pointer',
          transition: 'opacity 200ms ease-out',
        }}
        onMouseEnter={e => e.target.style.opacity = '0.85'}
        onMouseLeave={e => e.target.style.opacity = '1'}
      >Hire Me</button>
    </header>
  );
};

Object.assign(window, { Header });

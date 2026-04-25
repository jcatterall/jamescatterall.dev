import styles from "./page.module.css";

const projects = [
  {
    title: "Barcode",
    desc: "Generate artistic EAN-13 barcodes clipped to custom shapes and export as SVG.",
    tags: ["SVG", "TypeScript"],
    year: "2025",
    href: "/barcode",
  },
  {
    title: "Session",
    desc: "Keyboard-first Pomodoro timer with desktop notifications and a dot-matrix session receipt.",
    tags: ["TypeScript", "Web API"],
    year: "2026",
    href: "/session",
  },
  {
    title: "ASCII Lens",
    desc: "Real-time webcam-to-ASCII art renderer. Runs entirely in the browser. Export as SVG.",
    tags: ["Canvas", "WebRTC", "TypeScript"],
    year: "2026",
    href: "/ascii",
  },
  {
    title: "Pixel Grid",
    desc: "Dot-matrix pixel art editor. 16×16–64×64 canvas, multi-frame animation, phosphor-glow preview. Export as PNG, SVG, or animated SVG.",
    tags: ["Canvas", "TypeScript"],
    year: "2026",
    href: "/pixel-grid",
  },
];

export default function Home() {
  return (
    <main className={styles.layout}>
      {/* ── LEFT: Identity ── */}
      <aside className={styles.leftCol}>
        <div className={styles.fadeOverlay} />
        <div className={styles.identity}>
          <h1 className={styles.heroName}>
            JAMES
            <br />
            CATTERALL
          </h1>
          <div className={styles.divider} />
          <div className={styles.statusRows}>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>STATUS</span>
              <span className={styles.statusOnline}>ONLINE</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>ROLE</span>
              <span className={styles.statusValue}>SOFTWARE DEVELOPER</span>
            </div>
            <div className={styles.statusRow}>
              <span className={styles.statusLabel}>LOC</span>
              <span className={styles.statusValue}>LONDON, UK</span>
            </div>
          </div>
          <div className={styles.dividerThin} />
          <div className={styles.contactRows}>
            <a
              href="mailto:james.catterall92@gmail.com"
              className={styles.contactLink}
            >
              <span className={styles.contactIcon}>✉</span>
              <span className={styles.contactValue}>
                james.catterall92@gmail.com
              </span>
              <span className={styles.contactArrow}>↗</span>
            </a>
            <a
              href="https://github.com/jcatterall"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactLink}
            >
              <span className={styles.contactIcon}>⌥</span>
              <span className={styles.contactValue}>github.com/jcatterall</span>
              <span className={styles.contactArrow}>↗</span>
            </a>
          </div>
        </div>
        <div className={styles.copyright}>© 2025 JAMES CATTERALL</div>
      </aside>

      {/* ── RIGHT: Work ── */}
      <div className={styles.rightCol}>
        <div className={styles.prompt}>
          <span className={styles.promptCaret}>{">"}</span>
          <span className={styles.promptPath}>./projects</span>
        </div>
        <div className={styles.tableHeader}>
          <span className={styles.tableHeaderLabel}>PROJECTS</span>
          <span className={styles.tableHeaderLabel}>YEAR</span>
        </div>
        <div className={styles.workList}>
          {projects.map((p) => (
            <a key={p.title} href={p.href} className={styles.workRow}>
              <div className={styles.rowAccent} />
              <div className={styles.rowBody}>
                <div className={styles.rowTitle}>{p.title}</div>
                <div className={styles.rowDesc}>{p.desc}</div>
                <div className={styles.tagRow}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      [{t}]
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.rowMeta}>
                <span className={styles.rowYear}>{p.year}</span>
                <span className={styles.rowArrow}>↗</span>
              </div>
            </a>
          ))}
          <div className={styles.eof}>{projects.length} entries — EOF</div>
        </div>
      </div>
    </main>
  );
}

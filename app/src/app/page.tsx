import styles from "./page.module.css";

const projects = [
  {
    title: "Barcode Studio",
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
    title: "Dev Dashboard",
    desc: "Internal engineering metrics platform. Build times, deploy frequency, incident tracking.",
    tags: ["Next.js", "GraphQL", "Docker"],
    year: "2024",
    href: "#",
  },
  {
    title: "CLI Toolkit",
    desc: "Developer tooling suite for project scaffolding and environment bootstrapping. 12 templates.",
    tags: ["Node.js", "TypeScript", "Bash"],
    year: "2023",
    href: "#",
  },
  {
    title: "Auth Service",
    desc: "Stateless JWT microservice with refresh token rotation and OAuth2 provider integration.",
    tags: ["Node.js", "Redis", "Docker", "AWS"],
    year: "2023",
    href: "#",
  },
  {
    title: "Data Pipeline",
    desc: "Event-driven ETL pipeline processing 50k+ records daily. Schema validation, error queues.",
    tags: ["TypeScript", "PostgreSQL", "AWS"],
    year: "2022",
    href: "#",
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

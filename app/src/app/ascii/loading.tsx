import styles from "./loading.module.css"

export default function AsciiLoading() {
  return (
    <div className={styles.layout}>
      {/* Sidebar skeleton */}
      <aside className={styles.sidebar}>
        {/* Header */}
        <div className={styles.sidebarHeader}>
          <div className={`${styles.skel} ${styles.skelPrompt}`} style={{ animationDelay: "0ms" }} />
          <div className={`${styles.skel} ${styles.skelTitle}`} style={{ animationDelay: "50ms" }} />
          <div className={`${styles.skel} ${styles.skelSubtitle}`} style={{ animationDelay: "100ms" }} />
          <div className={`${styles.skel} ${styles.skelSubtitleShort}`} style={{ animationDelay: "130ms" }} />
        </div>

        {/* Body */}
        <div className={styles.sidebarBody}>
          {/* Source section */}
          <div className={styles.section}>
            <div className={`${styles.skel} ${styles.skelLabel}`} style={{ animationDelay: "80ms" }} />
            <div className={`${styles.skel} ${styles.skelBtn}`} style={{ animationDelay: "100ms" }} />
            <div className={`${styles.skel} ${styles.skelBtn}`} style={{ animationDelay: "130ms" }} />
          </div>

          {/* Resolution section */}
          <div className={styles.section}>
            <div className={styles.sliderHeader}>
              <div className={`${styles.skel} ${styles.skelLabel}`} style={{ animationDelay: "110ms" }} />
              <div className={`${styles.skel} ${styles.skelSliderVal}`} style={{ animationDelay: "120ms" }} />
            </div>
            <div className={`${styles.skel} ${styles.skelSlider}`} style={{ animationDelay: "140ms" }} />
          </div>

          {/* Char set section */}
          <div className={styles.section}>
            <div className={`${styles.skel} ${styles.skelLabel}`} style={{ animationDelay: "150ms" }} />
            <div className={styles.pills}>
              {["72px", "64px", "72px", "60px", "60px"].map((w, i) => (
                <div
                  key={i}
                  className={`${styles.skel} ${styles.skelPill}`}
                  style={{ width: w, animationDelay: `${150 + i * 30}ms` }}
                />
              ))}
            </div>
            <div className={`${styles.skel} ${styles.skelCharPreview}`} style={{ animationDelay: "300ms" }} />
          </div>

          {/* Mode section */}
          <div className={styles.section}>
            <div className={`${styles.skel} ${styles.skelLabel}`} style={{ animationDelay: "180ms" }} />
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.toggleRow}>
                <div className={`${styles.skel} ${styles.skelToggleLabel}`} style={{ animationDelay: `${190 + i * 20}ms` }} />
                <div className={`${styles.skel} ${styles.skelToggle}`} style={{ animationDelay: `${200 + i * 20}ms` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <div className={`${styles.skel} ${styles.skelExportBtn}`} style={{ animationDelay: "250ms" }} />
        </div>
      </aside>

      {/* Canvas area skeleton */}
      <div className={styles.main}>
        <div className={styles.canvasWrap}>
          <div className={`${styles.skel} ${styles.skelDotGrid}`} style={{ animationDelay: "200ms" }} />
          <div className={`${styles.skel} ${styles.skelBadge}`} style={{ animationDelay: "220ms" }} />
        </div>
        <div className={styles.statusBar}>
          <div className={`${styles.skel} ${styles.skelStatus}`} style={{ animationDelay: "260ms" }} />
        </div>
      </div>
    </div>
  )
}

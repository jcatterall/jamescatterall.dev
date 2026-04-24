import styles from "./loading.module.css";

export default function PixelGridLoading() {
  return (
    <div className={styles.editor}>
      {/* Sidebar skeleton */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.skeletonLine} style={{ width: 80 }} />
          <div
            className={styles.skeletonLine}
            style={{ width: 64, height: 14 }}
          />
          <div className={styles.skeletonLine} style={{ width: 120 }} />
        </div>
        <div className={styles.sidebarBody}>
          <div className={styles.section}>
            <div className={styles.skeletonLabel} />
            <div className={styles.toolList}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.skeletonTool}
                  style={{ animationDelay: `${i * 40}ms` }}
                />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.skeletonLabel} />
            <div className={styles.gridSizes}>
              <div className={styles.skeletonSizeBtn} />
              <div className={styles.skeletonSizeBtn} />
              <div className={styles.skeletonSizeBtn} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.skeletonLabel} />
            <div className={styles.paletteGrid}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={styles.skeletonSwatch}
                  style={{ animationDelay: `${i * 25}ms` }}
                />
              ))}
            </div>
            <div className={styles.skeletonLine} style={{ width: 56 }} />
            <div className={styles.skeletonResetBtn} />
          </div>
          <div className={styles.section}>
            <div className={styles.skeletonLabel} />
            <div className={styles.historyRow}>
              <div className={styles.skeletonHistoryBtn} />
              <div className={styles.skeletonHistoryBtn} />
            </div>
          </div>
        </div>
        <div className={styles.sidebarFooter}>
          <div className={styles.skeletonNewBtn} />
        </div>
      </aside>

      {/* Center: canvas + frame strip + legend */}
      <div className={styles.center}>
        <div className={styles.canvasWrap}>
          <div className={styles.skeletonCanvas} />
        </div>
        <div className={styles.frameStrip}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonThumb} />
          <div className={styles.skeletonAddBtn} />
          <div className={styles.stripCount} />
        </div>
        <div className={styles.legendBar}>
          <div className={styles.skeletonLine} style={{ width: 140 }} />
        </div>
      </div>

      {/* Right panel: preview + export + status */}
      <div className={styles.previewPanel}>
        <div className={styles.section}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonPreview} />
          <div className={styles.skeletonPlayBtn} />
          <div className={styles.skeletonFpsRow}>
            <div className={styles.skeletonLine} style={{ width: 24 }} />
            <div className={styles.skeletonFpsSlider} />
            <div className={styles.skeletonLine} style={{ width: 16 }} />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.skeletonLabel} />
          <div className={styles.exportList}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={styles.skeletonExportBtn}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
        <div className={styles.statusSection}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.statusRow}>
              <div className={styles.skeletonLine} style={{ width: 40 }} />
              <div className={styles.skeletonLine} style={{ width: 52 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import styles from "./loading.module.css";

export default function SessionLoading() {
  return (
    <div className={styles.layout}>
      {/* Sidebar skeleton */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.skeletonPrompt} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonSubtitle} />
        </div>
        <div className={styles.sidebarBody}>
          <div className={styles.section}>
            <div className={styles.skeletonSectionLabel} />
            <div className={styles.skeletonField}>
              <div className={styles.skeletonFieldLabel} />
              <div className={styles.skeletonInput} />
            </div>
            <div className={styles.skeletonField}>
              <div className={styles.skeletonFieldLabel} />
              <div className={styles.skeletonInput} />
            </div>
            <div className={styles.skeletonField}>
              <div className={styles.skeletonFieldLabel} />
              <div className={styles.skeletonInput} />
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.skeletonSectionLabel} />
            <div className={styles.skeletonField}>
              <div className={styles.skeletonFieldLabel} />
              <div className={styles.skeletonInput} />
            </div>
          </div>
          <div className={styles.skeletonToggleRow}>
            <div className={styles.skeletonToggleLabel} />
            <div className={styles.skeletonToggle} />
          </div>
          <div className={styles.section}>
            <div className={styles.skeletonSectionLabel} />
            <div className={styles.skeletonNotifRow} />
          </div>
        </div>
        <div className={styles.sidebarFooter}>
          <div className={styles.skeletonReceiptButton} />
        </div>
      </div>

      {/* Timer area skeleton */}
      <div className={styles.timerArea}>
        <div className={styles.progressLine} />
        <div className={styles.timerCenter}>
          <div className={styles.skeletonPhaseLabel} />
          <div className={styles.skeletonCountdown} />
          <div className={styles.skeletonPips}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={styles.skeletonPip}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className={styles.skeletonControls}>
            <div className={styles.skeletonBtnSm} />
            <div className={styles.skeletonBtnLg} />
            <div className={styles.skeletonBtnSm} />
          </div>
        </div>
        <div className={styles.legendBar} />
      </div>
    </div>
  );
}

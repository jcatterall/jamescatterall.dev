import { Skeleton } from "@/design-system"
import styles from "./loading.module.css"

export default function AsciiLoading() {
  return (
    <div className={styles.layout}>
      {/* Sidebar skeleton */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Skeleton width={72} height={12} style={{ animationDelay: "0ms" }} />
          <Skeleton variant="title" width={120} style={{ animationDelay: "50ms" }} />
          <Skeleton width="100%" height={12} style={{ animationDelay: "100ms" }} />
          <Skeleton width="70%" height={12} style={{ animationDelay: "130ms" }} />
        </div>

        <div className={styles.sidebarBody}>
          {/* Source section */}
          <div className={styles.section}>
            <Skeleton width={64} height={10} style={{ animationDelay: "80ms" }} />
            <Skeleton height={36} style={{ animationDelay: "100ms" }} />
            <Skeleton height={36} style={{ animationDelay: "130ms" }} />
          </div>

          {/* Resolution section */}
          <div className={styles.section}>
            <div className={styles.sliderHeader}>
              <Skeleton width={64} height={10} style={{ animationDelay: "110ms" }} />
              <Skeleton width={48} height={10} style={{ animationDelay: "120ms" }} />
            </div>
            <Skeleton height={1} style={{ animationDelay: "140ms" }} />
          </div>

          {/* Char set section */}
          <div className={styles.section}>
            <Skeleton width={64} height={10} style={{ animationDelay: "150ms" }} />
            <div className={styles.pills}>
              {(["72px-0", "64px-1", "72px-2", "60px-3", "60px-4"] as const).map((wk, i) => (
                <Skeleton key={wk} variant="pill" width={wk.split("-")[0]} style={{ animationDelay: `${150 + i * 30}ms` }} />
              ))}
            </div>
            <Skeleton height={24} style={{ animationDelay: "300ms" }} />
          </div>

          {/* Mode section */}
          <div className={styles.section}>
            <Skeleton width={64} height={10} style={{ animationDelay: "180ms" }} />
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.toggleRow}>
                <Skeleton width={48} height={10} style={{ animationDelay: `${190 + i * 20}ms` }} />
                <Skeleton width={32} height={16} style={{ animationDelay: `${200 + i * 20}ms` }} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <Skeleton height={40} style={{ animationDelay: "250ms" }} />
        </div>
      </aside>

      {/* Canvas area skeleton */}
      <div className={styles.main}>
        <div className={styles.canvasWrap}>
          <Skeleton style={{ position: "absolute", inset: 0, animationDelay: "200ms" }} />
          <Skeleton width={80} height={18} style={{ position: "absolute", top: 12, left: 12, animationDelay: "220ms" }} />
        </div>
        <div className={styles.statusBar}>
          <Skeleton width={120} height={10} style={{ animationDelay: "260ms" }} />
        </div>
      </div>
    </div>
  )
}

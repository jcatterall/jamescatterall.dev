import { Skeleton } from "@/design-system"
import styles from "./loading.module.css"

export default function BarcodeLoading() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Skeleton width={72} height={12} style={{ animationDelay: "0ms" }} />
          <Skeleton variant="title" width={100} style={{ animationDelay: "50ms" }} />
          <Skeleton width="100%" height={12} style={{ animationDelay: "100ms" }} />
          <Skeleton width="60%" height={12} style={{ animationDelay: "130ms" }} />
        </div>

        <div className={styles.sidebarBody}>
          {/* Number section */}
          <div className={styles.section}>
            <Skeleton width={64} height={10} style={{ animationDelay: "80ms" }} />
            <Skeleton height={40} style={{ animationDelay: "110ms" }} />
            <Skeleton width={32} height={10} style={{ animationDelay: "120ms" }} />
          </div>

          {/* Shape section */}
          <div className={styles.section}>
            <Skeleton width={48} height={10} style={{ animationDelay: "140ms" }} />
            <div className={styles.pills}>
              {(["72-0", "52-1", "60-2", "52-3", "52-4"] as const).map((wk, i) => (
                <Skeleton key={wk} variant="pill" width={Number(wk.split("-")[0])} height={27} style={{ animationDelay: `${150 + i * 20}ms` }} />
              ))}
            </div>
          </div>

          {/* Colour section */}
          <div className={styles.section}>
            <Skeleton width={52} height={10} style={{ animationDelay: "200ms" }} />
            <div className={styles.swatches}>
              {([0, 1, 2, 3, 4] as const).map((i) => (
                <Skeleton key={i} width={28} height={28} style={{ animationDelay: `${210 + i * 15}ms` }} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          <Skeleton height={40} style={{ animationDelay: "260ms" }} />
        </div>
      </aside>

      <div className={styles.main}>
        <div className={styles.previewArea}>
          <div className={styles.previewCard}>
            <Skeleton width="100%" style={{ aspectRatio: "285/430", animationDelay: "0.05s" }} />
            <Skeleton variant="text" width={180} height={13} style={{ animationDelay: "0.08s" }} />
          </div>
        </div>
      </div>
    </div>
  )
}

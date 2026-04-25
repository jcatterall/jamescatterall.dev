import { Skeleton } from "@/design-system";
import styles from "./loading.module.css";

export default function SessionLoading() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Skeleton height={11} width={80} />
          <Skeleton variant="title" width={100} style={{ animationDelay: "0.05s" }} />
          <Skeleton height={11} width={160} style={{ animationDelay: "0.08s" }} />
        </div>
        <div className={styles.sidebarBody}>
          <div className={styles.section}>
            <Skeleton height={10} width={72} style={{ animationDelay: "0.1s" }} />
            {(["focus","short","long"] as const).map((k) => (
              <div key={k} className={styles.field}>
                <Skeleton height={10} width={56} style={{ animationDelay: "0.12s" }} />
                <Skeleton height={32} style={{ animationDelay: "0.15s" }} />
              </div>
            ))}
          </div>
          <div className={styles.section}>
            <Skeleton height={10} width={72} style={{ animationDelay: "0.1s" }} />
            <div className={styles.field}>
              <Skeleton height={10} width={56} style={{ animationDelay: "0.12s" }} />
              <Skeleton height={32} style={{ animationDelay: "0.15s" }} />
            </div>
          </div>
          <div className={styles.toggleRow}>
            <Skeleton height={10} width={80} style={{ animationDelay: "0.18s" }} />
            <Skeleton width={32} height={16} style={{ animationDelay: "0.2s" }} />
          </div>
          <div className={styles.section}>
            <Skeleton height={10} width={72} style={{ animationDelay: "0.1s" }} />
            <Skeleton height={24} style={{ animationDelay: "0.22s" }} />
          </div>
        </div>
        <div className={styles.sidebarFooter}>
          <Skeleton height={38} style={{ animationDelay: "0.25s" }} />
        </div>
      </div>

      {/* Timer area */}
      <div className={styles.timerArea}>
        <div className={styles.progressLine} />
        <div className={styles.timerCenter}>
          <Skeleton height={12} width={72} style={{ animationDelay: "0.05s" }} />
          <Skeleton height="clamp(96px, 14vw, 160px)" width="clamp(200px, 30vw, 340px)" style={{ animationDelay: "0.08s" }} />
          <div className={styles.pips}>
            {(["p0","p1","p2","p3"] as const).map((k, i) => (
              <Skeleton key={k} width={16} height={16} style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
          <div className={styles.controls}>
            <Skeleton width={44} height={44} style={{ animationDelay: "0.15s" }} />
            <Skeleton width={64} height={64} style={{ animationDelay: "0.1s" }} />
            <Skeleton width={44} height={44} style={{ animationDelay: "0.15s" }} />
          </div>
        </div>
        <div className={styles.legendBar} />
      </div>
    </div>
  );
}

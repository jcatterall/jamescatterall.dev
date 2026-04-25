import { Skeleton } from "@/design-system";
import styles from "./loading.module.css";

export default function PixelGridLoading() {
  return (
    <div className={styles.editor}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Skeleton height={9} width={80} />
          <Skeleton height={14} width={64} />
          <Skeleton height={9} width={120} />
        </div>
        <div className={styles.sidebarBody}>
          <div className={styles.section}>
            <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
            <div className={styles.toolList}>
              {(["pencil","eraser","fill","eyedropper","line","rect","select"] as const).map((t) => (
                <Skeleton key={t} height={28} style={{ animationDelay: "0.05s" }} />
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
            <div className={styles.gridSizes}>
              <Skeleton height={26} style={{ flex: 1, animationDelay: "0.1s" }} />
              <Skeleton height={26} style={{ flex: 1, animationDelay: "0.1s" }} />
              <Skeleton height={26} style={{ flex: 1, animationDelay: "0.1s" }} />
            </div>
          </div>
          <div className={styles.section}>
            <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
            <div className={styles.paletteGrid}>
              {(["s0","s1","s2","s3","s4","s5","s6","s7","s8","s9","s10","s11","s12","s13","s14","s15"] as const).map((k, i) => (
                <Skeleton key={k} style={{ aspectRatio: "1", animationDelay: `${i * 25}ms` }} />
              ))}
            </div>
            <Skeleton height={9} width={56} />
            <Skeleton height={26} style={{ animationDelay: "0.15s" }} />
          </div>
          <div className={styles.section}>
            <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
            <div className={styles.historyRow}>
              <Skeleton height={28} style={{ flex: 1, animationDelay: "0.1s" }} />
              <Skeleton height={28} style={{ flex: 1, animationDelay: "0.1s" }} />
            </div>
          </div>
        </div>
        <div className={styles.sidebarFooter}>
          <Skeleton height={34} style={{ animationDelay: "0.2s" }} />
        </div>
      </aside>

      {/* Center: canvas + frame strip + legend */}
      <div className={styles.center}>
        <div className={styles.canvasWrap}>
          <Skeleton style={{ maxWidth: "100%", maxHeight: "100%", aspectRatio: "1", animationDelay: "0.05s" }} />
        </div>
        <div className={styles.frameStrip}>
          <Skeleton height={9} width={48} />
          <Skeleton width={56} height={84} style={{ flexShrink: 0 }} />
          <Skeleton width={40} height={40} style={{ flexShrink: 0, animationDelay: "0.1s" }} />
          <Skeleton height={9} width={64} style={{ marginLeft: "auto", animationDelay: "0.15s" }} />
        </div>
        <div className={styles.legendBar}>
          <Skeleton height={9} width={140} />
        </div>
      </div>

      {/* Right: preview + export + status */}
      <div className={styles.previewPanel}>
        <div className={styles.section}>
          <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
          <Skeleton style={{ width: "100%", aspectRatio: "1", animationDelay: "0.05s" }} />
          <Skeleton height={26} style={{ animationDelay: "0.1s" }} />
          <div className={styles.fpsRow}>
            <Skeleton height={9} width={24} />
            <Skeleton height={4} style={{ flex: 1, animationDelay: "0.12s" }} />
            <Skeleton height={9} width={16} />
          </div>
        </div>
        <div className={styles.section}>
          <Skeleton height={9} width={48} style={{ animationDelay: "0.05s" }} />
          <div className={styles.exportList}>
            {(["png","sprite","svg","asvg","css","gif"] as const).map((k, i) => (
              <Skeleton key={k} height={28} style={{ animationDelay: `${i * 50}ms` }} />
            ))}
          </div>
        </div>
        <div className={styles.statusSection}>
          {(["size","frames","colors","modified"] as const).map((k) => (
            <div key={k} className={styles.statusRow}>
              <Skeleton height={9} width={40} />
              <Skeleton height={9} width={52} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

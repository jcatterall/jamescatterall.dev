import styles from "./loading.module.css"

export default function BarcodeLoading() {
  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        <div className={styles.field}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonInput} />
          <div className={styles.skeletonHint} />
        </div>
        <div className={styles.field}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonChips}>
            <div className={styles.skeletonChip} style={{ width: 72 }} />
            <div className={styles.skeletonChip} style={{ width: 52 }} />
            <div className={styles.skeletonChip} style={{ width: 60 }} />
            <div className={styles.skeletonChip} style={{ width: 52 }} />
            <div className={styles.skeletonChip} style={{ width: 52 }} />
          </div>
        </div>
        <div className={styles.field}>
          <div className={styles.skeletonLabel} />
          <div className={styles.skeletonSwatches}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={styles.skeletonSwatch} />
            ))}
          </div>
        </div>
        <div className={styles.skeletonButton} />
      </div>
      <div className={styles.preview}>
        <div className={styles.skeletonPreviewCard}>
          <div className={styles.skeletonSvg} />
          <div className={styles.skeletonDigits} />
        </div>
      </div>
    </div>
  )
}

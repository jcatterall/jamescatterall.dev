import styles from "./loading.module.css"

export default function BarcodeLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.controls}>
          <div className={styles.skeletonField}>
            <div className={styles.skeletonLabel} />
            <div className={styles.skeletonInput} />
          </div>
          <div className={styles.skeletonField}>
            <div className={styles.skeletonLabel} />
            <div className={styles.skeletonChips} />
          </div>
          <div className={styles.skeletonField}>
            <div className={styles.skeletonLabel} />
            <div className={styles.skeletonSwatches} />
          </div>
          <div className={styles.skeletonButton} />
        </div>
        <div className={styles.skeletonPreview} />
      </div>
    </div>
  )
}

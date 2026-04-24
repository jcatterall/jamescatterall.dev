import styles from "./Progress.module.css";
import { clsx } from "clsx";

type ProgressVariant = "filled" | "success" | "warning" | "accent" | "info";

type ProgressProps = {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  label?: string;
  showValue?: boolean;
  className?: string;
};

const variantClass: Record<ProgressVariant, string> = {
  filled: styles.filled,
  success: styles.success,
  warning: styles.warning,
  accent: styles.accent,
  info: styles.info,
};

export function Progress({
  value,
  max = 100,
  variant = "filled",
  label,
  showValue,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx(styles.progress, className)}>
      {(label || showValue) && (
        <div className={styles.progressLabel}>
          {label && <span className={styles.labelText}>{label}</span>}
          {showValue && (
            <span className={styles.labelValue}>{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx(styles.seg, variantClass[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

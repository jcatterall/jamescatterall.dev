import styles from "./EmptyState.module.css";
import { clsx } from "clsx";

type EmptyStateProps = {
  headline: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  headline,
  description,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div className={clsx(styles.empty, className)}>
      <p className={styles.headline}>{headline}</p>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  );
}

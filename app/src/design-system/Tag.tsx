import styles from "./Tag.module.css";
import { clsx } from "clsx";

type TagVariant = "default" | "active" | "accent" | "success";

type TagProps = {
  children: React.ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
};

const variantClass: Partial<Record<TagVariant, string>> = {
  active: styles.tagActive,
  accent: styles.tagAccent,
  success: styles.tagSuccess,
};

export function Tag({
  children,
  variant = "default",
  onRemove,
  className,
}: TagProps) {
  return (
    <span className={clsx(styles.tag, variantClass[variant], className)}>
      {children}
      {onRemove && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}

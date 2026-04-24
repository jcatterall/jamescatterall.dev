import styles from "./Badge.module.css";
import { clsx } from "clsx";

type BadgeVariant =
  | "default"
  | "active"
  | "disabled"
  | "accent"
  | "success"
  | "warning"
  | "info";

type BadgeProps = React.ComponentProps<"span"> & {
  variant?: BadgeVariant;
  dot?: boolean;
  blink?: boolean;
  /** @deprecated use variant="active" instead */
  active?: boolean;
};

const variantClass: Partial<Record<BadgeVariant, string>> = {
  active: styles.active,
  disabled: styles.badgeDisabled,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  info: styles.info,
};

export function Badge({
  className,
  variant = "default",
  dot,
  blink,
  active,
  children,
  ...props
}: BadgeProps) {
  const resolvedVariant = active ? "active" : variant;
  return (
    <span
      className={clsx(styles.badge, variantClass[resolvedVariant], className)}
      {...props}
    >
      {dot && <span className={clsx(styles.dot, blink && styles.dotBlink)} />}
      {children}
    </span>
  );
}

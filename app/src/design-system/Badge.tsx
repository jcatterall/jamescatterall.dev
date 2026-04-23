import styles from "./Badge.module.css"
import { clsx } from "clsx"

type BadgeProps = React.ComponentProps<"span"> & {
  active?: boolean
}

export function Badge({ className, active, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(styles.badge, active && styles.active, className)}
      {...props}
    />
  )
}

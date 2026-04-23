import styles from "./Divider.module.css"

type DividerProps = {
  variant?: "normal" | "thin"
}

export function Divider({ variant = "normal" }: DividerProps) {
  return <hr className={`${styles.divider} ${variant === "thin" ? styles.thin : ""}`} />
}

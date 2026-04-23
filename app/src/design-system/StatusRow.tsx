import styles from "./StatusRow.module.css"

type StatusRowProps = {
  label: string
  value: string
  variant?: "default" | "online"
}

export function StatusRow({ label, value, variant = "default" }: StatusRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${variant === "online" ? styles.valueOnline : ""}`}>
        {value}
      </span>
    </div>
  )
}

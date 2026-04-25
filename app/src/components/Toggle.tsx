"use client"

import styles from "./Toggle.module.css"

type Props = {
  value: boolean
  onChange: (v: boolean) => void
  label: string
  description?: string
}

export function Toggle({ value, onChange, label, description }: Props) {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.label}>{label}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={styles.toggle}
        data-checked={value ? "" : undefined}
        onClick={() => onChange(!value)}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  )
}

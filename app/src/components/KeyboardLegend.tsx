"use client"

import styles from "./KeyboardLegend.module.css"

type Props = {
  entries: [key: string, action: string][]
  open: boolean
  onToggle: () => void
}

export function KeyboardLegend({ entries, open, onToggle }: Props) {
  return (
    <div className={styles.bar}>
      {open ? (
        <div className={styles.legend}>
          {entries.map(([key, action]) => (
            <div key={key} className={styles.item}>
              <kbd className={styles.kbd}>{key}</kbd>
              <span className={styles.action}>{action}</span>
            </div>
          ))}
          <button className={styles.toggle} onClick={onToggle}>
            HIDE
          </button>
        </div>
      ) : (
        <button className={styles.toggle} onClick={onToggle}>
          ? KEYBOARD SHORTCUTS
        </button>
      )}
    </div>
  )
}

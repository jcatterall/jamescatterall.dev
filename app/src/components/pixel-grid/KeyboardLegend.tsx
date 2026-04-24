"use client";

import styles from "./KeyboardLegend.module.css";

const KEY_LEGEND: [string, string][] = [
  ["[ / ]", "Prev / next colour"],
  [", / .", "Prev / next frame"],
  ["X", "Clear frame"],
  ["N", "New empty frame"],
  ["D", "Duplicate frame"],
  ["Delete", "Delete frame"],
  ["Ctrl+Z", "Undo"],
  ["Ctrl+Shift+Z", "Redo"],
];

type Props = {
  open: boolean;
  onToggle: () => void;
};

export function KeyboardLegend({ open, onToggle }: Props) {
  return (
    <div className={styles.bar}>
      {open ? (
        <div className={styles.legend}>
          {KEY_LEGEND.map(([key, action]) => (
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
  );
}

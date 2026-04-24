"use client";

import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  title: string;
  subtitle?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function Modal({
  open,
  title,
  subtitle,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onCancel}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="modal-title" className={styles.title}>
          {title}
        </p>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            className={styles.confirm}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

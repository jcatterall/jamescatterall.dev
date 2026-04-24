import styles from "./Input.module.css";
import { clsx } from "clsx";

/* ── Field wrapper ─────────────────────────────────────────── */

type FieldProps = React.ComponentProps<"div"> & {
  label?: string;
  hint?: string;
  error?: string;
};

export function Field({
  label,
  hint,
  error,
  children,
  className,
  ...props
}: FieldProps) {
  return (
    <div className={clsx(styles.field, className)} {...props}>
      {label && <label className={styles.fieldLabel}>{label}</label>}
      {children}
      {error ? (
        <span className={clsx(styles.fieldHint, styles.fieldError)}>
          {error}
        </span>
      ) : hint ? (
        <span className={styles.fieldHint}>{hint}</span>
      ) : null}
    </div>
  );
}

/* ── Input ─────────────────────────────────────────────────── */

type InputProps = React.ComponentProps<"input"> & {
  error?: boolean;
  underline?: boolean;
};

export function Input({ className, error, underline, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        styles.input,
        error && styles.inputError,
        underline && styles.inputUnderline,
        className,
      )}
      {...props}
    />
  );
}

/* ── Textarea ──────────────────────────────────────────────── */

type TextareaProps = React.ComponentProps<"textarea"> & {
  error?: boolean;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        styles.input,
        styles.textarea,
        error && styles.inputError,
        className,
      )}
      {...props}
    />
  );
}

/* ── Select ────────────────────────────────────────────────── */

type SelectProps = React.ComponentProps<"select"> & {
  error?: boolean;
};

export function Select({ className, error, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        styles.input,
        styles.select,
        error && styles.inputError,
        className,
      )}
      {...props}
    />
  );
}

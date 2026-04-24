import styles from "./Segmented.module.css";
import { clsx } from "clsx";

type SegmentedOption = {
  label: string;
  value: string;
};

type SegmentedProps = {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function Segmented({
  options,
  value,
  onChange,
  className,
}: SegmentedProps) {
  return (
    <div className={clsx(styles.seg, className)} role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={clsx(
            styles.item,
            value === opt.value && styles.itemActive,
          )}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

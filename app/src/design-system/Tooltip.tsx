import styles from "./Tooltip.module.css";
import { clsx } from "clsx";

type TooltipProps = {
  tip: string;
  placement?: "top" | "bottom";
  children: React.ReactNode;
  className?: string;
};

export function Tooltip({
  tip,
  placement = "top",
  children,
  className,
}: TooltipProps) {
  return (
    <span
      className={clsx(
        styles.tooltip,
        placement === "bottom" && styles.bottom,
        className,
      )}
      data-tooltip={tip}
    >
      {children}
    </span>
  );
}

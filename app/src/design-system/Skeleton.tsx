import styles from "./Skeleton.module.css";
import { clsx } from "clsx";

type SkeletonVariant = "text" | "title" | "pill" | "block" | "circle";

type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
};

const variantClass: Record<SkeletonVariant, string> = {
  text: styles.text,
  title: styles.title,
  pill: styles.pill,
  block: styles.block,
  circle: styles.circle,
};

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
}: SkeletonProps) {
  return (
    <span
      className={clsx(styles.skel, variantClass[variant], className)}
      style={{
        width:
          width !== undefined
            ? typeof width === "number"
              ? `${width}px`
              : width
            : undefined,
        height:
          height !== undefined
            ? typeof height === "number"
              ? `${height}px`
              : height
            : undefined,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

type SkeletonGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export function SkeletonGroup({ children, className }: SkeletonGroupProps) {
  return <div className={clsx(styles.group, className)}>{children}</div>;
}

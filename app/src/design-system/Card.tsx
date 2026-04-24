import styles from "./Card.module.css";
import { clsx } from "clsx";

type CardSize = "sm" | "md" | "lg";

type CardProps = React.ComponentProps<"div"> & {
  interactive?: boolean;
  flat?: boolean;
  size?: CardSize;
};

export function Card({
  className,
  interactive,
  flat,
  size,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        interactive && styles.interactive,
        flat && styles.flat,
        size === "sm" && styles.cardSm,
        size === "lg" && styles.cardLg,
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={clsx(styles.header, className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={clsx(styles.title, className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={clsx(styles.description, className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={clsx(styles.content, className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={clsx(styles.footer, className)} {...props} />;
}

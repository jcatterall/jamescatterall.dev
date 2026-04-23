import styles from "./Card.module.css"
import { clsx } from "clsx"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx(styles.card, className)} {...props} />
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx(styles.header, className)} {...props} />
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx(styles.title, className)} {...props} />
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx(styles.description, className)} {...props} />
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={clsx(styles.content, className)} {...props} />
}

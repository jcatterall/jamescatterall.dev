import styles from "./Code.module.css";
import { clsx } from "clsx";

type CodeProps = React.ComponentProps<"code">;

export function Code({ className, ...props }: CodeProps) {
  return <code className={clsx(styles.code, className)} {...props} />;
}

type PreProps = React.ComponentProps<"pre">;

export function Pre({ className, ...props }: PreProps) {
  return <pre className={clsx(styles.pre, className)} {...props} />;
}

import { Slot } from "@radix-ui/react-slot";
import styles from "./Button.module.css";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "destructive" | "link";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  asChild?: boolean;
};

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  destructive: styles.destructive,
  link: styles.link,
};

const sizeClass: Partial<Record<Size, string>> = {
  sm: styles.sm,
  lg: styles.lg,
};

export function Button({
  className,
  variant = "primary",
  size,
  icon,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={clsx(
        styles.btn,
        variantClass[variant],
        size && sizeClass[size],
        icon && styles.icon,
        className,
      )}
      {...props}
    />
  );
}

import { Slot } from "@radix-ui/react-slot"
import styles from "./Button.module.css"
import { clsx } from "clsx"

type Variant = "primary" | "secondary" | "ghost" | "destructive"

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant
  asChild?: boolean
}

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  destructive: styles.destructive,
}

export function Button({ className, variant = "primary", asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={clsx(styles.btn, variantClass[variant], className)}
      {...props}
    />
  )
}

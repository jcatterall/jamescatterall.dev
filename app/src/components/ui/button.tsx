import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { clsx } from "clsx"

import styles from "./button.module.scss"

type Variant = "default" | "noShadow" | "neutral" | "reverse"
type Size = "default" | "sm" | "lg" | "icon"

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant
  size?: Size
  asChild?: boolean
}

const variantClass: Record<Variant, string> = {
  default:  styles["variant-default"],
  noShadow: styles["variant-noShadow"],
  neutral:  styles["variant-neutral"],
  reverse:  styles["variant-reverse"],
}

const sizeClass: Record<Size, string> = {
  default: styles["size-default"],
  sm:      styles["size-sm"],
  lg:      styles["size-lg"],
  icon:    styles["size-icon"],
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={clsx(
        styles.btn,
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  )
}

export { Button }
export type { ButtonProps, Variant as ButtonVariant, Size as ButtonSize }

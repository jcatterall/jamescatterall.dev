import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { clsx } from "clsx"

import styles from "./badge.module.css"

type Variant = "default" | "neutral"

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: Variant
  asChild?: boolean
}

const variantClass: Record<Variant, string> = {
  default: styles["variant-default"],
  neutral: styles["variant-neutral"],
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={clsx(styles.badge, variantClass[variant], className)}
      {...props}
    />
  )
}

export { Badge }
export type { BadgeProps, Variant as BadgeVariant }

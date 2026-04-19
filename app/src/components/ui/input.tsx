import * as React from "react"
import { clsx } from "clsx"

import styles from "./input.module.css"

type InputProps = React.ComponentProps<"input">

function Input({ className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={clsx(styles.input, className)}
      {...props}
    />
  )
}

export { Input }
export type { InputProps }

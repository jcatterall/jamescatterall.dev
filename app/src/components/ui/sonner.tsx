"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

import styles from "./sonner.module.css"

function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: styles.toast,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
          description: styles.description,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

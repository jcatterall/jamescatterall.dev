import * as React from "react"
import { clsx } from "clsx"

import styles from "./card.module.scss"

type SlotName =
  | "card"
  | "card-header"
  | "card-title"
  | "card-description"
  | "card-action"
  | "card-content"
  | "card-footer"

function makeSlot(slot: SlotName) {
  function Slot({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot={slot}
        className={clsx(styles[slot], className)}
        {...props}
      />
    )
  }
  Slot.displayName = slot
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")
  return Slot
}

export const Card           = makeSlot("card")
export const CardHeader     = makeSlot("card-header")
export const CardTitle      = makeSlot("card-title")
export const CardDescription = makeSlot("card-description")
export const CardAction     = makeSlot("card-action")
export const CardContent    = makeSlot("card-content")
export const CardFooter     = makeSlot("card-footer")

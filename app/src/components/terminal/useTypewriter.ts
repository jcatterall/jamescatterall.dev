"use client"

import { useEffect, useState } from "react"

export function useTypewriter(
  text: string,
  enabled: boolean,
  speed: number = 18
): { revealed: string; done: boolean } {
  const [index, setIndex] = useState(() => (enabled ? 0 : text.length))

  useEffect(() => {
    if (!enabled || index >= text.length) return
    const id = setInterval(() => {
      setIndex((i) => {
        if (i + 1 >= text.length) clearInterval(id)
        return i + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [enabled, text.length, speed, index])

  return { revealed: text.slice(0, index), done: index >= text.length }
}

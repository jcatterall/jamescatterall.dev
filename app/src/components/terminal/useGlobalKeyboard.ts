"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

function isKonami(buf: string[]): boolean {
  if (buf.length < KONAMI.length) return false;
  const tail = buf.slice(-KONAMI.length);
  return KONAMI.every((code, i) => tail[i] === code);
}

export function useGlobalKeyboard(
  onToggle: () => void,
  onKonami: () => void,
  isOpen: boolean,
  konamiActive: boolean = false,
  onKonamiDismiss?: () => void,
): void {
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (konamiActive) {
        onKonamiDismiss?.();
        return;
      }

      const target = e.target as HTMLElement;
      const inInput = target.matches("input, textarea, [contenteditable]");

      bufferRef.current = [...bufferRef.current.slice(-9), e.code];

      if (isKonami(bufferRef.current)) {
        bufferRef.current = [];
        onKonami();
        return;
      }

      if (e.key === "/" && !inInput && !isOpen) {
        e.preventDefault();
        onToggle();
        return;
      }

      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onToggle();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, konamiActive, onToggle, onKonami, onKonamiDismiss]);
}

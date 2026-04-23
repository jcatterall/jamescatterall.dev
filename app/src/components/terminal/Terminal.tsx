"use client"

import { useEffect, useRef, useState } from "react"
import { useTerminal, type TerminalLine } from "./useTerminal"
import { useGlobalKeyboard } from "./useGlobalKeyboard"
import { useTypewriter } from "./useTypewriter"
import styles from "./Terminal.module.css"

type TerminalLineViewProps = {
  line: TerminalLine
  onAnimationDone: () => void
}

function TerminalLineView({ line, onAnimationDone }: TerminalLineViewProps) {
  const { revealed, done } = useTypewriter(line.text, line.animating)

  useEffect(() => {
    if (done && line.animating) onAnimationDone()
  }, [done, line.animating, onAnimationDone])

  const kindClass =
    line.kind === "input"
      ? styles.lineInput
      : line.kind === "error"
        ? styles.lineError
        : line.kind === "system"
          ? styles.lineSystem
          : styles.lineOutput

  return (
    <div className={`${styles.line} ${kindClass}`}>
      {line.kind === "input" ? (
        <>
          <span className={styles.linePrompt}>{">"}</span>
          {revealed}
        </>
      ) : (
        <span className={styles.lineIndent}>{revealed}</span>
      )}
    </div>
  )
}

export function Terminal() {
  const { state, dispatch, executeCommand } = useTerminal()
  const [konamiActive, setKonamiActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.isOpen) {
      inputRef.current?.focus()
    } else {
      document.body.focus()
    }
  }, [state.isOpen])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [state.lines])

  useGlobalKeyboard(
    () => dispatch({ type: "TOGGLE" }),
    () => setKonamiActive(true),
    state.isOpen
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = state.inputValue.trim()
    if (!cmd) return
    dispatch({ type: "SUBMIT_COMMAND" })
    executeCommand(cmd)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      dispatch({ type: "HISTORY_UP" })
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      dispatch({ type: "HISTORY_DOWN" })
    } else if (e.key === "Tab") {
      e.preventDefault()
      dispatch({ type: "TAB_COMPLETE" })
    }
  }

  return (
    <>
      {/* Dim backdrop — only when open */}
      <div className={`${styles.backdrop} ${state.isOpen ? styles.backdropVisible : ""}`} />

      {/* Closed-state indicator pill */}
      <div
        className={`${styles.triggerHint} ${state.isOpen ? styles.triggerHintHidden : ""}`}
        onClick={() => dispatch({ type: "TOGGLE" })}
        role="button"
        aria-label="Open terminal"
      >
        <span className={styles.triggerHintDot} />
        <span className={styles.triggerHintLabel}>TERMINAL</span>
        <span className={styles.triggerHintKey}>/</span>
      </div>

      {/* Terminal panel */}
      <div
        className={`${styles.panel} ${state.isOpen ? "" : styles.panelClosed}`}
        role="dialog"
        aria-label="Terminal"
        aria-modal="true"
      >
        {/* Header — traffic-light dots */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dotRed} />
            <span className={styles.dotDark} />
            <span className={styles.dotDark} />
            <span className={styles.title}>TERMINAL</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.sessionLabel}>jcatterall@portfolio</span>
            <button
              className={styles.closeBtn}
              onClick={() => dispatch({ type: "CLOSE" })}
              aria-label="Close terminal"
              tabIndex={state.isOpen ? 0 : -1}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Output */}
        <div className={styles.output} ref={outputRef} aria-live="polite">
          <div className={styles.sessionStart}>
            jcatterall@portfolio ~ %{" "}
            <span className={styles.sessionStartHighlight}>session started</span>
          </div>
          <div className={styles.sessionDivider} />
          {state.lines.map((line) => (
            <TerminalLineView
              key={line.id}
              line={line}
              onAnimationDone={() =>
                dispatch({ type: "MARK_ANIMATED", payload: line.id })
              }
            />
          ))}
        </div>

        {/* Input row */}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <span className={styles.inputPrompt} aria-hidden="true">{">"}</span>
            <input
              ref={inputRef}
              className={styles.input}
              value={state.inputValue}
              onChange={(e) =>
                dispatch({ type: "SET_INPUT", payload: e.target.value })
              }
              onKeyDown={handleInputKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-label="Terminal input"
              tabIndex={state.isOpen ? 0 : -1}
            />
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        </form>
      </div>

      {/* Konami burst */}
      {konamiActive && (
        <div
          className={styles.konamiBurst}
          onAnimationEnd={() => setKonamiActive(false)}
          aria-live="assertive"
          role="status"
        >
          {/* Scanline sweep */}
          <div className={styles.konamiScanlineWrap}>
            <div className={styles.konamiScanline} />
          </div>
          {/* Corner markers */}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
          {/* Content */}
          <div className={styles.konamiContent}>
            <div className={styles.konamiSequence}>↑ ↑ ↓ ↓ ← → ← → B A</div>
            <div className={styles.konamiHeadline}>ACHIEVEMENT<br />UNLOCKED</div>
            <div className={styles.konamiSub}>you found the konami code</div>
            <div className={styles.konamiDismiss}>press any key to dismiss</div>
          </div>
        </div>
      )}
    </>
  )
}

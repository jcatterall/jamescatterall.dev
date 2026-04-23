"use client"

import { useCallback, useReducer } from "react"
import { useRouter } from "next/navigation"
import {
  COMPLETABLE_COMMANDS,
  HELP_TEXT,
  LS_TEXT,
  ROUTE_MAP,
  parseCommand,
  unknownMessage,
} from "./commands"

export type TerminalLine = {
  id: string
  kind: "input" | "output" | "error" | "system"
  text: string
  animating: boolean
}

type TerminalState = {
  isOpen: boolean
  lines: TerminalLine[]
  inputValue: string
  history: string[]
  historyIndex: number
  tabCandidate: string | null
}

type TerminalAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SET_INPUT"; payload: string }
  | { type: "SUBMIT_COMMAND" }
  | { type: "APPEND_OUTPUT"; payload: TerminalLine }
  | { type: "CLEAR" }
  | { type: "HISTORY_UP" }
  | { type: "HISTORY_DOWN" }
  | { type: "TAB_COMPLETE" }
  | { type: "MARK_ANIMATED"; payload: string }

const initialState: TerminalState = {
  isOpen: false,
  lines: [],
  inputValue: "",
  history: [],
  historyIndex: -1,
  tabCandidate: null,
}

function makeLine(kind: TerminalLine["kind"], text: string): TerminalLine {
  return { id: crypto.randomUUID(), kind, text, animating: true }
}

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true }
    case "CLOSE":
      return { ...state, isOpen: false }
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen }

    case "SET_INPUT":
      return { ...state, inputValue: action.payload, tabCandidate: null }

    case "SUBMIT_COMMAND": {
      const cmd = state.inputValue.trim()
      if (!cmd) return state
      const newHistory =
        cmd === state.history.at(-1) ? state.history : [...state.history, cmd]
      return {
        ...state,
        inputValue: "",
        historyIndex: -1,
        tabCandidate: null,
        history: newHistory,
        lines: [
          ...state.lines,
          { id: crypto.randomUUID(), kind: "input", text: `> ${cmd}`, animating: false },
        ],
      }
    }

    case "APPEND_OUTPUT":
      return { ...state, lines: [...state.lines, action.payload] }

    case "CLEAR":
      return { ...state, lines: [] }

    case "HISTORY_UP": {
      if (state.history.length === 0) return state
      const nextIdx =
        state.historyIndex === -1
          ? state.history.length - 1
          : Math.max(0, state.historyIndex - 1)
      return {
        ...state,
        historyIndex: nextIdx,
        inputValue: state.history[nextIdx],
        tabCandidate: null,
      }
    }

    case "HISTORY_DOWN": {
      if (state.historyIndex === -1) return state
      const nextIdx = state.historyIndex + 1
      if (nextIdx >= state.history.length) {
        return { ...state, historyIndex: -1, inputValue: "", tabCandidate: null }
      }
      return {
        ...state,
        historyIndex: nextIdx,
        inputValue: state.history[nextIdx],
        tabCandidate: null,
      }
    }

    case "TAB_COMPLETE": {
      const input = state.inputValue.trimStart()
      if (!input) return state
      const base = state.tabCandidate ?? input
      const matches = COMPLETABLE_COMMANDS.filter((cmd) => cmd.startsWith(base))
      if (matches.length === 0) return state
      if (matches.length === 1) {
        return { ...state, inputValue: matches[0], tabCandidate: null }
      }
      const currentIdx = matches.indexOf(state.inputValue)
      const nextIdx = (currentIdx + 1) % matches.length
      return { ...state, inputValue: matches[nextIdx], tabCandidate: base }
    }

    case "MARK_ANIMATED":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.payload ? { ...l, animating: false } : l
        ),
      }

    default:
      return state
  }
}

export function useTerminal() {
  const [state, dispatch] = useReducer(terminalReducer, initialState)
  const router = useRouter()

  const executeCommand = useCallback(
    (raw: string) => {
      const parsed = parseCommand(raw)

      switch (parsed.kind) {
        case "help":
          HELP_TEXT.forEach((text) =>
            dispatch({ type: "APPEND_OUTPUT", payload: makeLine("output", text) })
          )
          break

        case "ls":
          LS_TEXT.forEach((text) =>
            dispatch({ type: "APPEND_OUTPUT", payload: makeLine("output", text) })
          )
          break

        case "clear":
          dispatch({ type: "CLEAR" })
          break

        case "goto": {
          const target = parsed.args[0] ?? ""
          const path = ROUTE_MAP[target]
          if (!path) {
            dispatch({
              type: "APPEND_OUTPUT",
              payload: makeLine(
                "error",
                `unknown destination: "${target}" — try \`ls\` to see pages.`
              ),
            })
            break
          }
          dispatch({
            type: "APPEND_OUTPUT",
            payload: makeLine("system", `navigating to ${path}...`),
          })
          router.push(path)
          break
        }

        case "unknown":
          dispatch({
            type: "APPEND_OUTPUT",
            payload: makeLine("error", unknownMessage(parsed.raw.trim().split(/\s+/)[0])),
          })
          break
      }
    },
    [router]
  )

  return { state, dispatch, executeCommand }
}

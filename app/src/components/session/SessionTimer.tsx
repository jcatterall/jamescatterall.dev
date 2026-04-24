"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { TimerArea } from "./TimerArea";
import { Receipt } from "./Receipt";
import styles from "./SessionTimer.module.css";

/* ── Types ── */

export type Phase = "idle" | "focus" | "short_break" | "long_break";

export type Block = {
  phase: Exclude<Phase, "idle">;
  startedAt: number;
  endedAt: number;
  completed: boolean;
};

export type Settings = {
  focusDuration: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  autoAdvance: boolean;
};

export type TimerState = {
  phase: Phase;
  sessionCount: number;
  blockCount: number;
  remaining: number;
  running: boolean;
  blocks: Block[];
  settings: Settings;
};

/* ── Helpers ── */

const LS_KEY = "session-timer-v1";

const DEFAULT_SETTINGS: Settings = {
  focusDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoAdvance: false,
};

export const toSec = (min: number) => min * 60;

function makeDefault(): TimerState {
  return {
    phase: "idle",
    sessionCount: 0,
    blockCount: 0,
    remaining: toSec(DEFAULT_SETTINGS.focusDuration),
    running: false,
    blocks: [],
    settings: { ...DEFAULT_SETTINGS },
  };
}

function loadState(): TimerState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as TimerState) : null;
  } catch {
    return null;
  }
}

function saveState(s: TimerState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch {}
}

function nextPhase(
  current: Phase,
  sessionCount: number,
  interval: number,
): Exclude<Phase, "idle"> {
  if (current === "focus") {
    return sessionCount % interval === 0 ? "long_break" : "short_break";
  }
  return "focus";
}

export function durationForPhase(phase: Phase, settings: Settings): number {
  if (phase === "focus") return toSec(settings.focusDuration);
  if (phase === "short_break") return toSec(settings.shortBreak);
  if (phase === "long_break") return toSec(settings.longBreak);
  return toSec(settings.focusDuration);
}

/* ── Component ── */

export function SessionTimer() {
  const [st, setSt] = useState<TimerState>(() => loadState() ?? makeDefault());
  const [showReceipt, setShowReceipt] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [confirm, setConfirm] = useState<"reset" | "skip" | "new" | null>(null);
  const [notifStatus, setNotifStatus] =
    useState<NotificationPermission>("default");
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [phaseKey, setPhaseKey] = useState(0);

  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Persist on every state change
  useEffect(() => {
    saveState(st);
  }, [st]);

  // Sync notification permission
  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setNotifStatus(Notification.permission);
    }
  }, []);

  // beforeunload warning
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (st.running || (st.blocks.length > 0 && st.phase !== "idle")) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [st.running, st.blocks.length, st.phase]);

  const fireNotif = useCallback((msg: string) => {
    if (typeof Notification === "undefined") {
      setNotifMsg(msg);
      return;
    }
    if (
      document.visibilityState === "visible" ||
      Notification.permission !== "granted"
    ) {
      setNotifMsg(msg);
    } else {
      new Notification("Session", { body: msg, icon: "/favicon.ico" });
    }
  }, []);

  // Timer tick
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!st.running) return;

    intervalRef.current = setInterval(() => {
      setSt((prev) => {
        if (!prev.running || prev.remaining <= 0) return prev;
        const next = prev.remaining - 1;
        if (next > 0) return { ...prev, remaining: next };

        // Block complete
        const block: Block = {
          phase: prev.phase as Exclude<Phase, "idle">,
          startedAt:
            Date.now() - durationForPhase(prev.phase, prev.settings) * 1000,
          endedAt: Date.now(),
          completed: true,
        };
        const newBlocks = [...prev.blocks, block];
        const newSessionCount =
          prev.phase === "focus" ? prev.sessionCount + 1 : prev.sessionCount;
        const np = nextPhase(
          prev.phase,
          newSessionCount,
          prev.settings.longBreakInterval,
        );
        const msg =
          prev.phase === "focus"
            ? `Session ${newSessionCount} complete — time for a break`
            : "Break over — back to work";

        setPhaseKey((k) => k + 1);
        // Schedule notification outside state update
        setTimeout(() => fireNotif(msg), 0);

        if (prev.settings.autoAdvance) {
          return {
            ...prev,
            phase: np,
            remaining: durationForPhase(np, prev.settings),
            running: true,
            sessionCount: newSessionCount,
            blockCount: prev.blockCount + 1,
            blocks: newBlocks,
          };
        }
        return {
          ...prev,
          phase: "idle",
          remaining: durationForPhase("focus", prev.settings),
          running: false,
          sessionCount: newSessionCount,
          blockCount: prev.blockCount + 1,
          blocks: newBlocks,
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.running]);

  const requestNotif = async () => {
    if (typeof Notification === "undefined") return;
    const perm = await Notification.requestPermission();
    setNotifStatus(perm);
  };

  const toggle = useCallback(() => {
    setSt((p) => {
      if (p.phase === "idle") {
        // First start — request notification permission lazily
        if (
          typeof Notification !== "undefined" &&
          Notification.permission === "default"
        ) {
          void Notification.requestPermission().then(setNotifStatus);
        }
        return {
          ...p,
          phase: "focus",
          remaining: toSec(p.settings.focusDuration),
          running: true,
        };
      }
      return { ...p, running: !p.running };
    });
  }, []);

  const doublePress = useCallback(
    (action: () => void, key: "reset" | "skip" | "new") => {
      if (confirm === key) {
        if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
        setConfirm(null);
        action();
      } else {
        setConfirm(key);
        if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
        confirmTimerRef.current = setTimeout(() => setConfirm(null), 2000);
      }
    },
    [confirm],
  );

  const doReset = useCallback(() => {
    setSt((p) => ({
      ...p,
      running: false,
      remaining: durationForPhase(
        p.phase === "idle" ? "focus" : p.phase,
        p.settings,
      ),
    }));
  }, []);

  const doSkip = useCallback(() => {
    setSt((p) => {
      const newSes = p.phase === "focus" ? p.sessionCount + 1 : p.sessionCount;
      const np = nextPhase(p.phase, newSes, p.settings.longBreakInterval);
      setPhaseKey((k) => k + 1);
      return {
        ...p,
        running: false,
        phase: np,
        sessionCount: newSes,
        remaining: durationForPhase(np, p.settings),
      };
    });
  }, []);

  const doNew = useCallback(() => {
    setShowReceipt(false);
    setSt(makeDefault());
  }, []);

  const jumpToPhase = useCallback((phase: Phase) => {
    setPhaseKey((k) => k + 1);
    setSt((p) => ({
      ...p,
      running: false,
      phase,
      remaining: durationForPhase(phase, p.settings),
    }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      switch (e.key) {
        case " ":
          e.preventDefault();
          toggle();
          break;
        case "?":
          setShowLegend((v) => !v);
          break;
        case "r":
        case "R":
          doublePress(doReset, "reset");
          break;
        case "s":
        case "S":
          doublePress(doSkip, "skip");
          break;
        case "n":
        case "N":
          doublePress(() => setShowReceipt(true), "new");
          break;
        case "1":
          jumpToPhase("focus");
          break;
        case "2":
          jumpToPhase("short_break");
          break;
        case "3":
          jumpToPhase("long_break");
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle, doublePress, doReset, doSkip, jumpToPhase]);

  return (
    <div className={styles.layout}>
      <Sidebar
        settings={st.settings}
        onSettingsChange={(fn) =>
          setSt((p) => ({ ...p, settings: fn(p.settings) }))
        }
        blocks={st.blocks}
        onViewReceipt={() => setShowReceipt(true)}
        notifStatus={notifStatus}
        onRequestNotif={requestNotif}
      />
      <TimerArea
        phase={st.phase}
        remaining={st.remaining}
        running={st.running}
        sessionCount={st.sessionCount}
        settings={st.settings}
        phaseKey={phaseKey}
        confirm={confirm}
        notifMsg={notifMsg}
        showLegend={showLegend}
        onToggle={toggle}
        onReset={() => doublePress(doReset, "reset")}
        onSkip={() => doublePress(doSkip, "skip")}
        onDismissNotif={() => setNotifMsg(null)}
        onSetShowLegend={setShowLegend}
      />
      {showReceipt && (
        <Receipt
          blocks={st.blocks}
          onClose={() => setShowReceipt(false)}
          onNew={doNew}
        />
      )}
    </div>
  );
}

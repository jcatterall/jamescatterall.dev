"use client";

import type { Phase, Settings } from "./SessionTimer";
import { durationForPhase } from "./SessionTimer";
import { KeyboardLegend } from "../KeyboardLegend";
import styles from "./TimerArea.module.css";

/* ── Helpers ── */

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

/* ── Phase metadata ── */

type PhaseMeta = {
  label: string;
  colorVar: string;
  bgVar: string;
};

const PHASE_META: Record<Phase, PhaseMeta> = {
  idle: {
    label: "READY",
    colorVar: "var(--nd-text-secondary)",
    bgVar: "var(--nd-black)",
  },
  focus: {
    label: "FOCUS",
    colorVar: "var(--nd-success)",
    bgVar: "var(--nd-phase-focus-bg)",
  },
  short_break: {
    label: "SHORT BREAK",
    colorVar: "var(--nd-interactive)",
    bgVar: "var(--nd-phase-short-break-bg)",
  },
  long_break: {
    label: "LONG BREAK",
    colorVar: "var(--nd-warning)",
    bgVar: "var(--nd-phase-long-break-bg)",
  },
};

/* ── Keyboard legend ── */

const KEY_LEGEND: [string, string][] = [
  ["SPACE", "Start / Pause"],
  ["R", "Reset block (×2)"],
  ["S", "Skip block (×2)"],
  ["N", "New session (×2)"],
  ["1", "Jump → Focus"],
  ["2", "Jump → Short break"],
  ["3", "Jump → Long break"],
  ["?", "Toggle this legend"],
];

/* ── NotifBanner ── */

function NotifBanner({
  message,
  onDismiss,
}: {
  message: string | null;
  onDismiss: () => void;
}) {
  if (!message) return null;
  return (
    <div className={styles.notifBanner}>
      <span className={styles.notifBannerDot} />
      <span className={styles.notifBannerMsg}>{message}</span>
      <button
        className={styles.notifBannerDismiss}
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}

/* ── Session pips ── */

function SessionPips({ count, interval }: { count: number; interval: number }) {
  const filled = count % interval;
  return (
    <div className={styles.pips}>
      {Array.from({ length: interval }, (_, i) => (
        <div
          key={i}
          className={styles.pip}
          data-filled={i < filled ? "" : undefined}
        />
      ))}
      <span className={styles.pipCount}>
        {filled} / {interval}
      </span>
    </div>
  );
}

/* ── Props ── */

type Props = {
  phase: Phase;
  remaining: number;
  running: boolean;
  sessionCount: number;
  settings: Settings;
  phaseKey: number;
  confirm: "reset" | "skip" | "new" | null;
  notifMsg: string | null;
  showLegend: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
  onDismissNotif: () => void;
  onSetShowLegend: (v: boolean) => void;
};

/* ── Component ── */

export function TimerArea({
  phase,
  remaining,
  running,
  sessionCount,
  settings,
  phaseKey,
  confirm,
  notifMsg,
  showLegend,
  onToggle,
  onReset,
  onSkip,
  onDismissNotif,
  onSetShowLegend,
}: Props) {
  const meta = PHASE_META[phase];
  const total = durationForPhase(phase, settings);
  const progress = total > 0 ? 1 - remaining / total : 0;
  const time = fmt(remaining);

  return (
    <div className={styles.area} style={{ background: meta.bgVar }}>
      <NotifBanner message={notifMsg} onDismiss={onDismissNotif} />

      {/* Progress line */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progress * 100}%`,
            background: meta.colorVar,
          }}
        />
      </div>

      {/* Main content */}
      <div className={styles.center}>
        {/* Phase label */}
        <div
          key={`label-${phaseKey}`}
          className={styles.phaseLabel}
          style={{ color: meta.colorVar }}
        >
          {meta.label}
        </div>

        {/* Countdown */}
        <div
          className={styles.countdown}
          style={{ opacity: running || phase === "idle" ? 1 : 0.5 }}
        >
          <span className={styles.countdownMinutes}>{time.slice(0, 2)}</span>
          <span className={styles.countdownSeconds}>{time.slice(3, 5)}</span>
        </div>

        {/* Session pips */}
        <SessionPips
          count={sessionCount}
          interval={settings.longBreakInterval}
        />

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.btnSecondary}
            data-confirm={confirm === "reset" ? "" : undefined}
            onClick={onReset}
            title="Reset (R)"
            aria-label="Reset block"
            style={{
              color: confirm === "reset" ? "var(--nd-accent)" : undefined,
            }}
          >
            ↺
          </button>
          <button
            className={styles.btnPrimary}
            data-running={running ? "" : undefined}
            onClick={onToggle}
            title="Start/Pause (Space)"
            aria-label={running ? "Pause" : "Start"}
          >
            {running ? "⏸" : "▶"}
          </button>
          <button
            className={styles.btnSecondary}
            data-confirm={confirm === "skip" ? "" : undefined}
            onClick={onSkip}
            title="Skip (S)"
            aria-label="Skip block"
            style={{
              color: confirm === "skip" ? "var(--nd-warning)" : undefined,
            }}
          >
            ⏭
          </button>
        </div>

        {/* Fixed-height slot — prevents countdown from shifting when hints appear */}
        <div className={styles.hintSlot}>
          {confirm ? (
            <div className={styles.confirmHint}>
              PRESS {confirm.toUpperCase()} AGAIN TO CONFIRM
            </div>
          ) : phase === "idle" && !running ? (
            <div className={styles.idleHint}>PRESS SPACE TO START</div>
          ) : null}
        </div>
      </div>

      {/* Legend */}
      <KeyboardLegend
        entries={KEY_LEGEND}
        open={showLegend}
        onToggle={() => onSetShowLegend(!showLegend)}
      />
    </div>
  );
}

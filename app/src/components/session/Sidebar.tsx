"use client";

import type { Block, Settings } from "./SessionTimer";
import { Input } from "@/design-system";
import styles from "./Sidebar.module.css";

type Props = {
  settings: Settings;
  onSettingsChange: (fn: (s: Settings) => Settings) => void;
  blocks: Block[];
  onViewReceipt: () => void;
  notifStatus: NotificationPermission;
  onRequestNotif: () => void;
};

function NumField({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.fieldRow}>
        <Input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) =>
            onChange(Math.max(min, Math.min(max, Number(e.target.value))))
          }
        />
        <span className={styles.fieldUnit}>{unit}</span>
      </div>
    </div>
  );
}

const NOTIF_COLOR: Record<NotificationPermission, string> = {
  granted: "var(--nd-success)",
  denied: "var(--nd-accent)",
  default: "var(--nd-text-secondary)",
};

const NOTIF_LABEL: Record<NotificationPermission, string> = {
  granted: "ENABLED",
  denied: "DENIED",
  default: "NOT SET",
};

export function Sidebar({
  settings,
  onSettingsChange,
  blocks,
  onViewReceipt,
  notifStatus,
  onRequestNotif,
}: Props) {
  const set = (k: keyof Settings, v: Settings[keyof Settings]) =>
    onSettingsChange((s) => ({ ...s, [k]: v }));

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.prompt}>
          <span className={styles.promptCaret}>&gt;</span>
          <span className={styles.promptPath}>./session</span>
        </div>
        <div className={styles.title}>Session</div>
        <div className={styles.subtitle}>
          Keyboard-first Pomodoro timer with session receipts.
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Durations */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>DURATIONS</span>
          <NumField
            label="FOCUS"
            value={settings.focusDuration}
            min={1}
            max={90}
            unit="min"
            onChange={(v) => set("focusDuration", v)}
          />
          <NumField
            label="SHORT BREAK"
            value={settings.shortBreak}
            min={1}
            max={30}
            unit="min"
            onChange={(v) => set("shortBreak", v)}
          />
          <NumField
            label="LONG BREAK"
            value={settings.longBreak}
            min={1}
            max={60}
            unit="min"
            onChange={(v) => set("longBreak", v)}
          />
        </div>

        {/* Sequence */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>SEQUENCE</span>
          <NumField
            label="LONG BREAK EVERY"
            value={settings.longBreakInterval}
            min={2}
            max={10}
            unit="sessions"
            onChange={(v) => set("longBreakInterval", v)}
          />
        </div>

        {/* Auto-advance */}
        <div className={styles.toggleRow}>
          <div>
            <div className={styles.toggleLabel}>AUTO-ADVANCE</div>
            <div className={styles.toggleDesc}>Skip phase transitions</div>
          </div>
          <button
            role="switch"
            aria-checked={settings.autoAdvance}
            onClick={() => set("autoAdvance", !settings.autoAdvance)}
            className={styles.toggle}
            data-checked={settings.autoAdvance ? "" : undefined}
            aria-label="Toggle auto-advance"
          >
            <span className={styles.toggleThumb} />
          </button>
        </div>

        {/* Notifications */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>NOTIFICATIONS</span>
          <div className={styles.notifRow}>
            <div className={styles.notifStatus}>
              <span
                className={styles.notifDot}
                style={{
                  background: NOTIF_COLOR[notifStatus],
                  animationPlayState:
                    notifStatus === "granted" ? "running" : "paused",
                }}
              />
              <span
                className={styles.notifLabel}
                style={{ color: NOTIF_COLOR[notifStatus] }}
              >
                {NOTIF_LABEL[notifStatus]}
              </span>
            </div>
            {notifStatus === "default" && (
              <button className={styles.notifBtn} onClick={onRequestNotif}>
                ENABLE
              </button>
            )}
          </div>
          {notifStatus === "denied" && (
            <p className={styles.notifDenied}>
              Notifications blocked. In-page banner will be used instead.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button
          className={styles.receiptBtn}
          data-active={blocks.length > 0 ? "" : undefined}
          onClick={onViewReceipt}
        >
          {blocks.length > 0
            ? `VIEW RECEIPT (${blocks.length} BLOCKS)`
            : "NO BLOCKS YET"}
        </button>
      </div>
    </aside>
  );
}

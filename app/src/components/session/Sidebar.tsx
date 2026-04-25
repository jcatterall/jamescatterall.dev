"use client";

import type { Block, Settings } from "./SessionTimer";
import { Input, SectionLabel, SectionPrompt } from "@/design-system";
import { SidebarShell } from "../SidebarShell";
import { Toggle } from "../Toggle";
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
    <SidebarShell
      header={
        <>
          <SectionPrompt path="./session" />
          <div className={styles.title}>Session</div>
          <div className={styles.subtitle}>
            Keyboard-first Pomodoro timer with session receipts.
          </div>
        </>
      }
      footer={
        <button
          type="button"
          className={styles.receiptBtn}
          data-active={blocks.length > 0 ? "" : undefined}
          onClick={onViewReceipt}
        >
          {blocks.length > 0
            ? `VIEW RECEIPT (${blocks.length} BLOCKS)`
            : "NO BLOCKS YET"}
        </button>
      }
    >
      {/* Durations */}
      <div className={styles.section}>
        <SectionLabel>DURATIONS</SectionLabel>
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
        <SectionLabel>SEQUENCE</SectionLabel>
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
      <Toggle
        value={settings.autoAdvance}
        onChange={(v) => set("autoAdvance", v)}
        label="AUTO-ADVANCE"
        description="Skip phase transitions"
      />

      {/* Notifications */}
      <div className={styles.section}>
        <SectionLabel>NOTIFICATIONS</SectionLabel>
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
            <button type="button" className={styles.notifBtn} onClick={onRequestNotif}>
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
    </SidebarShell>
  );
}

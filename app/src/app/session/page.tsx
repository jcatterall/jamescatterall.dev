import { Suspense } from "react";
import SessionLoading from "./loading";
import SessionPageClient from "./SessionPageClient";
import { PageNav } from "@/components/PageNav";
import styles from "./page.module.css";

export const metadata = {
  title: "Session",
  description:
    "Keyboard-first Pomodoro timer with desktop notifications and a dot-matrix session receipt.",
};

export default function SessionPage() {
  return (
    <main className={styles.page}>
      <PageNav slug="session" label="Session" />
      <Suspense fallback={<SessionLoading />}>
        <SessionPageClient />
      </Suspense>
    </main>
  );
}

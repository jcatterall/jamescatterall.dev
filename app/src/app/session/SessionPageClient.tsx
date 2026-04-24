"use client";

import dynamic from "next/dynamic";
import SessionLoading from "./loading";

const SessionTimer = dynamic(
  () => import("@/components/session/SessionTimer").then((m) => m.SessionTimer),
  { ssr: false, loading: () => <SessionLoading /> },
);

export default function SessionPageClient() {
  return <SessionTimer />;
}

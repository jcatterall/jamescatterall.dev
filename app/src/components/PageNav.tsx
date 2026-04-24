"use client"

import Link from "next/link"
import styles from "./PageNav.module.css"

type Props = {
  slug: string
  label: string
  tag?: string
}

export function PageNav({ slug, label, tag = "BROWSER-ONLY · NO SERVER" }: Props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/" className={styles.back}>← BACK</Link>
        <div className={styles.breadcrumb}>
          <span className={styles.caret}>{">"}</span>
          <span className={styles.user}>jcatterall</span>
          <span className={styles.sep}>/</span>
          <span className={styles.page}>{slug}</span>
        </div>
      </div>
      <span className={styles.tag}>{tag}</span>
    </nav>
  )
}

import styles from "./SidebarShell.module.css"

type Props = {
  width?: string
  header: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}

export function SidebarShell({ width, header, footer, children }: Props) {
  return (
    <aside
      className={styles.sidebar}
      style={width ? ({ "--shell-width": width } as React.CSSProperties) : undefined}
    >
      <div className={styles.header}>{header}</div>
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  )
}

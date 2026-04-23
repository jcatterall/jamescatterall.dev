import styles from "./ContactLink.module.css"

type ContactLinkProps = {
  icon: string
  value: string
  href: string
  external?: boolean
}

export function ContactLink({ icon, value, href, external = false }: ContactLinkProps) {
  return (
    <a
      href={href}
      className={styles.link}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.value}>{value}</span>
      <span className={styles.arrow}>↗</span>
    </a>
  )
}

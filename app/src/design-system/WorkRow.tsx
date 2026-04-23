import styles from "./WorkRow.module.css"
import { Tag } from "./Tag"

type WorkRowProps = {
  title: string
  desc: string
  tags: string[]
  year: string
  href: string
}

export function WorkRow({ title, desc, tags, year, href }: WorkRowProps) {
  return (
    <a href={href} className={styles.row}>
      <div className={styles.accent} />
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.tagRow}>
          {tags.map((t) => (
            <Tag key={t}>[{t}]</Tag>
          ))}
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.year}>{year}</span>
        <span className={styles.arrow}>↗</span>
      </div>
    </a>
  )
}

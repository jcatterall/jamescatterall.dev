import styles from "./SectionPrompt.module.css"

type SectionPromptProps = {
  path: string
}

export function SectionPrompt({ path }: SectionPromptProps) {
  return (
    <div className={styles.prompt}>
      <span className={styles.caret}>{">"}</span>
      <span className={styles.path}>{path}</span>
    </div>
  )
}

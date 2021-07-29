import styles from "./Center.module.css";

export default function Center({ children }) {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.childCenter}>{children}</div>
    </div>
  );
}

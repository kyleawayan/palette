import styles from "../styles/center.module.css";

export default function Center({ children }) {
  return (
    <div className={styles.centerContainer}>
      <div className={styles.childCenter}>{children}</div>
    </div>
  );
}

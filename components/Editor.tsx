import styles from "../styles/editor.module.css";
import AlbumArt from "./AlbumArt";

export default function Editor() {
  return (
    <div className={styles.parent}>
      <div className={styles.child}>
        <AlbumArt />
      </div>
      <div className={styles.child}>test2</div>
    </div>
  );
}

import styles from "../styles/albumArt.module.css";

export default function AlbumArt() {
  return (
    <div className={styles.palette}>
      <img src="frame.png" className={styles.frame}></img>
      <img
        src="http://cdn.cnn.com/cnnnext/dam/assets/181010131059-australia-best-beaches-cossies-beach-cocos3.jpg"
        className={styles.picture}
      ></img>
      <div className={styles.caption}>
        <span className={styles.captionPink}>IU</span>{" "}
        <span className={styles.captionBlue}>Palette</span>
      </div>
    </div>
  );
}

import styles from "../styles/editor.module.css";
import AlbumArt from "./AlbumArt";
import * as domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useRef } from "react";

export default function Editor() {
  const palette = useRef(null);

  const saveImage = () => {
    domtoimage.toBlob(palette.current).then(function (blob) {
      console.log("save?");
      saveAs(blob, "my-node.png");
    });
  };

  return (
    <div className={styles.parent}>
      <div
        className={styles.child}
        ref={palette}
        style={{
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }}
      >
        <AlbumArt />
      </div>
      <div className={styles.child} style={{ marginTop: "25px" }}>
        <button onClick={saveImage}>download</button>
      </div>
    </div>
  );
}

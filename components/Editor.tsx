import styles from "../styles/editor.module.css";
import AlbumArt from "./AlbumArt";
import * as domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useRef } from "react";
import { isSafari } from "react-device-detect";

export default function Editor() {
  const palette = useRef(null);

  const saveImage = () => {
    // https://github.com/tsayen/dom-to-image/issues/69#issuecomment-486146688
    const scale = 640 / palette.current.offsetWidth;
    domtoimage
      .toBlob(palette.current, {
        height: palette.current.offsetHeight * scale,
        width: palette.current.offsetWidth * scale,
        style: {
          transform: "scale(" + scale + ")",
          transformOrigin: "top left",
          width: palette.current.offsetWidth + "px",
          height: palette.current.offsetHeight + "px",
        },
      })
      .then(function (blob) {
        saveAs(blob, "palette.png");
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
          height: "50vh",
          width: "50vh",
        }}
      >
        <AlbumArt />
      </div>
      <div className={styles.child} style={{ marginTop: "25px" }}>
        <button onClick={saveImage}>download</button>
        {isSafari && (
          <div className={styles.warning}>
            With Safari, you may need to download twice before the image is
            rendered correctly.
          </div>
        )}
      </div>
    </div>
  );
}

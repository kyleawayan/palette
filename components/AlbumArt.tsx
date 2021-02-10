import { useState, useCallback, useEffect } from "react";
import styles from "../styles/albumArt.module.css";
import { useDropzone } from "react-dropzone";
import Center from "./Center";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";
import "../utils/i18n";

async function getResolution(binaryStr): Promise<number[]> {
  return new Promise<number[]>((resolve, reject) => {
    const img = new Image();
    img.src = binaryStr;
    img.onload = function () {
      resolve([img.width, img.height]);
    };
  });
}

export default function AlbumArt() {
  const [imageBase64, setImageBase64] = useState(null);
  const [imageStyle, setImageStyle] = useState({});
  const router = useRouter();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(router.locale);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        setImageBase64(binaryStr);
        getResolution(binaryStr).then((res) => {
          if (res[0] > res[1]) {
            // width > height
            setImageStyle({
              height: "100%",
            });
          } else if (res[0] < res[1]) {
            // width < height
            setImageStyle({
              width: "100%",
            });
          } else {
            // square aspect ratio
            setImageStyle({
              height: "100%",
              width: "100%",
            });
          }
        });
      };
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className={styles.palette}>
      <img src="frame.png" className={styles.frame}></img>
      {imageBase64 && (
        <ScrollContainer
          className={styles.pictureContainer}
          hideScrollbars={false}
        >
          <img
            src={imageBase64}
            className={styles.picture}
            style={imageStyle}
          />
        </ScrollContainer>
      )}
      {!imageBase64 && (
        <div {...getRootProps()} className={styles.upload}>
          <input {...getInputProps()} />

          <Center>
            {isDragActive ? (
              <p>{t("Drop Files (Hover)")}</p>
            ) : (
              <p>{t("Drop Files Here")}</p>
            )}
          </Center>
        </div>
      )}
      <div className={styles.captionContainer}>
        <div className={styles.caption}>
          <span className={styles.captionPink} contentEditable="true">
            {t("Click Me")}
          </span>{" "}
          <span className={styles.captionBlue} contentEditable="true">
            {t("Also Click Me")}
          </span>
        </div>
      </div>
    </div>
  );
}

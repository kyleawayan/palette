import { useState, useCallback, useEffect } from "react";
import styles from "../styles/albumArt.module.css";
import { useDropzone } from "react-dropzone";
import Center from "./Center";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import "../utils/i18n";

export default function AlbumArt() {
  const [imageBase64, setImageBase64] = useState(null);
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
        <div className={styles.pictureContainer}>
          <img src={imageBase64} className={styles.picture} />
        </div>
      )}
      <div {...getRootProps()} className={styles.upload}>
        <input {...getInputProps()} />
        {!imageBase64 && (
          <Center>
            {isDragActive ? (
              <p>{t("Drop Files (Hover)")}</p>
            ) : (
              <p>{t("Drop Files Here")}</p>
            )}
          </Center>
        )}
      </div>
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

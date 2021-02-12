import { useState, useCallback, useEffect, useRef } from "react";
import styles from "../styles/albumArt.module.css";
import { useDropzone } from "react-dropzone";
import Center from "./Center";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Cropper from "react-easy-crop";
import "../utils/i18n";

export default function AlbumArt() {
  const [imageBase64, setImageBase64] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const photoRef = useRef(null);

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

  const onMediaLoad = (data) => {
    setTimeout(() => {
      if (data.width < data.height) {
        // potrait photo
        const pictureInsideFrameWidth = photoRef.current.clientWidth;
        const scale = pictureInsideFrameWidth / data.width + 0.1; // give 0.1 margin of error so user doesn't drag image too far with blank space
        setZoom(scale);
      } else if (data.width > data.height) {
        // landscape photo
        const pictureInsideFrameHeight = photoRef.current.clientHeight;
        const scale = pictureInsideFrameHeight / data.height + 0.1;
        setZoom(scale);
      } else {
        // set a little zoomed in for square photos so blank space doesn't show
        setZoom(1.05);
      }
    }, 1);
    setShowGrid(true);
    setTimeout(() => {
      setShowGrid(false);
    }, 500);
  };

  return (
    <div className={styles.palette}>
      <img src="frame.png" className={styles.frame}></img>
      {imageBase64 && (
        <div className={styles.pictureContainer} ref={photoRef}>
          <Cropper
            image={imageBase64}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            showGrid={showGrid}
            maxZoom={5}
            style={{
              cropAreaStyle: {
                minWidth: "100%",
                minHeight: "100%",
                color: "transparent",
                border: 0,
              },
            }}
            onMediaLoaded={onMediaLoad}
            onInteractionStart={() => setShowGrid(true)}
            onInteractionEnd={() => setShowGrid(false)}
          />
        </div>
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

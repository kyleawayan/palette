import { useState, useCallback } from "react";
import styles from "../styles/albumArt.module.css";
import { useDropzone } from "react-dropzone";
import Center from "./Center";

export default function AlbumArt() {
  const [imageBase64, setImageBase64] = useState(null);

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
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </Center>
        )}
      </div>
      <div className={styles.captionContainer}>
        <div className={styles.caption}>
          <span className={styles.captionPink} contentEditable="true">
            Click me to edit.
          </span>{" "}
          <span className={styles.captionBlue} contentEditable="true">
            Also click me.
          </span>
        </div>
      </div>
    </div>
  );
}

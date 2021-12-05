import React, { useState, useEffect, useCallback } from "react";
import uploadIcon from "../../../assets/images/uploadPhoto.svg";

const UploadPhoto = ({ getData, data }) => {
  const [upload, setUpload] = useState(uploadIcon);
  const convertFileForImg = useCallback(() => {
    if (/\.(jpe?g|png|gif)$/i.test(data?.avatar?.name)) {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        (result) => {
          setUpload((upload) => result.target.result);
        },
        false
      );

      reader.readAsDataURL(data?.avatar);
    }
  }, [data?.avatar]);

  useEffect(() => {
    convertFileForImg();
  }, [data, convertFileForImg]);

  return (
    <section>
      <header className="muon-step-header">Upload your photo</header>
      <div className="muon-photo-upload">
        <input
          type="file"
          onChange={(e) => {
            getData(e);
            convertFileForImg();
          }}
          name="avatar"
          accept="image/*"
        />
        <img src={upload} alt="upload" />
      </div>
    </section>
  );
};

export default UploadPhoto;

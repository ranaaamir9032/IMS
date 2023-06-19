import React from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";


export default function UploadBtn(props) {
  
  const handleUpload = (result) => {
    props.setImage(result.secure_url);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "InventoryanagementSystem");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dwrvm0p0d/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log("image uploaded");
      handleUpload(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label
      for = "upload-btn"
        className="upload-img-btn"
        style={{
          padding: "12%",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <DriveFolderUploadIcon />
        Upload
      </label>
      <input
        id="upload-btn"
        type="file"
        hidden
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
}

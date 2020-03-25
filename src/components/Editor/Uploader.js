import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@material-ui/core/Button";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  height: 160,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 100,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const Uploader = ({ aid }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg",
    multiple: false,
    maxSize: 1048576 * 3,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const uploadFiles = async () => {
    let formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("articleFiles[]", file);
    }

    axios
      .post(
        `https://us-central1-rose-api.cloudfunctions.net/app/image/${aid}`,
        formData,
        config
      )
      .then(res => {
        setFiles([]);
        toast.success("Upload Successful !", {
          position: toast.POSITION.TOP_CENTER
        });
        //addPhoto(res.data.data);
      })
      .catch(error => {
        setFiles([]);
        toast.error("Upload Error ! ", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="preview" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <>
      <div>
        <ToastContainer />
        <div
          {...getRootProps({
            className: "drop-zone"
          })}
        >
          <input {...getInputProps()} />
          <div>
            <h4>Drop files here to upload</h4>
          </div>
          <div style={thumbsContainer}>{thumbs}</div>
        </div>
      </div>

      <div className="flex items-center flex-col leading-tight p-2 md:p-4">
        <Button
          variant="contained"
          type="button"
          color="primary"
          onClick={uploadFiles}
        >
          Upload
        </Button>
      </div>
    </>
  );
};
export default Uploader;

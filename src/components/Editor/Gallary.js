import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const deleteImage = async (accountId, imageName) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const bizId = "HPxJZRUE37RO5NSRVMt3GiAB9i02";

  axios
    .delete(
      "https://us-central1-rose-api.cloudfunctions.net/app/image/",
      { data: { accountId, bizId, imageName } },
      config
    )
    .then(res => {
      toast.success("Delete Successful !", {
        position: toast.POSITION.TOP_CENTER
      });
      //addPhoto(res.data.data);
    })
    .catch(error => {
      toast.error("Delete Error ! ", {
        position: toast.POSITION.TOP_CENTER
      });
    });
};

const Gallary = ({ aid, img }) => {
  return (
    <div>
      <ToastContainer />
      <img
        src={`https://firebasestorage.googleapis.com/v0/b/rose-api.appspot.com/o/${aid}%2F${img}?alt=media`}
        width="210"
      />{" "}
      <Button
        variant="contained"
        color="secondary"
        onClick={() => deleteImage(aid, img)}
      >
        delete image
      </Button>
    </div>
  );
};

export default Gallary;

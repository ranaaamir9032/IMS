import React, { useState } from "react";
import "./addComplaint.css";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import UploadBtn from "../../../../Components/Buttons/upload";
import img from "../../../../assets/images/placeholder.jpg";
import { useDispatch } from "react-redux";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";
import { addNewComplaint } from "../../../../Redux/Complaints/complaintActions";



export default function AddComplaint() {
  const currentUserId = JSON.parse(outLocal("user")).id;
  const dispatch = useDispatch();

  const [complaint, setComplaint] = useState({
      description: "",
      status: "Pending",
      user: currentUserId,
    }),
    [picture, setPicture] = useState('');

  const save = () => {
    dispatch(addNewComplaint({ ...complaint, picture }));
  };

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Complaint</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick = {save} />
        </div>
      </div>
      <form action="">
        <div className="data-field border-top">
          <span className="form-left">Description</span>
          <textarea
            type="text"
            rows="8"
            placeholder="Description"
            className="bio-field"
            onChange={(e) =>
              setComplaint({
                ...complaint,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="data-field">
          <span className="form-left">Image</span>
          <div className="image-upload-container">
            <div className="image-container">
            <img src={picture || img} alt="image" />
            </div>
            <UploadBtn setImage = {setPicture} />
          </div>
        </div>
      </form>
    </div>
  );
}

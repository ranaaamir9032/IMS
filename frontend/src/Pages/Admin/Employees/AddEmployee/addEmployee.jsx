import React, { useState } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import SaveBtn from "../../../../Components/Buttons/save";
import CancelBtn from "../../../../Components/Buttons/cancel";
import UploadBtn from "../../../../Components/Buttons/upload";
import img from "../../../../assets/images/placeholder.jpg";
import { TextField } from "@mui/material";
import SelectField from "../../../../Components/Select/select";
import { useNavigate } from "react-router-dom";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";
import { useDispatch } from "react-redux";
import { createUser } from "../../../../Redux/Users/userActions";





export default function AddEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //to get current user's organization
  const organizationID = JSON.parse(outLocal("user")).organization.id;


  const [employee, setEmployee] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    role: 3,
    organization: organizationID,
  }),[picture, setPicture] = useState('');

  const empDetails = () => {
    dispatch(createUser({...employee, picture}))
    navigate("/employees");
  };

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Employee</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={empDetails} />
        </div>
      </div>
      <form action="">
        <div className="img-upload">
          <div className="logo-upload">
          <img src={picture || img} alt="image" />
          </div>
          <div className="heading">
            <span className="div-heading">Admin's Picture</span>
            <p>Upload a high res picture with clear face</p>
          </div>
          <UploadBtn setImage={setPicture} />
        </div>
        <div className="data-field">
          <span className="form-left">Name</span>
          <TextField
            size="small"
            placeholder="Full Name"
            style={{ width: "32%" }}
            onChange={(e) =>
              setEmployee({
                ...employee,
                username: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Contact Number</span>
          <TextField
            size="small"
            placeholder="Contact Number"
            style={{ width: "32%" }}
            onChange={(e) =>
              setEmployee({
                ...employee,
                contact: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Department</span>
          <SelectField placeHolder={"Select Department"} />
        </div>
        <span className="div-heading">Credentials</span>
        <p>
          Below are the one time created credentials. These will be sent to the
          mentioned emails.
        </p>
        <div className="data-field no-border">
          <span className="form-left">Email Address</span>
          <TextField
            size="small"
            placeholder="Email Address"
            style={{ width: "32%" }}
            onChange={(e) =>
              setEmployee({
                ...employee,
                email: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Password</span>
          <TextField
            size="small"
            placeholder="Password"
            style={{ width: "32%" }}
            onChange={(e) =>
              setEmployee({
                ...employee,
                password: e.target.value,
              })
            }
          ></TextField>
        </div>
      </form>
    </div>
  );
}

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SelectField from "../../../../Components/Select/select";
import "./addAdmin.css";
import img from "../../../../assets/images/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import UploadBtn from "../../../../Components/Buttons/upload";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrganizations } from "../../../../Redux/Organizations/orgActions";
import { createUser } from "../../../../Redux/Users/userActions";

export default function AddAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.organizationHandler.organizationData
  );

  const [admin, setAdmin] = useState({
      username: "",
      organization: 0,
      contact: "",
      email: "",
      password: "",
      role: 2,
    }),
    [picture, setPicture] = useState("");


  const saveAdmin = (e) => {
    e.preventDefault();
    dispatch(createUser({ ...admin, picture }));
    navigate("/admins");
  };

  useEffect(() => {
    if (!data) {
      dispatch(getAllOrganizations());
    }
  });

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Admin</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn form={"add-admin-form"} />
        </div>
      </div>
      <form className="new-adm-form" id="add-admin-form" onSubmit={saveAdmin}>
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
        <div className="name data-field">
          <span className="form-left">Name</span>
          <TextField
            required={true}
            size="small"
            placeholder="Name of the Admin"
            style={{ width: "32%" }}
            onChange={(e) =>
              setAdmin({
                ...admin,
                username: e.target.value,
              })
            }
          ></TextField>
        </div>

        <div className="org-name data-field">
          <span className="form-left">Organization Name</span>
          <SelectField
            placeHolder={"Select Organization"}
            options={data}
            defaultValue={admin.organization}
            handleChange={(e) =>
              setAdmin({
                ...admin,
                organization: e.target.value,
              })
            }
          />
        </div>

        <div className="contact data-field">
          <span className="form-left">Contact Number</span>
          <TextField
            required
            size="small"
            type="text"
            placeholder="Contact Number"
            style={{ width: "32%" }}
            onChange={(e) =>
              setAdmin({
                ...admin,
                contact: e.target.value,
              })
            }
          />
        </div>
        <div className="credentials">
          <span className="div-heading">Credentials</span>
          <p>
            Below are the one time created credentials. These will be sent to
            this mentioned email
          </p>
          <div className="crd-email data-field" style={{ border: "none" }}>
            <span className="form-left">Email Address</span>

            <TextField
              required
              size="small"
              type="text"
              placeholder="Email Address"
              style={{ width: "32%" }}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="crd-password data-field" style={{ border: "none" }}>
            <span className="form-left">Password</span>

            <TextField
              required
              size="small"
              type="text"
              placeholder="Password"
              style={{ width: "32%" }}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}

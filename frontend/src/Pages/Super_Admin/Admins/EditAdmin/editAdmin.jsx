import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import img from "../../../../assets/images/placeholder.jpg";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import UploadBtn from "../../../../Components/Buttons/upload";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../../../Redux/Users/userActions";
import { getSingleUser } from "../../../../Redux/Users/userActions";
import { editUser } from "../../../../Redux/Users/userActions";




export default function EditAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();


  const user = useSelector((state) => state.userHandler.user);

  const [admin, setAdmin] = useState({
      username: "",
      contact: "",
    }),
    [picture, setPicture] = useState("");

  const saveAdmin = (e) => {
    e.preventDefault();
    dispatch(editUser({id: id, data: {...admin, picture}}));
    navigate("/admins");
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
    setAdmin({
      username: user?.username,
      contact: user?.contact,
    })
    setPicture(user?.picture)
  }, [dispatch]);

  return (
    <>
    {user && 
    <div className="container">
    <div className="component-header">
      <div className="left-header">
        <BackBtn />
        <h1>Edit Admin</h1>
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
        defaultValue={user?.username}
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
      <div className="contact data-field">
        <span className="form-left">Contact Number</span>
        <TextField
        defaultValue={user?.contact}
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
    </form>
  </div>
    }
    </>
  );
}

import React, { useEffect, useState } from "react";
import BackBtn from "../../../Components/Buttons/back";
import SaveBtn from "../../../Components/Buttons/save";
import UploadBtn from "../../../Components/Buttons/upload";
import img from "../../../assets/images/placeholder.jpg";
import { TextField } from "@mui/material";
import SelectField from "../../../Components/Select/select";
import { departments } from "../../../Constants/tableConstants";
import { getSingleUser } from "../../../Redux/Users/userActions";
import { useDispatch, useSelector } from "react-redux";
import { outLocal } from "../../../utils/HelperFunctions/helperFunctions";
import { editUser } from "../../../Redux/Users/userActions";
import { useNavigate } from "react-router-dom";

export default function EmployeeProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.userHandler.user);
  const id = JSON.parse(outLocal("user")).id;

  const [user, setUser] = useState({
      username: "",
      email: "",
      designation: "",
      department: "",
      contact: "",
      education: "",
      company_experience: "",
      total_experience: "",
    }),
    [picture, setPicture] = useState("");

  const save = () => {
    dispatch(editUser({ id: id, data: { ...user, picture } }));
    navigate('/employeeDashboard')
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
    setUser({
      username: currentUser?.username,
      email: currentUser?.email,
      designation: currentUser?.designation,
      department: currentUser?.department,
      contact: currentUser?.contact,
      education: currentUser?.education,
      company_experience: currentUser?.company_experience,
      total_experience: currentUser?.total_experience,
    });
    setPicture(currentUser?.picture);
  }, [dispatch]);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Edit Profile</h1>
        </div>
        <div className="right-header">
          <SaveBtn onClick={save} />
        </div>
      </div>
      <form action="">
        <div className="img-upload">
          <div className="logo-upload">
            <img src={picture || img} alt="image" />
          </div>
          <div className="heading">
            <span className="div-heading">Your Picture</span>
            <p>Upload a high res picture with clear face</p>
          </div>
          <UploadBtn setImage={setPicture} />
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Full Name</b>
          </span>
          <TextField
            defaultValue={currentUser?.username}
            size="small"
            placeholder="Full Name"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Email Address</b>
          </span>
          <TextField
            defaultValue={currentUser?.email}
            size="small"
            placeholder="Email Address"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Designation</b>
          </span>
          <TextField
            defaultValue={currentUser?.designation}
            size="small"
            placeholder="Designation"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                designation: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Department</b>
          </span>
          <SelectField
            placeHolder={"Select Department"}
            options={departments}
            handleChange = {(e) => setUser({
              ...user,
              department: e.target.value
            })}
          />
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Contact Number</b>
          </span>
          <TextField
            defaultValue={currentUser?.contact}
            size="small"
            placeholder="Contact Number"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                contact: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Education</b>
          </span>
          <TextField
            defaultValue={currentUser?.education}
            size="small"
            placeholder="Education e.g BS CS"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                education: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Company Experience (years)</b>
          </span>
          <TextField
            defaultValue={currentUser?.company_experience}
            size="small"
            placeholder="Company Experience in years"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                company_experience: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">
            <b>Total Experience (years)</b>
          </span>
          <TextField
            defaultValue={currentUser?.total_experience}
            size="small"
            placeholder="Total Experience in years"
            style={{ width: "32%" }}
            onChange={(e) =>
              setUser({
                ...user,
                total_experience: e.target.value,
              })
            }
          ></TextField>
        </div>
      </form>
    </div>
  );
}

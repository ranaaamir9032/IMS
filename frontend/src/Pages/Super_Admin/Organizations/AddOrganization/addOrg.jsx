import { TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import "./addOrg.css";
import img from "../../../../assets/images/placeholder.jpg";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import SaveBtn from "../../../../Components/Buttons/save";
import CancelBtn from "../../../../Components/Buttons/cancel";
import UploadBtn from "../../../../Components/Buttons/upload";
import { useDispatch } from "react-redux";
import { addNewOrg } from "../../../../Redux/Organizations/orgActions";
import Select from "react-select";
import countryList from "react-select-country-list";

export default function AddOrgPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [organization, setOrganiztion] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    city: "",
    country: "",
    zip: 0,
    representative: "",
    contact: "",
  });

  const [image, setImage] = useState("");

  const save = () => {
    dispatch(addNewOrg({ ...organization, image }));
    navigate("/organizations");
  };

  // Select Country handlers
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className="container">
      <div className="new-org-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Organization</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={save} />
        </div>
      </div>
      <form className="new-org-form">
        <div className="img-upload">
          <div className="logo-upload">
            <img src={image || img} alt="image" />
          </div>
          <div className="heading">
            <span className="div-heading">Organization logo</span>
            <p>Upload logo with minimum resolution of 800x800px</p>
          </div>
          <UploadBtn setImage={setImage} />
        </div>
        <div className="name data-field">
          <span className="form-left">Name of Organization</span>
          <TextField
            required
            size="small"
            placeholder="Name of Organizaton"
            style={{ width: "32%" }}
            onChange={(e) =>
              setOrganiztion({
                ...organization,
                name: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="email data-field">
          <span className="form-left">Email Address</span>

          <TextField
            required
            size="small"
            placeholder="Email Address"
            style={{ width: "32%" }}
            onChange={(e) =>
              setOrganiztion({
                ...organization,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="bio data-field">
          <span className="form-left">Bio</span>

          <textarea
            required
            type="text"
            rows="8"
            placeholder="Bio"
            className="bio-field"
            onChange={(e) =>
              setOrganiztion({
                ...organization,
                bio: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="address data-field" style={{ border: "none" }}>
          <span className="form-left">Address</span>
          <div className="adrs-fields">
            <TextField
              required
              size="small"
              type="text"
              fullWidth
              placeholder="Address"
              style={{ margin: "1% 0" }}
              onChange={(e) =>
                setOrganiztion({
                  ...organization,
                  address: e.target.value,
                })
              }
            />
            <TextField
              size="small"
              type="text"
              fullWidth
              placeholder="City"
              style={{ margin: "1% 0" }}
              onChange={(e) =>
                setOrganiztion({
                  ...organization,
                  city: e.target.value,
                })
              }
            />
            <Select
              placeholder="Select Country"
              options={options}
              value={organization.country}
              onChange={(e) =>
                setOrganiztion({
                  ...organization,
                  country: e,
                })
              }
            />
            <TextField
              required
              size="small"
              type="text"
              fullWidth
              placeholder="Zip code"
              style={{ margin: "1% 0" }}
              onChange={(e) =>
                setOrganiztion({
                  ...organization,
                  zip: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="rep-name data-field">
          <span className="form-left">Representative Name</span>

          <TextField
            required
            size="small"
            type="text"
            placeholder="Representative Name"
            style={{ width: "32%" }}
            onChange={(e) =>
              setOrganiztion({
                ...organization,
                representative: e.target.value,
              })
            }
          />
        </div>
        <div className="rep-contact data-field">
          <span className="form-left">Representative Contact</span>

          <TextField
            required
            size="small"
            type="text"
            placeholder="Representative Contact"
            style={{ width: "32%" }}
            onChange={(e) =>
              setOrganiztion({
                ...organization,
                contact: e.target.value,
              })
            }
          />
        </div>
      </form>
    </div>
  );
}

import { TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import img from "../../../../assets/images/placeholder.jpg";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import SaveBtn from "../../../../Components/Buttons/save";
import CancelBtn from "../../../../Components/Buttons/cancel";
import UploadBtn from "../../../../Components/Buttons/upload";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getSingleOrganization } from "../../../../Redux/Organizations/orgActions";
import { editOrganization } from "../../../../Redux/Organizations/orgActions";

export default function EditOrgPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const organizationData = useSelector(
    (state) => state.organizationHandler.organization
  );

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

  const [picture, setPicture] = useState("");

  const save = () => {
    dispatch(editOrganization({ id: id, data: { ...organization, picture } }));
    navigate("/organizations");
  };

  // Select Country handlers
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    dispatch(getSingleOrganization(id));
    setOrganiztion({
      name: organizationData?.name,
      email: organizationData?.email,
      bio: organizationData?.bio,
      address: organizationData?.address,
      city: organizationData?.city,
      country: organizationData?.country,
      zip: organizationData?.zip,
      representative: organizationData?.representative,
      contact: organizationData?.contact,
    });
    setPicture(organizationData?.picture);
  }, [dispatch]);

  return (
    <>
      {organizationData && (
        <div className="container">
          <div className="new-org-header">
            <div className="left-header">
              <BackBtn />
              <h1>Edit Organization</h1>
            </div>
            <div className="right-header">
              <CancelBtn />
              <SaveBtn onClick={save} />
            </div>
          </div>
          <form className="new-org-form">
            <div className="img-upload">
              <div className="logo-upload">
                <img
                  src={picture || organizationData?.picture || img}
                  alt="picture"
                />
              </div>
              <div className="heading">
                <span className="div-heading">Organization logo</span>
                <p>Upload logo with minimum resolution of 800x800px</p>
              </div>
              <UploadBtn setImage={setPicture} />
            </div>
            <div className="name data-field">
              <span className="form-left">Name of Organization</span>
              <TextField
                defaultValue={organizationData?.name}
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
                defaultValue={organizationData?.email}
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
                defaultValue={organizationData?.bio}
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
                  defaultValue={organizationData?.address}
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
                  defaultValue={organizationData?.city}
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
                  options={options && options}
                  defaultInputValue={organizationData?.country}
                  value={organization.country || ""}
                  onChange={(e) =>
                    setOrganiztion({
                      ...organization,
                      country: e.label,
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
                  defaultValue={organizationData?.zip}
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
                defaultValue={organizationData?.representative}
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
                defaultValue={organizationData?.contact}
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
      )}
    </>
  );
}

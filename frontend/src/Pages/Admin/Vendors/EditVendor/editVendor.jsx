import React, { useEffect, useState } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import SaveBtn from "../../../../Components/Buttons/save";
import CancelBtn from "../../../../Components/Buttons/cancel";
import { TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleVendor } from "../../../../Redux/Vendors/vendorActions";
import { editVendor } from "../../../../Redux/Vendors/vendorActions";

export default function EditVendor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vendorData = useSelector((state) => state.vendorHandler.vendor);
  const [once, setOnce] = useState(false)
  const [vendor, setVendor] = useState({
    name: "",
    contact: "",
  });

  const save = () => {
    dispatch(editVendor({ id: id, data: { ...vendor } }));
    navigate("/vendors");
  };

  useEffect(() => {
    if(!once){
        dispatch(getSingleVendor(id));
        setOnce(true)
    }
    
    if(vendorData){setVendor({
      name: vendorData.name,
      contact: vendorData.contact,
    });}
  }, [dispatch, vendorData]);

  return (
    <div className="container">
      <div className="component-header new-vendor-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Vendor</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={save} />
        </div>
      </div>
      <form className="component-body">
        <div className="data-field">
          <span className="form-left">Name</span>
          <input
            className="form-field"
            type="text"
            defaultValue={vendor.name}
            size="small"
            placeholder="Contact Number"
            onChange={(e) =>
              setVendor({
                ...vendor,
                name: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="data-field">
          <span className="form-left">Contact Number</span>
          <input
            className="form-field"
            type="text"
            defaultValue={vendor.contact}
            size="small"
            placeholder="Contact Number"
            onChange={(e) =>
              setVendor({
                ...vendor,
                contact: e.target.value,
              })
            }
          ></input>
        </div>
      </form>
    </div>
  );
}

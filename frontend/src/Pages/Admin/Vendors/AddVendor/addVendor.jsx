import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SelectField from "../../../../Components/Select/select";
import "./addVendor.css";
import BackBtn from "../../../../Components/Buttons/back";
import SaveBtn from "../../../../Components/Buttons/save";
import CancelBtn from "../../../../Components/Buttons/cancel";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategries } from "../../../../Redux/Category/categoryActions";
import MultipleSelect from "../../../../Components/MultiSelect/multiSelect";
import { addNewVendor } from "../../../../Redux/Vendors/vendorActions";
import { useNavigate } from "react-router-dom";

export default function AddVendor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryHandler.categories);

  const [catID, setCatId] = useState(0);
  const [vendor, setVendor] = useState({
    name: "",
    contact: "",
  });
  const [category, setCategory] = useState([]);

  // function to get the child categories of only the selected category
  const getSubCatOptions = (id, categories) => {
    const result = categories?.find((e) => e.id === id);
    return result?.child;
  };

  // save function
  const save = () => {
    dispatch(addNewVendor({ ...vendor, category }));
    navigate("/vendors");
  };

  useEffect(() => {
    dispatch(getAllCategries());
  }, []);

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
      <form action="">
        <div className="data-field border-top">
          <span className="form-left">Name</span>
          <TextField
            size="small"
            placeholder="Full Name"
            style={{ width: "32%" }}
            onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Contact Number</span>
          <TextField
            size="small"
            placeholder="Contact Number"
            style={{ width: "32%" }}
            onChange={(e) => setVendor({ ...vendor, contact: e.target.value })}
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Category</span>
          <SelectField
            placeHolder={"Select Category"}
            options={categories}
            handleChange={(e) => setCatId(e.target.value)}
          />
        </div>
        <div className="data-field">
          <span className="form-left">Sub-Category</span>
          <MultipleSelect
            data={getSubCatOptions(catID, categories)}
            category={category}
            setCategory={setCategory}
          />
        </div>
      </form>
    </div>
  );
}

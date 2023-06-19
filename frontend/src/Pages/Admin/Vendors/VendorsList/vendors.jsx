import React, { useEffect } from "react";
import "./vendors.css";
import DataTable from "../../../../Components/table/table";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddNewBtn from "../../../../Components/Buttons/addNew";
import { vendorTableHeader } from "../../../../Constants/tableConstants";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendors } from "../../../../Redux/Vendors/vendorActions";



export default function Vendors() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {vendors} = useSelector((state) => state.vendorHandler)


  useEffect(() => {
    dispatch(getAllVendors())
  },[])

  const addNewVendor = () => {
    navigate("/addVendor");
  };

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <h1>Vendors</h1>
          <SearchBar />
          <SelectField placeHolder={"Select Category"} />
          <SelectField placeHolder={"Select Sub-Category"} />
        </div>
        <div className="right-header">
          <AddNewBtn onClick={addNewVendor} />
        </div>
      </div>
      <div className="vendor-table">
        <DataTable tableHeader = {vendorTableHeader} data = {vendors} route={"/vendor/"}/>
      </div>
    </div>
  );
}

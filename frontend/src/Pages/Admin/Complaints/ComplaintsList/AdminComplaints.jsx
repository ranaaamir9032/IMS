import React, { useEffect, useState } from "react";
import "./AdminComplaints.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import DataTable from "../../../../Components/table/table";
import AlphabeticalOrderButton from "../../../../Components/FilterButtons/Alphabatical/alphabeticalOrderButton";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints } from "../../../../Redux/Complaints/complaintActions";
import { complainTableHeader } from "../../../../Constants/tableConstants";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";

export default function AdminComplaints() {
  const navigate = useNavigate();
  const userId = JSON.parse(outLocal("user")).id;
  const dispatch = useDispatch();
  const {complaints} = useSelector((state) => state.complaintHandler);


  const addNewCOmplaint = () => {
    navigate("/addComplaint");
  };

  const submittedfalse = {
    color: "white",
    backgroundColor: "#4583F5",
  };
  const submittedTrue = {
    color: "black",
    backgroundColor: "white",
  };
  const [submitted, setSubmitted] = useState(false);

  const toggleTables = () => {
    if (submitted === true) {
      dispatch(getAllComplaints({ isAdmin: true }));
    }else{
      dispatch(getAllComplaints({ isAdmin: false }));
    }
  }

  useEffect(() => {
    toggleTables();
   
  }, [submitted]);
  return (
    <div className="container">
      <div className="component-header cmp-header">
        <div className="left-header">
          <h1>Complaints</h1>
          <SearchBar />
          <SelectField placeHolder={"Select Staus"} />
        </div>
        <div className="right-header">
          <AlphabeticalOrderButton />
          {submitted && (
            <Button
              style={{
                backgroundColor: "seagreen",
                color: "white",
                marginLeft: "5%",
              }}
              onClick={addNewCOmplaint}
            >
              Create Complaint
            </Button>
          )}
        </div>
      </div>
      <div className="admin-cmp-body">
        <div className="cmp-left-toggle">
          <button
            className="toggle-btn"
            onClick={() => setSubmitted(false)}
            style={!submitted ? submittedfalse : submittedTrue}
          >
            Employees
          </button>
          <button
            className="toggle-btn"
            onClick={() => setSubmitted(true)}
            style={submitted ? submittedfalse : submittedTrue}
          >
            Submitted
          </button>
        </div>
          <div className="cmp-right-table">
            <DataTable tableHeader={complainTableHeader} data={complaints} route  = {"/complaint/"}/>
          </div>
      </div>
    </div>
  );
}

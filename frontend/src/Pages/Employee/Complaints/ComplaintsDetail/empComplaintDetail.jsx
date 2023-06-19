import React, { useEffect } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import { Button } from "@mui/material";
import img from "../../../../assets/images/placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSingleComplaint } from "../../../../Redux/Complaints/complaintActions";
import { useParams } from "react-router-dom";

export default function EmployeeComplaintDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const complaintData = useSelector(
    (state) => state.complaintHandler.complaint
  );

  useEffect(() => {
    dispatch(getSingleComplaint(id));
  }, []);
  return (
    <div className="container">
      <div className="component-header" >
        <div className="left-header-content">
          <BackBtn />
          <h1>Complaint ID : {complaintData?.id}</h1>
          <div
            className="status"
            style={
              complaintData?.status == "Resolved"
                ? { backgroundColor: "green" }
                : { backgroundColor: "blue" }
            }
          >
            {complaintData?.status}
          </div>
          <span style={{ margin: "0 2%" }}>
            <b>Submission Date: {complaintData?.createdAt}</b>
          </span>
        </div>
        <div className="right-header-content">
          {complaintData?.status === "pending" && (
            <Button style={{ backgroundColor: "seagreen", color: "white" }}>
              Mark as resolved
            </Button>
          )}
        </div>
      </div>
      <div className="component-body" style={{margin: '3% 0'}}>
        <div className="data-field border-top">
          <span className="form-left bold-txt">Title</span>
          <p>{complaintData?.title}</p>
        </div>
        <div className="data-field ">
          <span className="form-left bold-txt">Decription</span>
          <p style={{ width: "40%" }}>{complaintData?.description}</p>
        </div>
        <div className="data-field ">
          <span className="form-left bold-txt">Suggestion</span>
          <p style={{ width: "40%" }}>{complaintData?.suggestion}</p>
        </div>
      </div>
    </div>
  );
}

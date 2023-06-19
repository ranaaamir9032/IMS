import { Button } from "@mui/material";
import React, { useEffect } from "react";
import "./complaintDetails.css";
import BackBtn from "../../../../Components/Buttons/back";
import img from "../../../../assets/images/placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleComplaint,
  resolveComplaint,
} from "../../../../Redux/Complaints/complaintActions";
import { useParams } from "react-router-dom";

export default function ComplaintDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const complaintData = useSelector(
    (state) => state.complaintHandler.complaint
  );

  const resolve = () => {
    dispatch(resolveComplaint(id));
  };

  useEffect(() => {
    dispatch(getSingleComplaint(id));
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header-content">
          <BackBtn />
          <h1>Complaint ID : {id}</h1>
          <div
            className="status"
            style={
              complaintData?.status == "Resolved"
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
          >
            {complaintData?.status}
          </div>
        </div>
        <div className="right-header-content">
          {complaintData?.status === "Pending" && (
            <Button
              style={{ backgroundColor: "seagreen", color: "white" }}
              onClick={resolve}
            >
              Mark as resolved
            </Button>
          )}
        </div>
      </div>
      <div className="complaint-info">
        <div className="description-heading">Description</div>
        <div className="complaint-content">
          <p className="description-content" style={{ textAlign: "justify" }}>
            {complaintData?.description}
          </p>
          <span>Attachments</span>
          <div className="attachment-images">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
      <div className="complain-by">
        <span className="cmp-heading">Complaint Submitted By</span>
        <div className="admin-info">
          <div className="profile-pic">
            {complaintData?.user?.picture ? (
              <img src={complaintData?.user?.picture} alt="profile pic " />
            ) : (
              <img src={img} alt="profile pic " />
            )}
          </div>
          <div className="admin-details">
            <span className="pri-heading" style={{ fontSize: "1.7em" }}>
              {complaintData?.user?.username}
            </span>
            <p className="gray-text">{complaintData?.user?.email}</p>
            <p className="gray-text">+{complaintData?.user?.contact}</p>
          </div>
        </div>
      </div>
      <div className="complain-by-org">
        <span className="cmp-heading">Organization</span>
        <div className="admin-info">
          <div className="profile-pic">
            {complaintData?.user?.organization?.picture ? (
              <img
                src={complaintData?.user?.organization?.picture}
                alt="profile pic "
              />
            ) : (
              <img src={img} alt="profile pic " />
            )}
          </div>
          <div className="admin-details">
            <span className="pri-heading" style={{ fontSize: "1.7em" }}>
              {complaintData?.user?.organization?.name}
            </span>
            <p className="gray-text">
              {complaintData?.user?.organization?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

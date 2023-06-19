import { Button } from "@mui/material";
import React, { useEffect } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import img from "../../../../assets/images/placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSingleComplaint } from "../../../../Redux/Complaints/complaintActions";
import { useNavigate, useParams } from "react-router-dom";
import { resolveComplaint } from "../../../../Redux/Complaints/complaintActions";

export default function AdminComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const complaintData = useSelector(
    (state) => state.complaintHandler.complaint
  );

  useEffect(() => {
    dispatch(getSingleComplaint(id));
  }, []);

  const resolve = () => {
    dispatch(resolveComplaint(id));
    navigate("/adminComplaints");
  };

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
          {complaintData?.status === "Pending" &&
            complaintData?.user?.role?.id === 3 && (
              <Button
                style={{ backgroundColor: "seagreen", color: "white" }}
                onClick={resolve}
              >
                Mark as resolved
              </Button>
            )}
        </div>
      </div>
      {complaintData?.user?.role?.id === 2 ? (
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
      ) : (
        <>
          <div className="data-field border-top" style={{ margin: "4% 0" }}>
            <span className="form-left bold-txt">Complaint Title</span>
            <p className="form-right">{complaintData?.title}</p>
          </div>
          <div className="data-field">
            <span className="form-left bold-txt">Description</span>
            <p className="form-right">{complaintData?.description}</p>
          </div>
          <div className="data-field no-border">
            <span className="form-left bold-txt" style={{ border: "none" }}>
              Suggestion
            </span>
            <p className="form-right">{complaintData?.suggestion}</p>
          </div>
        </>
      )}
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
    </div>
  );
}

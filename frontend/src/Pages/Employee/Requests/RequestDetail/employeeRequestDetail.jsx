import React, { useEffect } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRequest } from "../../../../Redux/Requests/requestActions";
import { useParams } from "react-router-dom";




export default function EmployeeRequestDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.requestHandler);

  useEffect(() => {
    dispatch(getSingleRequest(id));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header" style={{ width: "60%" }}>
          <BackBtn />
          <h1>Request ID {request?.id}</h1>
          <div
            className="status"
            style={
              request?.status === "Pending"
                ? { backgroundColor: "blue", margin: "0 5%" }
                : request?.status === "Accepted"
                ? { backgroundColor: "green", margin: "0 5%" }
                : { backgroundColor: "red", margin: "0 5%" }
            }
          >
            {request?.status}
          </div>
          <div className="date bold-txt">
            Submission date : {request?.createdAt}
          </div>
        </div>
        <div className="right-header"></div>
      </div>
      <div className="data-field border-top">
        <span className="form-left bold-txt">Description</span>
        <p style={{ width: "60%" }}>{request?.description}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Item Name</span>
        <p>{request?.item?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Category</span>
        <p>{request?.item?.category?.parent?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Sub-Category</span>
        <p>{request?.item?.category?.name}</p>
      </div>
    </div>
  );
}

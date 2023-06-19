import React, { useEffect, useState } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import { Button } from "@mui/material";
import img from "../../../../assets/images/pp2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRequest } from "../../../../Redux/Requests/requestActions";
import { useNavigate, useParams } from "react-router-dom";
import { editRequest } from "../../../../Redux/Requests/requestActions";
import { editItem } from "../../../../Redux/Inventory/itemActions";

export default function ReqDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.requestHandler);
  console.log(request);
  const navigate = useNavigate();

  const [item, setItem] = useState({
    status: '',
    user: null
  })


  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    dispatch(getSingleRequest(id));
    setItemId(request?.item?.id)
  }, []);

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
                : request?.status === "Approved"
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
        {request?.type === "inventory acquisition" &&
        request?.status === "Pending" ? (
          <div
            className="right-header"
            style={{ width: "15%", marginLeft: "auto" }}
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                dispatch(editRequest({ id, data: { status: "Rejected" } }));
                navigate("/requests");
              }}
            >
              Reject
            </Button>
            <Button
              style={{ backgroundColor: "seagreen", color: "white" }}
              onClick={() => {
                dispatch(editRequest({ id, data: { status: "Approved" } }));
                dispatch(editItem({id: request?.item?.id ,data: { status: "assigned", userId: request?.user?.id }}));
                navigate("/requests");
              }}
            >
              Accept
            </Button>
          </div>
        ) : request?.type === "faulty" && request?.status === "Pending" ? (
          <div
            className="right-header"
            style={{ width: "15%", marginLeft: "auto" }}
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() => {
                dispatch(editRequest({id,data: { return_type: "Repair", status: "Approved" }}));
                navigate("/requests");
              }}
            >
              Repair
            </Button>
            <Button
              style={{ backgroundColor: "seagreen", color: "white" }}
              onClick={() => {
                dispatch(editRequest({id,data: { return_type: "Replace", status: "Approved" }}));
                dispatch(editItem({id: request?.item?.id ,data: { status: "unassigned", userId: null }}));
                navigate("/requests");
              }}
            >
              Replace
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="data-field border-top">
        <span className="form-left bold-txt">Description</span>
        <p style={{ width: "60%" }}>{request?.description}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Item Name</span>
        <p>Keyboard</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Category</span>
        <p>{request?.item?.category?.parent?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Sub-Category</span>
        <p>{request?.item?.category?.name}</p>
      </div>
      <span className="div-heading">Request By</span>
      <div className="user-card" style={{ padding: "3% 0" }}>
        <div className="pfp">
          <img src={request?.user?.picture || img} />
        </div>
        <div className="details">
          <span className="div-heading" style={{ margin: "2% 0" }}>
            {request?.user?.username}
          </span>
          <span className="dept" style={{ margin: "2% 0" }}>
            Department: {request?.user?.department}
          </span>
          <span className="email" style={{ margin: "2% 0" }}>
            {request?.user?.email}
          </span>
          <span className="contact" style={{ margin: "2% 0" }}>
            +{request?.user?.contact}
          </span>
        </div>
      </div>
    </div>
  );
}

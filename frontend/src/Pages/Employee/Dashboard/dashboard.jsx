import React, { useEffect } from "react";
import "./dashboard.css";
import { Button, Typography } from "@mui/material";
import img from "../../../assets/images/placeholder.jpg";
import DataTable from "../../../Components/table/table";
import { employeeComplainTableHeader, requestTableHeader } from "../../../Constants/tableConstants";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../../Redux/Users/userActions";
import { outLocal } from "../../../utils/HelperFunctions/helperFunctions";
import { getAllComplaints } from "../../../Redux/Complaints/complaintActions";
import { useNavigate } from "react-router-dom";
import { getAllRequests } from "../../../Redux/Requests/requestActions";





export default function EmployeeDashboard() {
  const id = JSON.parse(outLocal('user')).id
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.userHandler)
  const {complaints} = useSelector((state) => state.complaintHandler)
  const navigate = useNavigate();
  const {requests} = useSelector((state) => state.requestHandler);


  const editProfile = () => {
    navigate('/employee/profile')
  }

  useEffect(() => {
    dispatch(getSingleUser(id))
    dispatch(getAllComplaints({isAdmin : false}))
    dispatch(getAllRequests({ isFaulty: false }));
  },[])
  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <span className="main-heading">Dashboard</span>
        </div>
        <div className="right-header" style={{ width: "50%" }}>
          <Button
          onClick={editProfile}
            style={{
              color: "white",
              backgroundColor: "seagreen",
              marginRight: "0",
              marginLeft: "auto",
            }}
          >
            <EditIcon fontSize="small" />
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="component-body">
        <div className="user-card">
          <div className="pfp" style = {{width: '15%'}}>
            <img src={user?.picture || img} alt="image" />
          </div>
          <div className="emp-table">
            <div className="emp-table-row">
              <div className="table-data">
                <Typography className="gray-txt">Full Name</Typography>
                <h3>{user?.username}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Designation</Typography>
                <h3>{user?.designation || '----'}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Contact Number</Typography>
                <h3>{user?.contact || '----'}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Company Experience</Typography>
                <h3>{user?.company_experience || '----'}  years</h3>
              </div>
            </div>
            <div className="emp-table-row">
              <div className="table-data">
                <Typography className="gray-txt">Email Address</Typography>
                <h3>{user?.email || '----'}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Department</Typography>
                <h3>{user?.department || '----'}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Education</Typography>
                <h3>{user?.education || '----'}</h3>
              </div>
              <div className="table-data">
                <Typography className="gray-txt">Total Experience</Typography>
                <h3>{user?.total_experience || '----'}  years</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="requests">
          <div className="admin-comp-header component-header">
            <span className="cmp-heading">Recent Requests</span>
            <Button style={{ color: "gray" }}>See all</Button>
          </div>
          <DataTable tableHeader={requestTableHeader} recent={true} data = {requests} route = {'/employee/requests/'}/>
        </div>
        <div className="complaints">
          <div className="admin-comp-header component-header">
            <span className="cmp-heading">Recent Complaints</span>
            <Button style={{ color: "gray" }}>See all</Button>
          </div>
          <DataTable tableHeader={employeeComplainTableHeader} data = {complaints} recent={true} route = {'/employee/complaints/'}/>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import "./adminDashboard.css";
import DataCard from "../../../Components/DataCardDashboard/dataCard";
import MyChart from "../../../Components/graph/graph";
import { Button } from "@mui/material";
import DataTable from "../../../Components/table/table";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getAdminCount } from "../../../Redux/Users/userActions";
import {useDispatch, useSelector} from 'react-redux';
import {getCountForCurrentMonth } from "../../../utils/HelperFunctions/helperFunctions";
import { getItemCount } from "../../../Redux/Inventory/itemActions";
import { getVendorCount } from "../../../Redux/Vendors/vendorActions";
import { getCategoryCount } from "../../../Redux/Category/categoryActions";
import { getAllComplaints } from "../../../Redux/Complaints/complaintActions";
import { getComplaintsCount } from "../../../Redux/Complaints/complaintActions";
import { complainTableHeader } from "../../../Constants/tableConstants";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state.userHandler.adminsPerMonth)
  const {itemCount} = useSelector((state) => state.itemHandler)
  const {vendorCount} = useSelector((state) => state.vendorHandler)
  const {categoryCount} = useSelector((state) => state.categoryHandler)
  const {complaints} = useSelector((state) => state.complaintHandler)
  const {compPerMonth} = useSelector((state) => state.complaintHandler)

  useEffect(() => {
    dispatch(getAllComplaints({isAdmin: false}))
    dispatch(getAdminCount())
    dispatch(getItemCount())
    dispatch(getVendorCount())
    dispatch(getCategoryCount())
    dispatch(getComplaintsCount())
  },[dispatch])
  return (
    <div className="container">
      <span className="main-heading">Dashboard</span>
      <div className="dashboard-data">
        <DataCard
          title="Employees"
          amount={userCount?.total}
          tagline= {getCountForCurrentMonth(userCount?.countArr)+" new employees added this month"}
        />
        <DataCard
          title="Inventory Items"
          amount={itemCount?.total}
          tagline={getCountForCurrentMonth(itemCount?.countArr) + " new items addes this month"}
        />
        <DataCard
          title="Vendors"
          amount={vendorCount?.total}
          tagline={getCountForCurrentMonth(vendorCount?.countArr) + " new vendors added this month"}
        />
        <DataCard
          title="Categories"
          amount={categoryCount?.total}
          tagline={getCountForCurrentMonth(categoryCount?.countArr) + " new category added this month"}
        />
      </div>
      <div className="charts">
        <div className="inventory-chart">
          <div className="chart-header">
            <span chart-heading>Inventory Items</span>
            <Button style={{ color: "gray", fontSize: "small" }}>
              <FileDownloadOutlinedIcon />
              Download report
            </Button>
          </div>
          <div className="chart">
            <MyChart admin={true} adminData = {itemCount?.countArr}/>
          </div>
        </div>
        <div className="complaints-chart">
          <div className="chart-header">
            <span className="chart-heading">Complaints</span>
            <Button style={{ color: "gray", fontSize: "small" }}>
              <FileDownloadOutlinedIcon />
              Download report
            </Button>
          </div>
          <div className="chart">
            <MyChart admin={true} complaintData = {compPerMonth} complaints = {true}/>
          </div>
        </div>
      </div>
      <div className="admin-complaints">
        <div className="admin-comp-header component-header">
          <span className="cmp-heading">Recent Complaints</span>
          <Link to='/adminComplaints'>
          <Button style={{ color: "gray" }}>See all</Button>
          </Link>
        </div>
        <div className="admin-cpm-table">
          <DataTable tableHeader = {complainTableHeader} data = {complaints} recent = {true} route  = {"/complaint/"}/>
        </div>
      </div>
    </div>
  );
}

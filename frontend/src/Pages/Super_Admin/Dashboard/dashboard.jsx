import React, { useEffect, useState } from "react";
import "./dashboard.css";
import DataTable from "../../../Components/table/table";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MyChart from "../../../Components/graph/graph";
import DataCard from "../../../Components/DataCardDashboard/dataCard";
import { complainTableHeader } from "../../../Constants/tableConstants";
import { useDispatch, useSelector } from "react-redux";
import { getOrgCount } from "../../../Redux/Organizations/orgActions";
import { getAdminCount } from "../../../Redux/Users/userActions";
import {
  getAllComplaints,
  getComplaintsCount,
} from "../../../Redux/Complaints/complaintActions";
import { countThisMonth , getCountForCurrentMonth} from "../../../utils/HelperFunctions/helperFunctions";

export default function Dashboard() {
  const [orgTable, setOrgTable] = useState(true);
  const dispatch = useDispatch();

  const { organizationHandler, userHandler, complaintHandler } = useSelector(
    (state) => state
  );

  const dispatcher = () => {
    dispatch(getOrgCount());
    dispatch(getAdminCount());
    dispatch(getComplaintsCount());
    dispatch(getAllComplaints({ isAdmin: false }));
  };

  useEffect(() => {
    dispatcher();
  }, [dispatch]);
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="card-header">
          <h1>Dashboard</h1>
        </div>
        <div className="card-data">
          <DataCard
            title="Organizations"
            amount={organizationHandler.orgsPerMonth?.total}
            tagline={
              countThisMonth(organizationHandler.orgsPerMonth?.countArr) +
              " new organizations added this month"
            }
          />
          <DataCard
            title="Admins"
            amount={userHandler.adminsPerMonth?.total}
            tagline={
              getCountForCurrentMonth(userHandler.adminsPerMonth?.countArr) +
              " new admins added this month"
            }
          />
          <DataCard
            title="Pending Complaints"
            amount={complaintHandler.compPerMonth?.totalPending}
            tagline={
              getCountForCurrentMonth(complaintHandler.compPerMonth?.complaintCount) +
              " new complaint this month"
            }
            redIcon={true}
          />
          <DataCard
            title="Resolved Complaints"
            amount={complaintHandler.compPerMonth?.totalResolved}
            tagline={
              getCountForCurrentMonth(complaintHandler.compPerMonth?.complaintCount) +
              " new complaint this month"
            }
            noBorder={true}
          />
        </div>
        <div className="card-graph">
          <div className="graph-header">
            <div className="graph-left-buttons">
              <span className="sub-heading">Analytics</span>
              <button className="rep-download chart-btn">
                <FileDownloadOutlinedIcon />
                Download Report
              </button>
            </div>
            <div className="graph-right-buttons">
              <button
                className="chart-btn swap-data-btn"
                onClick={() => setOrgTable(true)}
                style={
                  orgTable
                    ? { color: "seagreen", textDecoration: "underline" }
                    : { color: "gray", textDecoration: "none" }
                }
              >
                Organizations
              </button>
              <button
                className="chart-btn swap-data-btn"
                onClick={() => setOrgTable(false)}
                style={
                  !orgTable
                    ? { color: "seagreen", textDecoration: "underline" }
                    : { color: "gray", textDecoration: "none" }
                }
              >
                Admins
              </button>
            </div>
          </div>
          <div className="graph">
            {orgTable && (
              <MyChart
                superAdmin={true}
                data={organizationHandler.orgsPerMonth?.countArr}
              />
            )}
            {!orgTable && (
              <MyChart
                superAdmin={true}
                data={userHandler.adminsPerMonth?.countArr}
              />
            )}
          </div>
        </div>
        <div className="card-table">
          <div className="table-header">
            <span className="sub-heading">Recent Complaints</span>
            <a href="/complaints" className="complaints-btn">
              See all
            </a>
          </div>
          <div className="table">
            <DataTable
            route = {"/complaintDetails/"}
              tableHeader={complainTableHeader}
              data={complaintHandler.complaints?.slice(0, 4)}
              recent={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

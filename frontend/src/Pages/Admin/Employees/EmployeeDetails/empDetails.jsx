import { useState, useEffect } from "react";
import "./empDetails.css";
import BackBtn from "../../../../Components/Buttons/back";
import BasicMenu from "../../../../Components/DropMenu/menu";
import img from "../../../../assets/images/pp2.jpg";
import DataTable from "../../../../Components/table/table";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../../../Redux/Users/userActions";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminRequestTableHeader,
  inventoryTableHeader,
} from "../../../../Constants/tableConstants";
import { getAllRequests } from "../../../../Redux/Requests/requestActions";
import { getAllItems } from "../../../../Redux/Inventory/itemActions";
import { deleteUser } from "../../../../Redux/Users/userActions";

export default function EmpDetails() {
  const navigate = useNavigate();
  const [genInfo, setGenInfo] = useState(true);
  const [invTab, setInvTab] = useState(false);
  const [reqTab, setReqTab] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const employeeData = useSelector((state) => state.userHandler.user);
  const { requests } = useSelector((state) => state.requestHandler);
  const { items } = useSelector((state) => state.itemHandler);

  const myRequests = requests?.filter(
    (req) => req.user === employeeData?.username
  );
  const myItems = items?.filter((itm) => itm.user === employeeData?.username);

  const deleteEmployee = () => {
    dispatch(deleteUser(employeeData?.id));
    navigate("/employees");
  };

  useEffect(() => {
    dispatch(getSingleUser(id));
    dispatch(getAllRequests({ isFaulty: false }));
    dispatch(getAllItems());
  }, []);

  const handleClick = (state1, state2, state3) => {
    setGenInfo(state1);
    setInvTab(state2);
    setReqTab(state3);
  };

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
        </div>
        <div className="right-header">
          <BasicMenu noEdit={true} handleDelete={deleteEmployee} />
        </div>
      </div>
      <div className="content">
        <div className="left-content">
          <button
            style={
              genInfo
                ? { color: "white", backgroundColor: "#4583F5" }
                : { color: "black" }
            }
            onClick={() => {
              handleClick(true, false, false);
            }}
            className="toggle-btn"
          >
            General Information
          </button>
          <button
            style={
              invTab
                ? { color: "white", backgroundColor: "#4583F5" }
                : { color: "black" }
            }
            onClick={() => {
              handleClick(false, true, false);
            }}
            className="toggle-btn"
          >
            Inventory
          </button>
          <button
            style={
              reqTab
                ? { color: "white", backgroundColor: "#4583F5" }
                : { color: "black" }
            }
            onClick={() => {
              handleClick(false, false, true);
            }}
            className="toggle-btn"
          >
            Requests
          </button>
        </div>
        <div className="right-content">
          {genInfo && (
            <>
              <div className="user-card">
                <div className="pfp">
                  <img src={employeeData?.picture || img} alt="pfp" />
                </div>
                <div className="details">
                  <span className="div-heading">{employeeData?.username}</span>
                </div>
              </div>
              <div className="data-field border-top">
                <span className="form-left bold-txt">Email Address</span>
                <p>{employeeData?.email}</p>
              </div>
              <div className="data-field">
                <span className="form-left bold-txt">Contact Number</span>
                <p>+{employeeData?.contact}</p>
              </div>
              <div className="data-field">
                <span className="form-left bold-txt">Department</span>
                <p>Develoment</p>
              </div>
            </>
          )}
          <>
            {invTab && (
              <div className="inventory-table">
                {myItems.length > 0 ? (
                  <DataTable
                    tableHeader={inventoryTableHeader}
                    data={myItems}
                  />
                ) : (
                  <span style={{ color: "gray" }}>No items yet</span>
                )}
              </div>
            )}
          </>
          <>
            {reqTab && (
              <div className="request-table">
                {myRequests.length > 0 ? (
                  <DataTable
                    tableHeader={adminRequestTableHeader}
                    data={myRequests}
                  />
                ) : (
                  <span style={{ color: "gray" }}>No requests yet</span>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

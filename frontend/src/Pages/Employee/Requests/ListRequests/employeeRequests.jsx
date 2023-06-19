import React, { useEffect } from "react";
import AddNewBtn from "../../../../Components/Buttons/addNew";
import DataTable from "../../../../Components/table/table";
import { requestTableHeader } from "../../../../Constants/tableConstants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests } from "../../../../Redux/Requests/requestActions";

export default function EmployeeRequests() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requestHandler);

  const addNewRequest = () => {
    navigate("/employee/requests/new");
  };

  useEffect(() => {
    dispatch(getAllRequests({ isFaulty: false }));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <span className="main-heading">Requests</span>
        </div>
        <div className="right-header">
          <AddNewBtn onClick={addNewRequest} />
        </div>
      </div>
      <div className="component-body" style={{ margin: "2% 0" }}>
        <DataTable tableHeader={requestTableHeader} data={requests} route = {"/employee/requests/"}/>
      </div>
    </div>
  );
}

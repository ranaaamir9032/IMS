import React, { useEffect } from "react";
import "./requests.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import AlphabeticalOrderButton from "../../../../Components/FilterButtons/Alphabatical/alphabeticalOrderButton";
import DataTable from "../../../../Components/table/table";
import PaginationRounded from "../../../../Components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllRequests } from "../../../../Redux/Requests/requestActions";
import { adminRequestTableHeader } from "../../../../Constants/tableConstants";

export default function Requests() {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requestHandler);

  useEffect(() => {
    dispatch(getAllRequests({ isFaulty: false }));
  }, [dispatch]);
  return (
    <div className="container">
      <div className="component-header req-header">
        <div className="left-header">
          <h1>Requests</h1>
          <SearchBar />
          <SelectField placeHolder={"Select Status"} />
        </div>
        <div className="right-header">
          <AlphabeticalOrderButton />
        </div>
      </div>
      <div className="req-table" style={{ margin: "3% 0" }}>
        <DataTable
          tableHeader={adminRequestTableHeader}
          data={requests}
          route={"/request/"}
        />
      </div>
    </div>
  );
}

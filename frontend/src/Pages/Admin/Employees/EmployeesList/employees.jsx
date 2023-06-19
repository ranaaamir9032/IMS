import React, { useEffect } from "react";
import "./employees.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import AlphabeticalOrderButton from "../../../../Components/FilterButtons/Alphabatical/alphabeticalOrderButton";
import DataTable from "../../../../Components/table/table";
import { useNavigate } from "react-router-dom";
import { employeeTableHeader } from "../../../../Constants/tableConstants";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../Redux/Users/userActions";
import AddNewBtn from "../../../../Components/Buttons/addNew";

export default function Employees() {
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.userHandler.admins);

  const navigate = useNavigate();

  const addEmployee = () => {
    navigate("/addEmployee");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="container">
      <div className="component-header emp-header">
        <div className="left-header">
          <h1>Employees</h1>
          <SearchBar />
          <SelectField placeHolder={"Select Department"} />
        </div>
        <div className="right-header">
          <AddNewBtn onClick={addEmployee} />
        </div>
      </div>
      <div
        className="filter-bar"
        style={{ justifyContent: "flex-end", padding: "01% .5%" }}
      >
        <AlphabeticalOrderButton />
      </div>
      <div className="emp-table">
        <DataTable
          tableHeader={employeeTableHeader}
          data={employeeData}
          route={"/employeeDetails/"}
        />
      </div>
    </div>
  );
}

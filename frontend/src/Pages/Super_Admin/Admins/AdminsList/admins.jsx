import React, { useEffect, useState } from "react";
import "./admins.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import DataTable from "../../../../Components/table/table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminTableHeader } from "../../../../Constants/tableConstants";
import { getAllUsers } from "../../../../Redux/Users/userActions";

export default function Admins() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState([])
  const adminData = useSelector((state) => state.userHandler.admins);

  const addNew = () => {
    navigate("/newAdmin");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="adm-container">
        <div className="adm-header">
          <div className="adm-left-header">
            <h1>Admins</h1>
            <SearchBar data = {adminData} setState = {setSearch}/>
            <SelectField placeHolder={"Select location"} />
          </div>
          <div className="adm-right-header">
            <Button
              style={{ color: "white", backgroundColor: "seagreen" }}
              onClick={addNew}
            >
              <AddIcon />
              Add
            </Button>
          </div>
        </div>
        <div className="adm-table">
          <DataTable tableHeader={adminTableHeader} data={search.length > 0 ? search : adminData} image = {true} route = {'/adminDetails/'}/>
        </div>
      </div>
    </div>
  );
}

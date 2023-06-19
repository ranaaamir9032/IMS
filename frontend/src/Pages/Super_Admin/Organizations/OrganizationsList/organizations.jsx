import React, { useEffect, useState } from "react";
import "./organizations.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import DataTable from "../../../../Components/table/table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrganizations } from "../../../../Redux/Organizations/orgActions";
import { orgTableHeader } from "../../../../Constants/tableConstants";

export default function Organizations() {
  const dispatch = useDispatch();
  const organizations = useSelector(
    (state) => state.organizationHandler.organizationData
  );
  const navigate = useNavigate();

  const [searchResult, setSearchResult] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);

  const addNewOrg = () => {
    navigate("/newOrg");
  };

  useEffect(() => {
    dispatch(getAllOrganizations());
  }, []);

  return (
    <div>
      <div className="org-container">
        <div className="org-header">
          <div className="org-left-header">
            <h1>Organizations</h1>
            <SearchBar data={organizations} setState={setSearchResult} />
            <SelectField
              placeHolder={"Select location"}
              filterData={organizations}
              value={"address"}
              setState={setFilteredOrganizations}
            />
          </div>
          <div className="org-right-header">
            <Button
              style={{ color: "white", backgroundColor: "seagreen" }}
              onClick={addNewOrg}
            >
              <AddIcon />
              Add
            </Button>
          </div>
        </div>
        <div className="org-table">
          <DataTable
            tableHeader={orgTableHeader}
            data={
              searchResult.length > 0
                ? searchResult
                : filteredOrganizations.length > 0
                ? filteredOrganizations
                : organizations
            }
            image={true}
            route={"/orgDetails/"}
          />
        </div>
      </div>
    </div>
  );
}

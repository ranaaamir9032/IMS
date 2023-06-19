import "./complaints.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import DataTable from "../../../../Components/table/table";
import { complainTableHeader } from "../../../../Constants/tableConstants";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints } from "../../../../Redux/Complaints/complaintActions";
import { useEffect, useState } from "react";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";

export default function Complaints() {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaintHandler.complaints);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    dispatch(getAllComplaints({ isAdmin: true }));
  }, []);
  return (
    <div>
      <div className="cmp-container">
        <div className="cmp-header">
          <div className="cmp-left-header">
            <h1>Complaints</h1>
            <SearchBar data={complaints} steState={setSearch} />
            <SelectField placeHolder={"Select location"} />
            <SelectField placeHolder={"Select satus"} />
          </div>
          <div className="cmp-right-header"></div>
        </div>
        <div className="cmp-table">
          <DataTable
            tableHeader={complainTableHeader}
            data={search.length > 0 ? search : complaints}
            route={"/complaintDetails/"}
          />
        </div>
      </div>
    </div>
  );
}

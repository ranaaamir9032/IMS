import React, { useEffect } from "react";
import "./inventory.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import SelectField from "../../../../Components/Select/select";
import DataTable from "../../../../Components/table/table";
import AlphabeticalOrderButton from "../../../../Components/FilterButtons/Alphabatical/alphabeticalOrderButton";
import AscendingOrderButton from "../../../../Components/FilterButtons/Ascending/ascendingOrderButton";
import { useNavigate } from "react-router-dom";
import AddNewBtn from "../../../../Components/Buttons/addNew";
import { getAllItems } from "../../../../Redux/Inventory/itemActions";
import { useDispatch, useSelector } from "react-redux";
import { inventoryTableHeader } from "../../../../Constants/tableConstants";

export default function Inventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addNew = () => {
    navigate("/addItem");
  };

  const { items } = useSelector((state) => state.itemHandler);

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <div className="container">
      <div className="component-header inv-header">
        <div className="left-header">
          <h1>Inventory</h1>
          <SearchBar />
          <SelectField placeHolder={"Select Category"} />
          <SelectField placeHolder={"Select Sub-Category"} />
        </div>
        <div className="right-header">
          <AddNewBtn onClick={addNew} />
        </div>
      </div>
      <div className="filter-bar">
        <AlphabeticalOrderButton />
        <AscendingOrderButton />
      </div>
      <div className="inventory-table">
        <DataTable
          tableHeader={inventoryTableHeader}
          data={items}
          route={"/itemDetails/"}
        />
      </div>
    </div>
  );
}

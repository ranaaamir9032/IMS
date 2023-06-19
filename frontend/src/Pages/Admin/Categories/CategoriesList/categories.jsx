import React, { useEffect } from "react";
import "./categories.css";
import SearchBar from "../../../../Components/SearchBar/searchBar";
import AlphabeticalOrderButton from "../../../../Components/FilterButtons/Alphabatical/alphabeticalOrderButton";
import { useNavigate } from "react-router-dom";
import CollapsibleTable from "../../../../Components/CollapseableTable/collapseTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategries } from "../../../../Redux/Category/categoryActions";
import AddNewBtn from "../../../../Components/Buttons/addNew";



export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryHandler.categories)


  const addNew = () => {
    navigate("/addCategory");
  };

  useEffect(() => {
    dispatch(getAllCategries())
  },[])

  return (
    <div className="container">
      <div className="component-header cat-header">
        <div className="left-header">
          <h1>Category</h1>
          <SearchBar />
        </div>
       <AddNewBtn onClick = {addNew} />
      </div>
      <div className="filter-bar">
        <AlphabeticalOrderButton />
      </div>
      <div className="category-table">
        <CollapsibleTable data = {categories} />
      </div>
    </div>
  );
}

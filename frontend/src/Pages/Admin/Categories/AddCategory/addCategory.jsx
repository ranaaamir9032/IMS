import React, { useState } from "react";
import "./addCategory.css";
import { Button, TextField } from "@mui/material";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";
import { useDispatch } from "react-redux";
import { addNewCategory } from "../../../../Redux/Category/categoryActions";




export default function AddCategory() {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();

  const userOrgId = JSON.parse(outLocal("user")).organization.id;
  const [category, setCategory] = useState({
    name: "",
    organization: userOrgId,
    subcategory: [],
  });
  const [subCategory, setSubCategory] = useState({
    name: "",
  });

  const save = () => {
    subCategoryHandler();
    dispatch(addNewCategory(category))
  };

  const subCategoryHandler = () => {
    if (subCategory.name.trim() !== "") {
      setCategory({
        ...category,
        subcategory: [...category.subcategory, subCategory],
      });
      setSubCategory({ name: ""});
    }
  };

  const addSubCategory = () => {
    subCategoryHandler();
    setCounter(counter + 1);
  };



  return (
    <div className="container">
      <div className="component-header new-category-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Category</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={save} />
        </div>
      </div>
      <form action="">
        <div className="data-field border-top">
          <span className="form-left">Category Name</span>
          <TextField
            size="small"
            placeholder="Category Name"
            style={{ width: "32%" }}
            onChange={(e) =>
              setCategory({
                ...category,
                name: e.target.value,
              })
            }
          ></TextField>
        </div>
        <span className="sub-heading">Sub-Categories</span>
        {Array.from(Array(counter)).map((index, count) => {
          return (
            <div className="data-field no-border" key={index}>
              <span className="form-left">Sub-Category #{count + 1}</span>
              <TextField
                size="small"
                placeholder="Enter Sub-Category"
                style={{ width: "32%" }}
                onChange={(e) =>
                  setSubCategory({
                    ...subCategory,
                    name: e.target.value,
                  })
                }
              ></TextField>
            </div>
          );
        })}
        <Button
          onClick={addSubCategory}
          style={{ color: "white", backgroundColor: "seagreen" }}
        >
          Add Sub-Categoey
        </Button>
      </form>
    </div>
  );
}

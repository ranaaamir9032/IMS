import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCategory } from "../../../../Redux/Category/categoryActions";
import { useNavigate, useParams } from "react-router-dom";
import { addSubCategories } from "../../../../Redux/Category/categoryActions";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const categoryData = useSelector((state) => state.categoryHandler.category);

  const [counter, setCounter] = useState(1);
  const [category, setCategory] = useState({
    subcategory: [],
  });
  const [subCategory, setSubCategory] = useState({
    name: "",
  });

  const save = () => {
    subCategoryHandler();
    dispatch(addSubCategories({ id: id, data: { ...category } }));
    navigate("/categories");
  };

  const subCategoryHandler = () => {
    if (subCategory.name.trim() !== "") {
      setCategory({
        ...category,
        subcategory: [...category.subcategory, subCategory],
      });
      setSubCategory({ name: "" });
    }
  };

  const addSubCategory = () => {
    subCategoryHandler();
    setCounter(counter + 1);
  };

  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, [dispatch]);

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
          <p>{categoryData?.name}</p>
        </div>
        <span className="sub-heading">Sub-Categories</span>
        {categoryData?.child?.map((ch, idx) => {
          return (
            <div className="data-field no-border">
              <span className="form-left">Sub Category # {idx + 1}</span>
              <p>{ch?.name}</p>
            </div>
          );
        })}

        {Array.from(Array(counter)).map((index, count) => {
          return (
            <div className="data-field no-border" key={index}>
              <span className="form-left">
                Sub-Category #{categoryData?.child?.length + count + 1}
              </span>
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

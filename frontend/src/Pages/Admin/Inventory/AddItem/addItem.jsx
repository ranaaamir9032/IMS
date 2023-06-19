import React, { useEffect, useState } from "react";
import "./addItem.css";
import { TextField } from "@mui/material";
import SelectField from "../../../../Components/Select/select";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategries } from "../../../../Redux/Category/categoryActions";
import { addNewItem } from "../../../../Redux/Inventory/itemActions";
import { getAllVendors } from "../../../../Redux/Vendors/vendorActions";
import { getAllCategriesWithVendors } from "../../../../Redux/Category/categoryActions";

export default function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.categoryHandler.categoriesWithVendors
  );
  const vendorData = useSelector((state) => state.vendorHandler.vendors);

  const [subCat, setSubCat] = useState([]);
  const [vendors, setVendors] = useState([]);

  const categoryChange = (e) => {
    categories?.forEach((category) => {
      if (category.id === e.target.value) {
        setSubCat(category.child);
      }
    });
  };

  const subCategoryChange = (e) => {
    setItem({ ...item, category: e.target.value });
    subCat?.forEach((category) => {
      if (category.id === e.target.value) {
        setVendors(category.vendor);
      }
    });
  };

  const [item, setItem] = useState({
    name: "",
    sr_number: 0,
    description: "",
    price: "",
    category: 0,
    status: "unassigned",
    vendor: 0,
  });

  const saveItem = () => {
    dispatch(addNewItem(item));
    navigate("/inventory");
  };

  useEffect(() => {
    dispatch(getAllCategriesWithVendors());
    // dispatch(getAllVendors())
  }, [dispatch]);

  return (
    <div className="container">
      <div className="component-header new-item-header">
        <div className="left-header">
          <BackBtn />
          <h1>Add New Item</h1>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={saveItem} />
        </div>
      </div>
      <form action="">
        <div className="data-field">
          <span className="form-left">Item Name</span>
          <TextField
            size="small"
            placeholder="Item Name"
            style={{ width: "32%" }}
            onChange={(e) =>
              setItem({
                ...item,
                name: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Serial Number</span>
          <TextField
            size="small"
            placeholder="Enter serial number"
            style={{ width: "32%" }}
            onChange={(e) =>
              setItem({
                ...item,
                sr_number: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Description</span>
          <textarea
            type="text"
            rows="8"
            placeholder="Description"
            className="bio-field"
            onChange={(e) =>
              setItem({
                ...item,
                description: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="data-field">
          <span className="form-left">Category</span>
          <SelectField
            placeHolder={"Select Category"}
            options={categories}
            handleChange={categoryChange}
          />
        </div>
        <div className="data-field">
          <span className="form-left">Sub-category</span>
          <SelectField
            placeHolder={"Select Sub-category"}
            options={subCat}
            handleChange={subCategoryChange}
          />
        </div>
        <div className="data-field">
          <span className="form-left">Price</span>
          <TextField
            size="small"
            placeholder="price"
            style={{ width: "32%" }}
            onChange={(e) =>
              setItem({
                ...item,
                price: e.target.value,
              })
            }
          ></TextField>
        </div>
        <div className="data-field">
          <span className="form-left">Vendor</span>
          <SelectField
            placeHolder={"Select vendor"}
            options={vendors}
            handleChange={(e) =>
              setItem({
                ...item,
                vendor: e.target.value,
              })
            }
          />
        </div>
      </form>
    </div>
  );
}

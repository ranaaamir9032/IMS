import React, { useEffect, useState } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import SelectField from "../../../../Components/Select/select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewRequest } from "../../../../Redux/Requests/requestActions";
import { getAllCategries } from "../../../../Redux/Category/categoryActions";
import { getAllItems } from "../../../../Redux/Inventory/itemActions";
import { outLocal } from "../../../../utils/HelperFunctions/helperFunctions";
import { requestType } from "../../../../Constants/tableConstants";

export default function AddRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryHandler);
  const { items } = useSelector((state) => state.itemHandler);
  console.log(items);

  const userId = JSON.parse(outLocal("user")).id;

  const [subCat, setSubCat] = useState([]);
  const [item, setItem] = useState([]);
  const [request, setRequest] = useState({
    item: 0,
    user: userId,
    description: "",
    type: "",
    status: "Pending",
  });

  const categoryChange = (e) => {
    categories?.forEach((category) => {
      if (category.id === e.target.value) {
        setSubCat(category.child);
      }
    });
  };

  const itemChange = (e) => {
    let arr = [];
    console.log(e.target.value);
    items?.forEach((i) => {
      if (i?.subCategory === e.target.value) {
        arr.push(i);
      }
    });
    setItem(arr);
  };

  const save = () => {
    dispatch(addNewRequest(request));
    navigate("/employee/requests");
  };

  useEffect(() => {
    dispatch(getAllCategries());
    dispatch(getAllItems());
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <span className="main-heading">Create New Request</span>
        </div>
        <div className="right-header">
          <CancelBtn />
          <SaveBtn onClick={save} />
        </div>
      </div>
      <div className="component-body">
        <div className="data-field border-top">
          <span className="form-left">Category</span>
          <SelectField
            placeHolder={"Select Category"}
            options={categories}
            handleChange={(e) => categoryChange(e)}
          />
        </div>
        <div className="data-field">
          <span className="form-left">Sub Category</span>
          <SelectField
            placeHolder={"Select Sub Category"}
            options={subCat}
            name={true}
            handleChange={(e) => itemChange(e)}
          />
        </div>
        <div className="data-field">
          <span className="form-left">Item</span>
          <SelectField
            placeHolder={"Select Item"}
            options={item}
            handleChange={(e) =>
              setRequest({
                ...request,
                item: e.target.value,
              })
            }
          />
        </div>
        <div className="data-field">
          <span className="form-left">Request Type</span>
          <SelectField
            placeHolder={"Select Request Type"}
            options={requestType}
            name={true}
            handleChange={(e) =>
              setRequest({
                ...request,
                type: e.target.value,
              })
            }
          />
        </div>
        <div className="data-field">
          <span className="form-left">Description</span>
          <textarea
            onChange={(e) =>
              setRequest({
                ...request,
                description: e.target.value,
              })
            }
            type="text"
            rows="8"
            placeholder="Description"
            className="bio-field"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

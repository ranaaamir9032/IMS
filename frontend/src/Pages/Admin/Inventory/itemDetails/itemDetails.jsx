import React, { useEffect } from "react";
import "./itemDetails.css";
import BackBtn from "../../../../Components/Buttons/back";
import BasicMenu from "../../../../Components/DropMenu/menu";
import img from "../../../../assets/images/pp2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSingleItem } from "../../../../Redux/Inventory/itemActions";
import { useNavigate, useParams } from "react-router-dom";
import { deleteItem } from "../../../../Redux/Inventory/itemActions";

export default function ItemDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.itemHandler);

  const deleteItm = () => {
    dispatch(deleteItem(id));
    navigate("/inventory");
  };

  useEffect(() => {
    dispatch(getSingleItem(id));
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
          <h1>Item Details</h1>
        </div>
        <div className="right-header">
          <BasicMenu route={"/item/" + id} handleDelete={deleteItm} />
        </div>
      </div>
      <div className="data-field no-border">
        <div className="data-field">
          <span className="form-left bold-txt">Item Name</span>
          <p>{item?.name}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Serial Number</span>
          <p className="form-right">{item?.sr_number}</p>
        </div>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Description</span>
        <p style={{ width: "60%" }}>{item?.description}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Category</span>
        <p style={{ width: "60%" }}>{item?.category?.parent?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Sub-Category</span>
        <p style={{ width: "60%" }}>{item?.category?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Purchase Date</span>
        <p style={{ width: "60%" }}>{item?.createdAt}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Unit Price</span>
        <p style={{ width: "60%" }}>Rs {item?.price}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Current Price</span>
        <p style={{ width: "60%" }}>Rs {item?.price - 200}</p>
      </div>
      <div className="data-field no-border">
        <div className="data-field">
          <span className="form-left bold-txt">Depricated Price</span>
          <p style={{ width: "60%" }}>RS 200</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Percentage Deprication</span>
          <p style={{ width: "60%" }}>10%</p>
        </div>
      </div>
      <span className="div-heading">Vendor</span>
      <div className="data-field">
        <span className="form-left bold-txt">Name</span>
        <p style={{ width: "60%" }}>{item?.vendor?.name}</p>
      </div>
      <div className="data-field">
        <span className="form-left bold-txt">Contact Number</span>
        <p style={{ width: "60%" }}>{item?.vendor?.contact}</p>
      </div>

      {item?.user && (
        <>
          <span className="div-heading">Assigned to:</span>
          <div className="user-card">
            <div className="pfp">
              <img src={item?.user?.picture || img} alt="pfp" />
            </div>
            <div className="details">
              <span className="div-heading">{item?.user?.username}</span>
              <span className="dept">Department: {item?.user?.department}</span>
              <span className="email">{item?.user?.email}</span>
              <span className="contact">+{item?.user?.contact}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

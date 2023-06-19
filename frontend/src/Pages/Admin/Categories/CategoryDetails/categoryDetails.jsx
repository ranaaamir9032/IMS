import React, { useEffect } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import BasicMenu from "../../../../Components/DropMenu/menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCategory,
  getSingleCategory,
} from "../../../../Redux/Category/categoryActions";

export default function CategoryDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { category } = useSelector((state) => state.categoryHandler);
  console.log(category);

  const deleteCat = () => {
    dispatch(deleteCategory(id));
    navigate("/categories");
  };

  useEffect(() => {
    dispatch(getSingleCategory(id));
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
        </div>
        <div className="right-header">
          <BasicMenu route={"/category/edit/" + id} handleDelete={deleteCat} />
        </div>
      </div>
      <div className="component-body border-top" style={{ margin: "3% 0" }}>
        <div className="data-field">
          <span className="form-left bold-txt">Category Name</span>
          <p className="form-right">{category?.parent?.name}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Sub Category Name</span>
          <p className="form-right">{category?.name}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Total Qty</span>
          <p className="form-right">{category?.total}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Assigned Qty</span>
          <p className="form-right">{category?.assigned}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Unassigned Qty</span>
          <p className="form-right">{category?.unassigned}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Faulty Qty</span>
          <p className="form-right">{category?.faulty}</p>
        </div>
        <div className="vendors">
          <span
            className="component-heading"
            style={{ fontSize: "2em", fontWeight: "500" }}
          >
            {" "}
            Vendors
          </span>
          {category?.vendor?.map((v) => {
            return (
              <div className="cat-vendor-details" style={{ display: "flex" }}>
                <div className="data-field">
                  <span className="form-left bold-txt">Name</span>
                  <p className="form-right">{v?.name}</p>
                </div>
                <div className="data-field">
                  <span className="form-left bold-txt">Contact:</span>
                  <p className="form-right">{v?.contact}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

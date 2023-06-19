import React, { useEffect } from "react";
import BackBtn from "../../../../Components/Buttons/back";
import BasicMenu from "../../../../Components/DropMenu/menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { getSingleVendor } from "../../../../Redux/Vendors/vendorActions";

export default function VendorDetails() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { vendor } = useSelector((state) => state.vendorHandler);

  useEffect(() => {
    dispatch(getSingleVendor(id));
  }, []);

  return (
    <div className="container">
      <div className="component-header">
        <div className="left-header">
          <BackBtn />
        </div>
        <div className="right-header">
          <BasicMenu route = {'/vendor/edit/' + id}/>
        </div>
      </div>
      <div className="component-body">
        <div className="data-field border-top">
          <span className="form-left bold-txt">Vendor Name:</span>
          <p>{vendor?.name}</p>
        </div>
        <div className="data-field ">
          <span className="form-left bold-txt">Contact:</span>
          <p>{vendor?.contact}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Categories</span>
          <p>{vendor?.category[0].parent?.name}</p>
        </div>
        <div className="data-field">
          <span className="form-left bold-txt">Sub Categories</span>
          {vendor?.category?.map((cat) => {
            return (
              <Button
                style={{
                  color: "black",
                  background: "lightgray",
                  marginRight: "1%",
                }}
              >
                {cat?.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

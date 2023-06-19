import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import SelectField from "../../../../Components/Select/select";
import { useNavigate, useParams } from "react-router-dom";
import BackBtn from "../../../../Components/Buttons/back";
import CancelBtn from "../../../../Components/Buttons/cancel";
import SaveBtn from "../../../../Components/Buttons/save";
import { useDispatch, useSelector } from "react-redux";
import { getSingleItem } from "../../../../Redux/Inventory/itemActions";
import { editItem } from "../../../../Redux/Inventory/itemActions";

export default function EditItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const itemData = useSelector((state) => state.itemHandler.item);

  const [item, setItem] = useState({
    name: "",
    sr_number: 0,
    description: "",
    price: "",
  });

  const saveItem = () => {
    dispatch(editItem({ id: id, data: { ...item } }));
    navigate("/inventory");
  };

  useEffect(() => {
    dispatch(getSingleItem(id));
    setItem({
      name: itemData?.name,
      sr_number: itemData?.sr_number,
      description: itemData?.description,
      price: itemData?.price,
    });
  }, [dispatch]);

  return (
    <div className="container">
      <div className="component-header new-item-header">
        <div className="left-header">
          <BackBtn />
          <h1>Edit Item</h1>
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
            defaultValue={itemData?.name}
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
            defaultValue={itemData?.sr_number}
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
            defaultValue={itemData?.description}
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
          <span className="form-left">Price</span>
          <TextField
            defaultValue={itemData?.price}
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
      </form>
    </div>
  );
}

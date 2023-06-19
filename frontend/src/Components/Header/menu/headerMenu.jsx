import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import pp from "../../../assets/images/pp.jpeg";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/Users/userActions";
import { outLocal } from "../../../utils/HelperFunctions/helperFunctions";

export default function HeaderMenu() {
  const dispatch = useDispatch();
  const user = JSON.parse(outLocal('user'))?.username;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ color: "black" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar src={pp} alt="profilePic" />
        {user}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/images/logo.png";
import "./header.css";
import LabTabs from "../tabs/tabs";
import { useSelector } from "react-redux";
import HeaderMenu from "./menu/headerMenu";

export default function Header() {
  const { role } = useSelector((state) => state.userHandler);
  return (
    <Box sx={role ? { flexGrow: 1 } : { display: "none" }}>
      <AppBar position="static">
        <Toolbar className="header-container">
          <div className="pages-header">
            <div className="logo-header">
              <img src={logo} alt="logo" />
            </div>
            <div className="pages-list">
              <LabTabs />
            </div>
          </div>
          <HeaderMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

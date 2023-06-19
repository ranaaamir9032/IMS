import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";




export default function LabTabs() {
  const [routeValue, setRouteValue] = React.useState("");
  const navigate = useNavigate()
  const {role} = useSelector((state)=>state.userHandler)

  // const handleChange = (event, newValue) => {
  //   navigate(newValue);
  //   setRouteValue(newValue);
  // };

  const handleChange = (event, newValue) => {
    navigate(newValue);
    setRouteValue(newValue);
    localStorage.setItem("selectedTab", newValue); // Store the selected tab value in localStorage
  };

  React.useEffect(() => {
    const storedValue = localStorage.getItem("selectedTab");
    switch (role) {
      case "superadmin":
        setRouteValue("/dashboard");
        break;
      case "admin":
        setRouteValue("/adminDashboard");
        break;
      case "employee":
        setRouteValue("/employeeDashboard");
        break;

      default:
        break;
    }
    if (storedValue) {
      setRouteValue(storedValue); // Set the stored value as the selected tab value
    }
  }, [role]);

  return (
    <>
      {routeValue && (
        <Box sx={{ width: "100%", typography: "body1" }}>
          {role === "superadmin" && (
            <TabContext value={routeValue}>
              <Box sx={{}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Dashboard" value="/dashboard" />
                  <Tab label="Organizations" value="/organizations" />
                  <Tab label="Admins" value="/admins" />
                  <Tab label="Complaints" value="/complaints" />
                </TabList>
              </Box>
            </TabContext>
          )}
          {role === "admin" && (
            <TabContext value={routeValue}>
              <Box sx={{}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Dashboard" value="/adminDashboard" />
                  <Tab label="Inventory" value="/inventory" />
                  <Tab label="Categories" value="/categories" />
                  <Tab label="Employees" value="/employees" />
                  <Tab label="Requests" value="/requests" />
                  <Tab label="Returns" value="/returns" />
                  <Tab label="Complaints" value="/adminComplaints" />
                  <Tab label="Vendors" value="/vendors" />
                </TabList>
              </Box>
            </TabContext>
          )}
          {role === "employee" && (
            <TabContext value={routeValue}>
              <Box sx={{}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Dashboard" value="/employeeDashboard" />
                  <Tab label="Requests" value="/employee/requests" />
                  <Tab label="Complaints" value="/employee/complaints" />
                </TabList>
              </Box>
            </TabContext>
          )}
        </Box>
      )}
    </>
  );
}

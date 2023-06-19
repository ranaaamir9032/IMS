import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchBar(props) {



  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
      props.setState(props.data);
    } else {
      const filtered = props.data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(value)
        )
      );
      props.setState(filtered);
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        maxWidth: "100%",
        margin: '0 2%'
      }}
    >
      <TextField
        fullWidth
        label="Search"
        id="fullWidth"
        size="small"
        onChange={handleSearch}
      />
    </Box>
  );
}

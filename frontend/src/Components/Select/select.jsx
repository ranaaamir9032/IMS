import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectField(props) {
  const filter = () => {
    const filteredData = props.filterData.filter(
      (item) => item.props?.value === filteredData.props?.value
    );
    props.setState(filteredData);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: "20%" }} size="small">
      <InputLabel id="demo-select-small">{props.placeHolder}</InputLabel>
      <Select
        defaultValue={""}
        labelId="demo-select-small"
        id="demo-select-small"
        value={props.defaultValue}
        label="Search location"
        onChange={props.handleChange ? props.handleChange : filter}
      >
        {props.options &&
          props?.options?.map((opt, idx) => {
            return (
              <MenuItem key={idx} value={props.name ? opt.name : opt.id}>
                {opt.name}
              </MenuItem>
            );
          })}
        {props.filterData &&
          props?.filterData?.map((opt, idx) => {
            return (
              <MenuItem key={idx} value={opt.props?.value}>
                {opt.address}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

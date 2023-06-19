import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationRounded(props) {
  // Function to determine number of pages
  const pages = (d) => {
    if (d <= 0) {
      return 0;
    }
    return Math.ceil(d / 10);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pages(props.data)}
        variant="outlined"
        shape="rounded"
        page={props.page}
        onChange={(event, value)=>{
          props.setPage(value)
        }}
      />
    </Stack>
  );
}

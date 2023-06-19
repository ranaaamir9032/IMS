import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PaginationRounded from "../pagination/pagination";
import { Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function DataTable(props) {
  const [page, setPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={
                !props.collapse
                  ? { backgroundColor: "#4583F5" }
                  : { backgroundColor: "white" }
              }
            >
              {props.tableHeader?.map((heading, idx) => {
                return (
                  <TableCell
                  key={idx}
                    align="center"
                    sx={
                      !props.collapse
                        ? { color: "white" }
                        : { color: "#4583F5" }
                    }
                  >
                    {heading}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data?.length > 0 &&
              props.data
                .slice(
                  (page - 1) * dataPerPage,
                  (page - 1) * dataPerPage + dataPerPage
                )
                .map((row) => (
                  <TableRow key={row.name}>
                    {Object.values(row)?.map((e, index) =>
                      props.image && index === 1 ? (
                        <TableCell
                          style={{ display: "flex", justifyContent: "center" }}
                          key={index}
                        >
                          <Avatar variant="rounded" src={e}></Avatar>
                        </TableCell>
                      ) : (
                        typeof(e) !== "object" &&
                        <TableCell align="center" key={index}>
                          {e}
                        </TableCell>
                      )
                    )}
                    <TableCell align="center">
                      <Link to={props.route + row.id}>
                        <Button>view</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!props.recent && (
        <div className="pagination">
          <PaginationRounded
            data={props.data?.length}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

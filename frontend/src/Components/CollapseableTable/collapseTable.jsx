import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DataTable from "../table/table";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button } from "@mui/material";
import { subCatTableHeader } from "../../Constants/tableConstants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../Redux/Category/categoryActions";
import {useDispatch} from 'react-redux'

function Row(props) {
  const dispatch = useDispatch()
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()

  const deleteCat = (id) => {
    dispatch(deleteCategory(id))
    navigate('/categories')
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.child?.length > 0 ? row.child?.length : 0}</TableCell>
       <TableCell align="center">{row.vendorsLength[0] > 0 ? row.vendorsLength[0] : 0}</TableCell>
        <TableCell align="center">
          <>
            <Link to={'/addSubCategory/' + row?.id}>
            <Button className="add" size="small" style={{ color: "seagreen" }}>
              <AddIcon fontSize="small" />
            </Button>
            </Link>
            <Button className="edit" size="small" style={{ color: "orange" }} onClick = {() => {navigate('/category/edit/' + row?.id)}}>
              <EditOutlinedIcon fontSize="small" />
            </Button>
            <Button className="delete" size="small" style={{ color: "red" }} onClick={() => {deleteCat(row?.id)}}>
              <DeleteOutlinedIcon fontSize="small" />
            </Button>
          </>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <DataTable tableHeader = {subCatTableHeader} collapse={true} data = {row.child} recent = {true} route = {'/category/'}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}



export default function CollapsibleTable(props) {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#4583F5" }}>
            <TableCell style={{ color: "white", textAlign: "center" }}>
              ID
            </TableCell>
            <TableCell
              style={{ color: "white", textAlign: "center" }}
              align="right"
            >
              Category Name
            </TableCell>
            <TableCell
              style={{ color: "white", textAlign: "center" }}
              align="right"
            >
              Number of sub-categories
            </TableCell>
            <TableCell
              style={{ color: "white", textAlign: "center" }}
              align="right"
            >
              Number of Vendors
            </TableCell>
            <TableCell
              style={{ color: "white", textAlign: "center" }}
              align="right"
            >
              Actions
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row) => (
            <Row key={row.name} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import { grey } from "@mui/material/colors";
import Sidebar from '../Layout/Sidebar'
import { FallingLines } from "react-loader-spinner";
import { Typography } from "@material-ui/core";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "first_name",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "primary_mobile_number",
    numeric: false,
    disablePadding: true,
    label: "Mobile Number",
  },
  {
    id: "primary_email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "date_of_birth",
    numeric: false,
    disablePadding: true,
    label: "DOB",
  },
  {
    id: "secondary_mobile",
    numeric: false,
    disablePadding: true,
    label: "Secondary Mobile Number",
  },
  {
    id: "secondary_email",
    numeric: false,
    disablePadding: true,
    label: "Seconadary Email",
  },
  // {
  //   id: 'is_active',
  //   numeric: false,
  //   disablePadding: true,
  //   label: 'Active?',
  // },
  // {
  //   id: "addresses",
  //   numeric: false,
  //   disablePadding: true,
  //   label: "Addresses",
  // },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
   <>
   
    <TableHead sx={{ backgroundColor: "#4caf50", height: 50 }}>
      <TableRow>
        <TableCell padding="checkbox"  style={{fontWeight:'bolder',color:'white'}}>Sr No.</TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{fontWeight:'bolder',color:'white'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    </>
  );
}

EnhancedTableHead.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
};

export default function CustomersList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [originalRows, setOriginalRows] = React.useState([]);
  const [isLoader, setIsLoader] = React.useState(true);


  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem('token'))
    if(token){
      axios
        .get("http://localhost:8080/api/v1/admin/get-all-customers", {
          headers: {
            token:token
          },
        })
        .then((res) => {
          if(res){
            setTimeout(()=>{
              setIsLoader(false)
            },1000)
            setRows(res.data.data);
            setOriginalRows(res.data.data);
            console.log(res)

          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const navigate = useNavigate();

  const handleClick = (event, name) => {
    navigate(`/customer-details/${name}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );
  const handleSearch = (e) => {
    let searchTerm = e.target.value.toLowerCase();
    console.log(searchTerm);
    if (searchTerm === "") {
      setRows(originalRows);
    } else {
      let resultRows = originalRows.filter(
        (row) =>
          row.first_name.toLowerCase().includes(searchTerm) ||
          row.last_name.toLowerCase().includes(searchTerm) ||
          row.username.toLowerCase().includes(searchTerm)
      );
      setRows(resultRows); // set the filtered rows as the new rows
    }
  };

  const tableCellStylesForBlocked = {
    color: "grey",
    fontWeight: "light",
  };
  return  isLoader ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop:"18%"
      }}
    >
      <FallingLines
        color="#4fa94d"
        width="200"
        visible={true}
        ariaLabel="falling-lines-loading"
        className="mt-auto mb-auto"
      />
    </div>
  ) : (
  <>
  {originalRows && originalRows.length > 0 ? (
    <Box sx={{display:'flex'}}>
    <Sidebar></Sidebar>
   
  
    <Box
      sx={{ width: "100%", marginTop: 10, marginRight: 7, overflowX: "auto" }}
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
      <Typography
                  variant="h4"
                  sx={{marginY:'10px'}}
                  color="initial"
                >
                  Customers List
                </Typography>
        <TextField
          variant="outlined"
          label="Search customer"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          color="success"
          sx={{ marginTop: 2, marginBottom: 2, width: "75%" }}
          onChange={handleSearch}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, width: "100%" }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.username);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: row.is_active ? undefined : "#f5f5f5",
                      "&:hover": {
                        backgroundColor: row.is_active
                          ? "rgba(0, 0, 0, 0.08)"
                          : undefined,
                      },
                    }}
                  >
                    {/* <TableCell padding="checkbox" >
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell> */}
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {index + 1}
                    </TableCell>

                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.username}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.first_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.last_name}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.primary_mobile_number}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.primary_email}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.date_of_birth}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.secondary_mobile_number}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={row.is_active ? undefined : tableCellStylesForBlocked}
                    >
                      {row.secondary_email}
                    </TableCell>
                    {/* <TableCell align="center">{row.is_active?<CheckIcon/>:<ClearIcon/>}</TableCell> */}
                    {/* <TableCell align="left">
                      {row.addresses.map((address) => {
                        return (
                          <div>
                            {address.address_line_1}, {address.address_line_2},{" "}
                            {address.area}, {address.city} -
                            {address.postal_code}, {address.state},{" "}
                            {address.country}, {address.landmark}
                          </div>
                        );
                      })}
                    </TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
    </Box>
  ) : (
    <Box sx={{display:'flex'}}>
    <Sidebar></Sidebar>
   
    <Box component="h1" variant="h3" sx={{ marginTop: 25, marginLeft: 40 }}>
      No Customers Available
    </Box>
    </Box>
  )}
</>
  );
 
  
}

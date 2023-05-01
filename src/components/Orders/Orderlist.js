import React, { useEffect } from "react";
import Sidebar from "../Layout/Sidebar";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";

export default function Orderlist() {
  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.action.hover,
  //   },
  //   // hide last border
  //   '&:last-child td, &:last-child th': {
  //     border: 0,
  //   },
  // }));

  const [orderData, setOrderData] = React.useState([]);
  const [isLoader, setIsLoader] = React.useState(true);
  // let allOrdersArr=[];
  const get_All_Orders = () => {
    console.log("get_Orders_res");

    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/v1/admin/get-all-orders",
        headers: { token: token },
      };

      axios
        .request(options)
        .then(function (get_Orders_res) {
          if (get_Orders_res) {
            setTimeout(() => {
              setIsLoader(false);
            }, 2000);
            console.log("get_Orders_res", get_Orders_res);
            // allOrdersArr=get_Orders_res.data.data
            // let Date="2023-05-01"
            let orderDate = new Date().toLocaleDateString("en-CA");

            for (let i = 0; i < get_Orders_res.data.data.length; i++) {
              if (
                get_Orders_res.data.data[i].estimate_delivery_date === orderDate
              ) {
                get_Orders_res.data.data[i].estimate_delivery_date =
                  "Delivered";
                console.log("Delivered");
              }
            }
            // console.log("get_Orders_res",get_Orders_res.data.data)
            get_Orders_res.data.data.sort((a, b) => {
              if (a.createdAt < b.createdAt) {
                return 1;
              }
              if (a.createdAt > b.createdAt) {
                return -1;
              }
              return 0;
            });
            // console.log("get_Orders_res",get_Orders_res.data.data)
            setOrderData(get_Orders_res.data.data);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    get_All_Orders();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();
  const oderDetail = (id) => {
    navigate("/order-list/" + id);
  };
  const lastPostIndex = (page + 1) * rowsPerPage;
  const firstPostIndex = lastPostIndex - rowsPerPage;

  const Array = orderData.slice(firstPostIndex, lastPostIndex);
  console.log("Array", Array);
  return (
    <Sidebar>
      <Box sx={{ height: "100px" }} />
      {isLoader ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <FallingLines
            color="#4fa94d"
            width="200"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </div>
      ) : (
        <>
          {orderData ? (
            orderData.length > 0 ? (
              <>
                {orderData ? (
                  <Typography variant="h2" gutterBottom align="center">
                    Order List
                  </Typography>
                ) : null}
                <Typography variant="h6" gutterBottom align="right">
                  Total Orders {orderData.length}
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{ fontWeight: "bolder" }}
                          align="left"
                        >
                          Sr. No.
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bolder" }}
                          align="left"
                        >
                          Username
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bolder" }}
                          align="left"
                        >
                          Order Date
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bolder" }}
                          align="left"
                        >
                          Estimate Delivery Date
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bolder" }}
                          align="left"
                        >
                          Paid Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderData
                        ? orderData.map((row, index) => (
                            <TableRow
                              key={index}
                              onClick={() => oderDetail(row.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                align="left"
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell align="left">
                                {row.customer.username}
                              </TableCell>
                              <TableCell align="left">
                                {row.order_date}
                              </TableCell>
                              <TableCell align="left">
                                {row.estimate_delivery_date}
                              </TableCell>
                              <TableCell align="left">
                                {row.paid_amount}
                              </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={orderData.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <Typography variant="h4" gutterBottom align="center">
                No Orders Are There
              </Typography>
            )
          ) : null}
        </>
      )}
    </Sidebar>
  );
}

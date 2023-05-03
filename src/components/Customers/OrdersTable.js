import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom"; 
import { Box } from "@mui/material";
import React, { useState } from "react";


function OrdersTable(props) {
  const [orderData, setOrderData] = useState([]);
  const { userDetails } = props;
  const orderDetail = userDetails.orders;
  const navigate = useNavigate();
 

  const orderItems = (id , userDetails) => {
    navigate(`/order-items/${id}`);
  
  };
  // if(orderDetail){
  //     setOrderData(orderDetail)
  // }
  console.log(orderDetail, "userdetails");
  return (
    <>
      <Box component="h3" textAlign="center">
        Orders Details
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "#2e7d32" }}>
            <TableRow>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Sr. No.
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Order date
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Order Status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Estimate Delivery Date
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Paid Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Payment status
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Special Note
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Sub Total
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Tax Amount
              </TableCell>
              <TableCell
                style={{ fontWeight: "bolder", color: "white" }}
                align="left"
              >
                Total Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetail ? (
              orderDetail.map((row, index) => (
                <TableRow 
                  key={index}
                  onClick={() => orderItems(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.order_date}</TableCell>
                  <TableCell align="left">{row.order_status_masters.title}</TableCell>
                  <TableCell align="left">
                    {row.estimate_delivery_date}
                  </TableCell>
                  <TableCell align="left">{row.paid_amount}</TableCell>
                  <TableCell align="left">{row.payment_status_masters.title}</TableCell>
                  <TableCell align="left">{row.special_note}</TableCell>
                  <TableCell align="left">{row.sub_total}</TableCell>
                  <TableCell align="left">{row.tax_amount}</TableCell>
                  <TableCell align="left">{row.total_amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10}>
                  <Typography variant="h4" gutterBottom align="center">
                    No Orders Are There
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
                  </Table>
      </TableContainer>
    </>
  );
}

export default OrdersTable;

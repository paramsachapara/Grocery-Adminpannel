import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import {Typography} from "@mui/material";

import {Box} from "@mui/material";
import React, { useState } from "react";

function OrdersTable(props) {
    const [orderData,setOrderData] = useState([])
    const {userDetails} = props 
    // const orderDetail = userDetails.orders
    // if(orderDetail){
    //     setOrderData(orderDetail)
    // }
  return (
    <>

<Box component='h3' textAlign='center'>Orders Details</Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead  sx={{ backgroundColor: "#2e7d32" }}>
          <TableRow>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Sr. No.
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Order date
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Order Status
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Estimate Delivery Date
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Paid Amount
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Payment status
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
             Special Note
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Sub Total
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Tax Amount
            </TableCell>
            <TableCell style={{ fontWeight: "bolder",color:'white' }} align="left">
              Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {orderData ? (
            orderData.map((row, index) => (
              <TableRow
                key={index}
                onClick={() => orderDetail(row.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell component="th" scope="row" align="left">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{row.customer.username}</TableCell>
                <TableCell align="left">{row.order_date}</TableCell>
                <TableCell align="left">{row.estimate_delivery_date}</TableCell>
                <TableCell align="left">{row.paid_amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <Typography variant="h4" gutterBottom align="center">
              No Orders Are There
            </Typography>
          )}
        </TableBody> */}
      </Table>
    </TableContainer>
    </>
  );
}

export default OrdersTable;

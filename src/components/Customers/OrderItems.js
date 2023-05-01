import React from "react";
import Sidebar from "../Layout/Sidebar";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";



function OrderItems() {
  const navigate = useNavigate();
  let orderItems = []
  let orderData = []
  return (
    <>
      <Sidebar />
      <Box marginTop={5} marginLeft={35} marginRight={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tooltip title="Go Back">
            <IconButton onClick={() => navigate("/customer-list")}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Tooltip>
          <Box component="h3">Ordered Items</Box>
          <h4>Total Items</h4>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Sr. No.
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Product Name
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Quantity
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Product Amount
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Total Product Amount
                </TableCell>
                <TableCell style={{ fontWeight: "bolder" }} align="left">
                  Product Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderItems.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row" align="left">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{row.product.title}</TableCell>
                  <TableCell align="left">{row.qty}</TableCell>
                  <TableCell align="left"> ₹{row.product.amount}</TableCell>
                  <TableCell align="left">
                    {" "}
                    ₹{row.product.amount * row.qty}
                  </TableCell>
                  <TableCell align="left">{row.product.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ height: "30px" }} />
        <Box
          sx={{
            width: 300,
            height: 300,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 270 }} aria-label="customized table">
              <TableBody>
                <TableRow>
                  <TableCell align="left">Subtotal :-</TableCell>
                  <TableCell align="left">
                    ₹{orderData ? orderData.sub_total : 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Tax Amount :-</TableCell>
                  <TableCell align="left">
                    ₹{orderData ? orderData.tax_amount : 0}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: "bolder" }}>
                    Paid Amount :-
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "bolder" }}>
                    ₹{orderData ? orderData.paid_amount : 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default OrderItems;

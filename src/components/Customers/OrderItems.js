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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function OrderItems() {
  const navigate = useNavigate();
  const {orderId} = useParams()
  const [value, setValue] = React.useState(0);
  const [orderData,setOrderData]=React.useState([])
  const [orderItems,setOrderItems]=React.useState([])
  const [isLoader,setIsLoader]=React.useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   

  const get_All_Orders=()=>{
    console.log("get_Orders_res");

      let token=JSON.parse(sessionStorage.getItem("token"));
      if(token){
  const options = {
    method: "get",
    url: "http://localhost:8080/api/v1/admin/get-all-orders",
    headers: 
      {'token': token}
    
  };

  axios
  .request(options)
        .then(function (get_Orders_res) {
          if (get_Orders_res) {
            // setTimeout(() => {
            //   setIsLoader(false)
            // }, 2000);
            console.log("get_Orders_res",get_Orders_res);
     
            let orderDate = new Date().toLocaleDateString('en-CA')
            for(let i=0;i<get_Orders_res.data.data.length;i++){      
              if(get_Orders_res.data.data[i].id==orderId){
                get_Orders_res.data.data=get_Orders_res.data.data[i]
                console.log("get_Orders_res.data.data ",get_Orders_res.data.data)
                // console.log("get_Orders_res.data.data ",get_Orders_res.data.data[i])
                if(get_Orders_res.data.data.estimate_delivery_date===orderDate){
                  get_Orders_res.data.data.estimate_delivery_date="Delivered"
                  console.log("Delivered")
                }
              }
            }
            
            setOrderData(get_Orders_res.data.data)
            setOrderItems(get_Orders_res.data.data.order_items)
            console.log("customerDetails",orderData)
          }
        })
        .catch(function (error) {
          console.error(error);
        });
       
  }
  }
  useEffect(()=>{
    console.log(orderId)
    get_All_Orders()
},[])

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
            <IconButton onClick={() => navigate(`/customer-details/${orderData.customer_id}`)}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Tooltip>
          <Box component="h3">Ordered Items</Box>
          <h4>Total Items : {orderItems ? orderItems.length : 0}</h4>
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

import { Box, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Sidebar from '../Layout/Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Orderdetails(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    const params = useParams();
    const [orderData,setOrderData]=React.useState([])
    const [orderItems,setOrderItems]=React.useState([])


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
              
              console.log("get_Orders_res",get_Orders_res);
              // allOrdersArr=get_Orders_res.data.data
              // let Date="2023-05-01"
              let orderDate = new Date().toLocaleDateString('en-CA')
              // let orderDataById=[]
              for(let i=0;i<get_Orders_res.data.data.length;i++){
                // console.log("get_Orders_res.data.data ",get_Orders_res.data.data[i])
                // eslint-disable-next-line eqeqeq
                if(get_Orders_res.data.data[i].id==params.id){
                  // orderDataById=get_Orders_res.data.data;
                  // console.log("Order by Id ",orderDataById)
                  get_Orders_res.data.data=get_Orders_res.data.data[i]
                  console.log("get_Orders_res.data.data ",get_Orders_res.data.data)
                  if(get_Orders_res.data.data.estimate_delivery_date===orderDate){
                    get_Orders_res.data.data.estimate_delivery_date="Delivered"
                    console.log("Delivered")
                  }
                }
              }
              
              setOrderData(get_Orders_res.data.data)
              setOrderItems(get_Orders_res.data.data.order_items)
            }
          })
          .catch(function (error) {
            console.error(error);
          });
         
    }
    }
    useEffect(()=>{
      console.log(params.id)
      get_All_Orders()
  },[])
    return (
        <Sidebar>
          <Box sx={{ height: "100px" }} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Order Items" {...a11yProps(0)} />
    <Tab label="Item Two" {...a11yProps(1)} />
    <Tab label="Item Three" {...a11yProps(2)} />
  </Tabs>
</Box>
<TabPanel value={value} index={0}>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}} align="left">Sr. No.</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Quantity</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Product Amount</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Product Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems.map((row,index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="left">
                {index+1}
              </TableCell>
                <TableCell align="left">{row.product.title}</TableCell>
                <TableCell align="left">{row.qty}</TableCell>
                <TableCell align="left">{row.product.amount}</TableCell>
                <TableCell align="left">{row.product.description}</TableCell>
              </TableRow>
          ))}
        </TableBody>
        {/* <TableRow>
        <TableCell align="center" colSpan={5}>
              Subtotal :- {orderData ? orderData.sub_total:0}
            </TableCell>
        </TableRow> */}
      </Table>
    </TableContainer>
</TabPanel>
<TabPanel value={value} index={1}>
  Item Two
</TabPanel>
<TabPanel value={value} index={2}>
  Item Three
</TabPanel>
        </Sidebar>
    )
}
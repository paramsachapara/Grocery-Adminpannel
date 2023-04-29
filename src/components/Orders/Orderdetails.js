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
    // const [customerDetails,setCustomerDetails]=React.useState([])


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
              console.log("customerDetails",orderData)
              // customerDetails.push(get_Orders_res.data.data.customer)
              // setCustomerDetails(customerDetails.push(get_Orders_res.data.data.customer))
              // console.log("customerDetails",customerDetails)
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
          <Typography  variant="h3" gutterBottom align='center'>
      Order Details
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Order Items" {...a11yProps(0)} style={{fontWeight:'bolder'}}/>
    <Tab label="Customer Details" {...a11yProps(1)} style={{fontWeight:'bolder'}} />
    <Tab label="Customer Address" {...a11yProps(2)} style={{fontWeight:'bolder'}} />
  </Tabs>
</Box>
<TabPanel value={value} index={0}>
<Typography  variant="h4" gutterBottom align='center'>
      Order Items
      </Typography>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}} align="left">Sr. No.</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Product Name</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Quantity</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Product Amount</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Total Product Amount</TableCell>
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
                <TableCell align="left"> ₹{row.product.amount}</TableCell>
                <TableCell align="left"> ₹{row.product.amount * row.qty}</TableCell>
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
<TableContainer component={Paper} >
      <Table sx={{ minWidth: 270 }} aria-label="customized table" >
        <TableBody>
        <TableRow>
        <TableCell align="left" >
              Subtotal :-
            </TableCell>
        <TableCell align="left" >
        ₹{orderData ? orderData.sub_total:0}
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="left" >
            Tax Amount :- 
            </TableCell>
        <TableCell align="left" >
        ₹{orderData ? orderData.tax_amount:0}
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="left"  style={{fontWeight:'bolder'}}>
        Paid Amount :- 
            </TableCell>
        <TableCell align="left"  style={{fontWeight:'bolder'}}>
        ₹{orderData ? orderData.paid_amount:0}
            </TableCell>
        </TableRow>  
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
</TabPanel>
<TabPanel value={value} index={1}>
<Typography  variant="h4" gutterBottom align='center'>
      Customes Details
      </Typography>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <TableCell style={{fontWeight:'bolder'}} align="left">Sr. No.</TableCell> */}
            <TableCell style={{fontWeight:'bolder'}} align="left">First Name</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Last Name</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Primary Mobile No.</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Primary Email Id</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Date Of Birth</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Secondary Mobile No.</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Secondary Email Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {customerDetails.map((row,index) => ( */}
            <TableRow>
                <TableCell align="left">{ orderData.customer ? orderData.customer.first_name : null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.last_name : null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.primary_mobile_number : null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.primary_email : null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.date_of_birth ? orderData.customer.date_of_birth : '----'  :null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.secondary_mobile_number ? orderData.customer.secondary_mobile_number : '----': null}</TableCell>
                <TableCell align="left">{ orderData.customer ? orderData.customer.secondary_email? orderData.customer.secondary_email : '----' : null}</TableCell>
              </TableRow>
           {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{ height: "30px" }} />

</TabPanel>
<TabPanel value={value} index={2}>
<Typography  variant="h4" gutterBottom align='center'>
      Customer Address
      </Typography>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <TableCell style={{fontWeight:'bolder'}} align="left">Sr. No.</TableCell> */}
            <TableCell style={{fontWeight:'bolder'}} align="left">Tag</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Address line 1</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Address line 2</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Area</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Country</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">State</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">City</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Landmark</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Postal Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {customerDetails.map((row,index) => ( */}
            <TableRow>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.tag : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.address_line_1 : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.address_line_2 : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.area : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.country : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.state : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.city : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.landmark : null}</TableCell>
                <TableCell align="left">{ orderData.billing_address ? orderData.billing_address.postal_code : null}</TableCell>
              </TableRow>
           {/* ))} */}
        </TableBody>
      </Table>
    </TableContainer>
</TabPanel>
        </Sidebar>
    )
}
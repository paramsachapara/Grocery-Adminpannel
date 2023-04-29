import React, { useEffect } from "react";
import Sidebar from '../Layout/Sidebar'
import TablePagination from '@mui/material/TablePagination';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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

const [orderData,setOrderData]=React.useState([])
const [isLoader,setIsLoader]=React.useState(true)
  // let allOrdersArr=[];
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
            setTimeout(() => {
              setIsLoader(false)
            }, 2000);
            console.log("get_Orders_res",get_Orders_res);
            // allOrdersArr=get_Orders_res.data.data
            // let Date="2023-05-01"
            let orderDate = new Date().toLocaleDateString('en-CA')
            
            for(let i=0;i<get_Orders_res.data.data.length;i++){
              if(get_Orders_res.data.data[i].estimate_delivery_date===orderDate){
                get_Orders_res.data.data[i].estimate_delivery_date="Delivered"
                console.log("Delivered")
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
            setOrderData(get_Orders_res.data.data)
          }
        })
        .catch(function (error) {
          console.error(error);
        });
       
  }
  }
  useEffect(()=>{
    get_All_Orders()
},[])

  // const Orders=[
  //   { "id": 1, "name": "John" },
  //   { "id": 2, "name": "Sophia" },
  //   { "id": 3, "name": "Edward" },
  //   { "id": 4, "name": "Mia" },
  //   { "id": 5, "name": "Ethan" },
  //   { "id": 6, "name": "Emma" },
  //   { "id": 7, "name": "Olivia" },
  //   { "id": 8, "name": "Ava" },
  //   { "id": 9, "name": "Noah" },
  //   { "id": 10, "name": "Liam" },
  //   { "id": 11, "name": "William" },
  //   { "id": 12, "name": "James" },
  //   { "id": 13, "name": "Benjamin" },
  //   { "id": 14, "name": "Lucas" },
  //   { "id": 15, "name": "Henry" },
  //   { "id": 16, "name": "Alexander" },
  //   { "id": 17, "name": "Logan" },
  //   { "id": 18, "name": "Elijah" },
  //   { "id": 19, "name": "Daniel" },
  //   { "id": 20, "name": "Isabella" },
  //   { "id": 21, "name": "Sofia" },
  //   { "id": 22, "name": "Charlotte" },
  //   { "id": 23, "name": "Amelia" },
  //   { "id": 24, "name": "Mia" },
  //   { "id": 25, "name": "Harper" },
  //   { "id": 26, "name": "Evelyn" },
  //   { "id": 27, "name": "Abigail" },
  //   { "id": 28, "name": "Emily" },
  //   { "id": 29, "name": "Scarlett" },
  //   { "id": 30, "name": "Elizabeth" },
  //   { "id": 31, "name": "Chloe" },
  //   { "id": 32, "name": "Victoria" },
  //   { "id": 33, "name": "Grace" },
  //   { "id": 34, "name": "Avery" },
  //   { "id": 35, "name": "Madison" },
  //   { "id": 36, "name": "Lily" },
  //   { "id": 37, "name": "Hannah" },
  //   { "id": 38, "name": "Lila" },
  //   { "id": 39, "name": "Nora" },
  //   { "id": 40, "name": "Riley" },
  //   { "id": 41, "name": "Lucy" },
  //   { "id": 42, "name": "Zoe" },
  //   { "id": 43, "name": "Penelope" },
  //   { "id": 44, "name": "Aria" },
  //   { "id": 45, "name": "Mila" },
  //   { "id": 46, "name": "Leah" },
  //   { "id": 47, "name": "Audrey" },
  //   { "id": 48, "name": "Eleanor" },
  //   { "id": 49, "name": "Stella" },
  //   { "id": 50, "name": "Ellie" },
  //   { "id": 51, "name": "Nathan" },
  //   { "id": 52, "name": "Gabriel" },
  //   { "id": 53, "name": "Caleb" },
  //   { "id": 54, "name": "Owen" },
  //   { "id": 55, "name": "Jonah" },
  //   { "id": 56, "name": "Samuel" },
  //   { "id": 57, "name": "Levi" },
  //   { "id": 58, "name": "Isaac" },
  //   { "id": 59, "name": "Matthew" },
  //   { "id": 60, "name": "Luke" },
  //   { "id": 61, "name": "David" },
  //   { "id": 62, "name": "Joseph" },
  //   { "id": 63, "name": "Ashton" },
  //   { "id": 64, "name": "Mason" },
  //   { "id": 65, "name": "Connor" },
  //   { "id": 66, "name": "Landon" },
  //   { "id": 67, "name": "Aaron" },
  //   { "id": 68, "name": "Gavin" },
  //   { "id": 69, "name": "Jackson" },
  //   { "id": 70, "name": "William" },
  //   { "id": 71, "name": "Sebastian" },
  //   { "id": 72, "name": "Henry" },
  //   { "id": 73, "name": "Ryan" },
  //   { "id": 74, "name": "Nicholas" },
  //   { "id": 75, "name": "Dylan" },
  //   { "id": 76, "name": "Ethan" },
  //   { "id": 77, "name": "Christopher" },
  //   { "id": 78, "name": "Jason" },
  //   { "id": 79, "name": "Aiden" },
  //   { "id": 80, "name": "Leo" },
  //   { "id": 81, "name": "Grayson" },
  //   { "id": 82, "name": "Jacob" },
  //   { "id": 83, "name": "Lucas" },
  //   { "id": 84, "name": "Cole" },
  //   { "id": 85, "name": "Miles" },
  //   { "id": 86, "name": "Elijah" },
  //   { "id": 87, "name": "Arthur" },
  //   { "id": 88, "name": "Felix" },
  //   { "id": 89, "name": "Jude" },
  //   { "id": 90, "name": "Hudson" },
  //   { "id": 91, "name": "Adam" },
  //   { "id": 92, "name": "Oscar" },
  //   { "id": 93, "name": "George" },
  //   { "id": 94, "name": "Kai" },
  //   { "id": 95, "name": "Connor" },
  //   { "id": 96, "name": "Thomas" },
  //   { "id": 97, "name": "Max" },
  //   { "id": 98, "name": "Alex" },
  //   { "id": 99, "name": "Peter" },
  //   { "id": 100, "name": "Simon" }
  // ]
  
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const navigate=useNavigate()
    const oderDetail=(id)=>{
      navigate("/order-list/"+id)
    }
    const lastPostIndex= (page+1) * rowsPerPage
    const firstPostIndex=lastPostIndex - rowsPerPage

    const Array=orderData.slice(firstPostIndex,lastPostIndex)
    console.log("Array",Array)
    return (
      <Sidebar>
        <Box sx={{ height: "100px" }} />
      {
        isLoader ? 
        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }}
    >
      <FallingLines
        color="#4fa94d"
        width="200"
        visible={true}
        ariaLabel='falling-lines-loading'
      />
    </div> : 
      <>
      {orderData ? <Typography  variant="h2" gutterBottom align='center'>
      Order List
      </Typography>:null}
      <Typography  variant="h6" gutterBottom align='right'>
      Total Orders {orderData.length}  
      </Typography>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bolder'}} align="left">Sr. No.</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Username</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Order Date</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Estimate Delivery Date</TableCell>
            <TableCell style={{fontWeight:'bolder'}} align="left">Paid Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderData ? orderData.map((row,index) => (
            <TableRow key={index} onClick={() => oderDetail(row.id)} style={{cursor:'pointer'}}>
              <TableCell component="th" scope="row" align="left">
                {index+1}
              </TableCell>
              <TableCell align="left">{row.customer.username}</TableCell>
              <TableCell align="left">{row.order_date}</TableCell>
              <TableCell align="left">{row.estimate_delivery_date}</TableCell>
              <TableCell align="left">{row.paid_amount}</TableCell>
            </TableRow>
          )): 
          <Typography  variant="h4" gutterBottom align='center'>
      No Orders Are There
      </Typography>
          }
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

    }

    </Sidebar>
    );
  }






import { Box, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import React from 'react';
import { useNavigate } from 'react-router-dom';


// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f8f8f8',
//   },
//   text: {
//     textAlign: 'center',
//     color:'green'
//   },
// }));

function ErrorPage() {
//   const classes = useStyles();
const navigate = useNavigate();
  const ErrorPageNavigate=()=>{
    let token=JSON.parse(sessionStorage.getItem('token'));
    if(token){
        navigate("/all-product")
    }else{
        navigate("/")
    }
  }


  return (
    //   <Container className={classes.container}>
    
    <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:"10px" }}>
      <div>
            <Box sx={{ height: "100px" }} />
        <Typography variant="h1" color="success" style={{textAlign: 'center',color:'green'}}>
          Oops!
        </Typography>
        <Typography variant="h5" color="success" style={{textAlign: 'center',color:'green'}}>
          Something went wrong.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:"20px" }}>
  <Button variant="contained" color="success" onClick={ErrorPageNavigate}>
    Go Back
  </Button>
  </Box>
      </div>
</Box>
    // </Container>
  );
}

export default ErrorPage;

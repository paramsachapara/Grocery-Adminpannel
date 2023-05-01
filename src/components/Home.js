import React from "react";
import CustomersList from "./Customers/CustomersList";
import { Box } from "@mui/material";

import Sidebar from "./Layout/Sidebar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AddProduct from "./Products/AddProduct";

export function Home() {
  return (
    <>
    <Box sx={{display:'flex'}}>
      <Sidebar></Sidebar>
     
    </Box>
    </>
  );
}

export default Home;

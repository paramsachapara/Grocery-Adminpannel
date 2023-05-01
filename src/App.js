import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/Products/AddProduct";
import CustomersDetails from "./components/Customers/CustomersDetails";
// import PrivateComponent from "./PrivateComponent";

// import Login from "./pages/Login";

const App = () => {
  return (
    
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/customer-details/:customerId" element={<CustomersDetails />} />


        {/* <Route element={<PrivateComponent />}> */}
        </Route>
      </Routes>
    
  );
};

export default App;

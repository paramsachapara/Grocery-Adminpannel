import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CustomersDetails from "./components/Customers/CustomersDetails";
import PrivateRoutes from "./components/PrivateRoutes";

import AddCategory from "./components/Category/AddCategory";
import SubCategory from "./components/Category/SubCategory";

import Orderlist from "./components/Orders/Orderlist";
import Orderdetails from "./components/Orders/Orderdetails";
import CustomersList from "./components/Customers/CustomersList";
import OrderItems from "./components/Customers/OrderItems";
// import PrivateComponent from "./PrivateComponent";

// import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-product" element={<AllProduct />}></Route>
        <Route path="/customer-list" element={<CustomersList />} />
        <Route
          path="/customer-details/:customerId"
          element={<CustomersDetails />}
        />
        <Route
          path="/order-items/:orderId"
          element={<OrderItems />}
        />
         <Route path="/add-category" element={<AddCategory />}/>
        <Route path="add-category/sub-category/:id" element={<SubCategory/>}/>
        <Route path="/order-list" element={<Orderlist />} />
        <Route path="/order-list/:id" element={<Orderdetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signup />} exact />

      {/* <Route element={<PrivateComponent />}> */}

      {/* <Route element={<PrivateComponent />}>
        </Route> */}
    </Routes>
  );
};

export default App;

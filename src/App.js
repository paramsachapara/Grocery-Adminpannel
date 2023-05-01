import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/Products/AddProduct";
import PrivateRoutes from "./components/PrivateRoutes";
<<<<<<< HEAD
import AddCategory from "./components/Category/AddCategory";
import SubCategory from "./components/Category/SubCategory";
=======
import Orderlist from "./components/Orders/Orderlist";
import Orderdetails from "./components/Orders/Orderdetails";
>>>>>>> 8c7269d8ba219d298246fd38178a8f8a0174cc69
// import PrivateComponent from "./PrivateComponent";

// import Login from "./pages/Login";

const App = () => {
  return (
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/order-list" element={<Orderlist />} />
        <Route path="/order-list/:id" element={<Orderdetails />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signup />} exact />
        <Route path="/add-category" element={<AddCategory />}/>
        <Route path="add-category/sub-category/:id" element={<SubCategory/>}/>
        {/* <Route element={<PrivateComponent />}>
        </Route> */}
      </Routes>
  );
};

export default App;

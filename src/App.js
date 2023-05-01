import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProduct from "./components/Products/AddProduct";
import PrivateRoutes from "./components/PrivateRoutes";
import AddCategory from "./components/Category/AddCategory";
import SubCategory from "./components/Category/SubCategory";
// import PrivateComponent from "./PrivateComponent";

// import Login from "./pages/Login";

const App = () => {
  return (
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
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

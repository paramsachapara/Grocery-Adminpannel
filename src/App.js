import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Signup from './components/Signup'
import AddProduct from "./components/Products/AddProduct";
// import PrivateComponent from "./PrivateComponent";

// import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />

        {/* <Route element={<PrivateComponent />}>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

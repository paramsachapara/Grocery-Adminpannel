import React from "react";
import { Outlet } from "react-router-dom";
import Signup from "./assets/components/Signup";

const PrivateComponent = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Signup />;
};

export default PrivateComponent;

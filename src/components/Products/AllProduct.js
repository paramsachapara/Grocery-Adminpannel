import React, { useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function AllProduct() {
  const fertchAllProduct = () => {
    let token = sessionStorage.getItem("token");
    if (!token) {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/v1/product/get-all-products",
      };

      axios
        .request(options)
        .then((responce) => {
          console.log("All product responce", responce);
        })
        .catch(function (error) {
          console.error(error);
          toast.error(
            error.response.data.message
              ? error.response.data.message
              : "Error With fetchin product",
            {
              position: "bottom-center",
              duration: 3000,
            }
          );
        });
    } else {
      toast.error("please do login first...", {
        position: "bottom-center",
        duration: 800,
      });
    }
  };
  useEffect(() => {
    fertchAllProduct();
  }, []);
  return (
    <>
      <div>
        <Toaster></Toaster>
      </div>
    </>
  );
}

export default AllProduct;

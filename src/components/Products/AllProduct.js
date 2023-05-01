
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Sidebar from "../Layout/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import EditProductDialog from "./EditProductDialog"

import Encryption from "./Encryption";
import EditProductForm from "./EditProductForm";
function AllProduct() {
  const [encryptedId, setEncryptedId] = useState("");
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);

  let data;

  // Fetch data on component mount
  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/v1/product/get-all-products",
      };

      axios
        .request(options)
        .then((response) => {
          console.log("All product response", response);
          data = response.data.data;
          setTableData(data);
          console.log("res data", data);
        })
        .catch(function (error) {
          console.error(error);
          toast.error(
            error.response.data.message
              ? error.response.data.message
              : "Error With fetching product",
            {
              position: "bottom-center",
              duration: 3000,
            }
          );
        });
    } else {
      toast.error("Please login first...", {
        position: "bottom-center",
        duration: 800,
      });
    }
  };

    const handleDelete = (id) => {
    axios
      .get("http://localhost:8080/api/v1/encryption", {
        headers: {
          id: id,
        },
      })
      .then((res) => {
        console.log("id", id);
        console.log("Eid", res.data.data);
       
        let token = JSON.parse(sessionStorage.getItem("token"));
        if (token) {
          const options = {
            method: "delete",
            url: "http://localhost:8080/api/v1/product/delete-product",
            headers: { token: token, product_id: res.data.data },
          };
          axios
            .request(options)
            .then(function (res) {
              console.log("deleted successfuly");
            })
            .catch(function (error) {
              console.log("erreor in deletion", error);
            });
        }
        const index = tableData.findIndex((item) => item.id === id);
        console.log(index);
        tableData.splice(index, 1);
        console.log(tableData);
        setTableData(tableData);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProduct = (values) => {
    const updatedProduct = { ...selectedProduct, ...values };
    console.log("Updated Product: ", updatedProduct);
    // Make API call to update product here
    handleClose();
  };

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <div className="toolbar" />
        <TableContainer style={{ marginTop: "25px", marginLeft: "15px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                {/* <TableCell>Category</TableCell> */}
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData &&
                tableData.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(product)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(product._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EditProductDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        selectedProduct={selectedProduct}
        
      />

        {/* Dialog for editing product */}
        {/* <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update the product details below:
            </DialogContentText>
            <EditProductForm
              initialValues={selectedProduct}
              onSubmit={(values) => {
                // Make an API call to update the product with the new values
                handleUpdateProduct(selectedProduct.id, values);
                setOpenEditDialog(false);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog> */}

      
      </div>
    </>
  );
}
export default AllProduct;

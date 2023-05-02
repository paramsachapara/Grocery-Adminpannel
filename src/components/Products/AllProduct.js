import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Layout/Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import EditProductDialog from "./EditProductDialog"


function AllProduct() {

  const [tableData, setTableData] = useState([]);
  const [setOpen] = useState(false);
  const [block,setblock] =useState(false)
  const [selectedProduct, setSelectedProduct] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [title, setTitle] = useState("");

  let data;

  // Fetch data on component mount
  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fonttheme = createTheme({
    typography: {
      fontSize: 25,
    },
  });

  const boldFontTheme = createTheme({
    typography: {
      fontSize: 30,
      fontWeight: "bold",
    },
  });

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
            headers: { "token": token, "product_id": res.data.data },
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
 const handleBlock=(id)=>{
  let token = JSON.parse(sessionStorage.getItem("token"));
  if (token){
      axios
      .get("http://localhost:8080/api/v1/encryption", {
        headers: {
          id: id,
        },
      })
      .then((res)=>{
        if(block){
          
          axios  
          .put( "http://localhost:8080/api/v1/product/active-product", {
              headers: { 
                "token": token, "product_id": res.data.data 
              }
            })
          .then(()=>{
            toast.success("product BLOCKED successfully...", {
              position: "bottom-center",
              duration: 800,
            });
            setblock(true)
          })
        }
        else{

        }
      })
     .catch((error) => {
        console.log(error, "error");
      });
  }else//admin not found
  {
    console.log("admin not found")
  }
 }
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
      <Sidebar>
        <div
          className="toolbar"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ThemeProvider theme={fonttheme}>
            <TableContainer
              style={{
                marginTop: "50px",
                width: "60%",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <Table>
                <TableHead>
                  <ThemeProvider theme={boldFontTheme}>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      {/* <TableCell>Category</TableCell> */}
                      <TableCell>Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </ThemeProvider>
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
                            <IconButton
                              onClick={() => handleDelete(product._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Block">
                            <IconButton
                              onClick={() => handleBlock(product._id)}
                              color={product.is_active ? "primary" : "danger"}
                            >
                              <BlockIcon />
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
          </ThemeProvider>
        </div>
      </Sidebar>
    </>
  );
}
export default AllProduct;

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
  Paper,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import EditProductDialog from "./EditProductDialog";
import ConfirmDelete from "../Customers/ConfirmDelete";
import { FallingLines } from "react-loader-spinner";
import {Typography} from "@mui/material";



function AllProduct() {
  const [tableData, setTableData] = useState([]);
  
  const [block, setblock] = useState(false);
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [isLoader, setIsLoader] = React.useState(true);

  // Fetch data on component mount
 
  useEffect(() => {
    fetchAllProduct();
  }, [openBlockDialog,openUnblockDialog,openEditDialog]);
  const fonttheme = createTheme({
    typography: {
      fontSize: 15,
    },
  });
  const boldFontTheme = createTheme({
    typography: {
      fontSize: 30,
      fontWeight: "bold",
    },
  });
  const headColor = createTheme({
    typography: {
      color : "white"
    },
  });

  const handleYesForBlock = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      console.log(id, "id");
      axios
        .get("http://localhost:8080/api/v1/encryption", {
          headers: {
            id: id,
          },
        })
        .then((res) => {
          console.log(token, "rezs");
          axios
            .put(
              "http://localhost:8080/api/v1/product/inactive-product",
              {},
              {
                headers: {
                  product_id: res.data.data,
                  token: token,
                },
              }
            )
            .then((res) => {
              console.log("inactive product responce", res);
              setOpenBlockDialog(false);
              setTableData((tableData) =>{
                tableData.map((item) => {
                  if(item.product_id == id){
                    item.is_active=true;
                  }
                })
                
                return tableData});
            })
            .catch((error) => {
              console.log("inactive product error", error);
            });
        })
        .catch(() => {});
    }
  };
  const handleYesForUnblock = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      axios
        .get("http://localhost:8080/api/v1/encryption", {
          headers: {
            id: id,
          },
        })
        .then((res) => {
          axios
            .put(
              "http://localhost:8080/api/v1/product/active-product",
              {},
              {
                headers: {
                  token: token,
                  product_id: res.data.data,
                },
              }
            )
            .then((res) => {
              console.log("product is unblocked", res);
              setOpenUnblockDialog(false);

              setTableData((tableData) =>{
                tableData.map((item) => {
                  if(item.product_id === id){
                    item.is_active=!item.is_active;
                  }
                })
                
                return tableData});
            })
            .catch((error) => {
              console.log("active product error", error);
            });
        })
        .catch(() => {});
    }
  };
  const handleNoForUnblock = () => {
    setOpenUnblockDialog(false);
  };
  const handleNoForBlock = () => {
    setOpenBlockDialog(false);
  };


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
          if(response){
            let data;
            console.log("All product response", response);
            data = response.data.data;
            setTableData(data);
            console.log("res data", data);
            setTimeout(()=>{
              setIsLoader(false)
            },1500)
          }
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

              // Remove the deleted product from tableData and set the new array as state
              setTableData((tableData) =>
                tableData.filter((item) => item.id !== id)
              );
            })
            .catch(function (error) {
              console.log("erreor in deletion", error);
            });
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
   
  };
  const handleUnBlock = (product_id) => {
    setId(product_id);
   
    setOpenUnblockDialog(true);
  };
  const handleBlock = (product_id) => {
    setId(product_id);
    console.log(product_id, "id");
    
    setOpenBlockDialog(true);
  };
  const handleClose = () => {
   
  };

  const handleUpdateProduct = (values) => {
    const updatedProduct = { ...selectedProduct, ...values };
    console.log("Updated Product: ", updatedProduct);
    // Make API call to update product here
    handleClose();
  };

 
  

  return (
    isLoader ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginTop:"18%"
        }}
      >
        <FallingLines
          color="#4fa94d"
          width="200"
          visible={true}
          ariaLabel="falling-lines-loading"
          className="mt-auto mb-auto"
        />
      </div>
    ) : (
    <>
      <Sidebar>
      
        <div
          className="toolbar"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ThemeProvider theme={fonttheme}>
            <TableContainer
              sx={{
                marginTop: "50px",
                width: "100%",
                maxWidth: "1200px",
                alignItems: "center",
                overflowX: "auto",
                "@media (max-width: 768px)": {
                  fontSize: "16px",
                },
              }}
            >
                <Typography
                  variant="h4"
                  sx={{marginY:'10px'}}
                  color="initial"
                >
                  All Products
                </Typography>
              <Paper elevation={24} variant="outlined">

              <Table sx={{ padding: "0 16px", }}>
                <TableHead 
                  style= {{
                     backgroundColor : "rgb(48 132 52)"
                  }}
                sx={{ borderRadius:'15px'}}>
                  <ThemeProvider theme={boldFontTheme}>
                    <TableRow
                     color="success">
                      <TableCell style = {{
                         color : "white"
                      }}>Id</TableCell>
                      <TableCell style = {{
                        color : "white"
                      }}>Image</TableCell>
                      <TableCell style = {{
                        color : "white"
                      }}>Name</TableCell>
                      <TableCell style = {{
                        color : "white"
                      }}>Price</TableCell>
                      <TableCell style = {{
                        color : "white"
                      }}>Action</TableCell>
                    </TableRow>
                  </ThemeProvider>
                </TableHead>
                <TableBody>
                  {tableData &&
                    tableData.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>
                          <img
                            src={
                              "http://localhost:8080/api/v1/get-image/" +
                              product.avatar_image
                            }
                            alt={product.title}
                            style={{
                              height: "50px",
                              width: "50px",
                              borderRadius: "50%",
                            }}
                          />
                        </TableCell>
                        <TableCell>{product.title}</TableCell>
                        {/* <TableCell>{product.avatar_image}</TableCell> */}
                        <TableCell>{product.amount}</TableCell>
                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton onClick={() => handleEdit(product)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(product.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          {product.is_active ? (
                            <Tooltip title="Block">
                              <IconButton
                                onClick={() => handleBlock(product.id)}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Unblock">
                              <IconButton
                                onClick={() => handleUnBlock(product.id)}
                                sx={{ color: "red" }}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
            </TableContainer>
            <EditProductDialog
              openEditDialog={openEditDialog}
              setOpenEditDialog={setOpenEditDialog}
              selectedProduct={selectedProduct}
            />
          </ThemeProvider>
        </div>
        
      </Sidebar>
      <ConfirmDelete
        openConfirmDialog={openBlockDialog}
        setOpenConfirmDialog={setOpenBlockDialog}
        handleYes={handleYesForBlock}
        handleNo={handleNoForBlock}
        contentForDeleteDialog="Are you sure you want to block this customer?"
      ></ConfirmDelete>
      <ConfirmDelete
        openConfirmDialog={openUnblockDialog}
        setOpenConfirmDialog={setOpenUnblockDialog}
        handleYes={handleYesForUnblock}
        handleNo={handleNoForUnblock}
        contentForDeleteDialog="Are you sure you want to Unblock this customer?"
      ></ConfirmDelete>
    </>
  ));
}

export default AllProduct;

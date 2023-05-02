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
import EditProductDialog from "./EditProductDialog";
import ConfirmDelete from "../Customers/ConfirmDelete";

function AllProduct() {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [block, setblock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [openUnblockDialog, setOpenUnblockDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [id,setId] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    fetchAllProduct();
  },[tableData, open, block, selectedProduct, openEditDialog, openBlockDialog, openUnblockDialog, title, id]);

  const fonttheme = createTheme({
    typography: {
      fontSize: 25,
    },
  });

  const handleYesForBlock = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      console.log(id,"id")
      axios
        .get("http://localhost:8080/api/v1/encryption", {
          headers: {
            id: id,
          },
        })
        .then((res) => {
          console.log(token,"rezs") 
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
            console.log("inactive product responce",res)
            setOpenBlockDialog(false)
          })
          .catch((error) => {
            console.log("inactive product error",error);
          });})
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
              console.log("product is unblocked",res);
            setOpenUnblockDialog(false)

            })
            .catch((error) => {
              console.log("active product error",error);
            });
        })
        .catch(() => {});
    }}
    const handleNoForUnblock = () => {
      setOpenUnblockDialog(false);
    };
    const handleNoForBlock = () => {
      setOpenBlockDialog(false);
    };

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
            let data;
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

                // Remove the deleted product from tableData and set the new array as state
                setTableData((prevTableData) =>
                  prevTableData.filter((item) => item.id !== id)
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
      setOpen(true);
    };
    const handleUnBlock = (product_id) => {
      setId(product_id)
      setOpenUnblockDialog(true);
    };
    const handleBlock = (product_id) => {
      setId(product_id)
      console.log(product_id,"id")
      
      setOpenBlockDialog(true);
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
                        <TableRow key={product.id} >
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
                                onClick={() => handleDelete(product.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                           { product.is_active ? 
                            <Tooltip title="Block">
                              <IconButton
                                onClick={() => handleBlock(product.id)}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>:
                            <Tooltip title="Unblock">
                              <IconButton
                                onClick={() => handleUnBlock(product.id)}
                                sx={{color:"red"}}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>}
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
    );
  };

export default AllProduct;

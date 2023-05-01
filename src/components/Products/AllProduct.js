import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function AllProduct() {
  let data;
  const fetchAllProduct = () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      const options = {
        method: "get",
        url: "http://localhost:8080/api/v1/product/get-all-products",
      };

      axios
        .request(options)
        .then((responce) => {
          console.log("All product responce", responce);
          // data = responce.data;
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
    fetchAllProduct();
  }, []);

  // temporary data
  data = [
    {
      id: 5,
      title: "Oranges\n",
      amount: 60,
      discount_type: 1,
      discount_amount: 0,
      avatar_image: "1682227210772-cafesign.jpg",
      images: null,
      short_description: " Round, orange fruit with a sweet, juicy flavor.",
      description:
        "Oranges are high in vitamin C and antioxidants. They are often eaten raw or juiced.",
      slug: "oranges",
      is_active: true,
      deleted_at: null,
      createdAt: "2023-04-23T05:20:10.000Z",
      updatedAt: "2023-04-23T05:20:10.000Z",
    },
  ];

  // manage table

  const [tableData, setTableData] = useState(data);

  const handleDelete = (id) => {
    const updatedTableData = tableData.filter((item) => item.id !== id);
    setTableData(updatedTableData);
  };

  const handleEdit = (id) => {
    const updatedTableData = tableData.map((item) => {
      if (item.id === id) {
        return { ...item, title: "New Title" }; // Update the title field
      } else {
        return item;
      }
    });
    setTableData(updatedTableData);
  };
  // manage table over
  return (
    <Sidebar>
      <div>
        <Toaster></Toaster>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Sidebar>
  );
}
export default AllProduct;

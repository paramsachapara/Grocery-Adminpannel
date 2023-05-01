import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/Sidebar";
import { Box, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { IconButton } from "@mui/material";
import EditCustomerDialog from "./EditCustomerDialog";
import Encryption from "./Encryption";
import ConfirmDelete from "./ConfirmDelete";
import { Tooltip } from "@mui/material";
import SuccessToast from "../../utils/SuccessToast";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrdersTable from "./OrdersTable";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import { color } from "@mui/system";

function CustomersDetails() {
  const { customerId } = useParams();
  const [encryptedId, setEncryptedId] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openConfirmBlockDialog, setOpenConfirmBlockDialog] = useState(false);
  const [openConfirmUnblockDialog, setOpenConfirmUnblockDialog] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Encryption(customerId, setEncryptedId);
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (encryptedId && token) {
      axios
        .get("http://localhost:8080/api/v1/admin/get-all-orders-by-id", {
          headers: {
            token: token,
            customer_id: encryptedId,
          },
        })
        .then((res) => {
          setUserDetails(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  }, [
    encryptedId,
    openEditCustomer,
    openConfirmBlockDialog,
    openConfirmUnblockDialog,
  ]);

  const editCustomer = () => {
    if (userDetails.is_active) {
      setOpenEditCustomer(true);
    }
  };

  const deleteCustomer = () => {
    if (encryptedId) {
      setOpenConfirmDialog(true);
      console.log(encryptedId);
    }
  };
  const handleYes = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (encryptedId && token) {
      axios
        .delete("http://localhost:8080/api/v1/admin/delete-customer", {
          headers: {
            token: token,
            customer_id: encryptedId,
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };
  const handleNo = () => {
    setOpenConfirmDialog(false);
  };
  const blockCustomer = () => {
    if (encryptedId) {
      setOpenConfirmBlockDialog(true);
      console.log(encryptedId);
    }
  };
  const handleYesForBlock = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (encryptedId && token) {
      axios
        .put("http://localhost:8080/api/v1/admin/block-customer", null, {
          headers: {
            token: token,
            customer_id: encryptedId,
          },
        })
        .then((res) => {
          console.log(res);
          setOpenConfirmBlockDialog(false);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };
  const handleNoForBlock = () => {
    setOpenConfirmBlockDialog(false);
  };
  const unblockCustomer = () => {
    if (encryptedId) {
      setOpenConfirmUnblockDialog(true);
      console.log(encryptedId);
    }
  };
  const handleYesForUnblock = () => {
    let token = JSON.parse(sessionStorage.getItem("token"));
    if (encryptedId && token) {
      axios
        .put("http://localhost:8080/api/v1/admin/unblock-customer", null, {
          headers: {
            token: token,
            customer_id: encryptedId,
          },
        })
        .then((res) => {
          console.log(res);
          setOpenConfirmUnblockDialog(false);
        })
        .catch((error) => {
          console.log(error, "error");
        });
    }
  };
  const handleNoForUnblock = () => {
    setOpenConfirmUnblockDialog(false);
  };
  return (
    <>
      <Sidebar />

      <Box marginTop={5} marginLeft={35} marginRight={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Tooltip title="Go Back">
            <IconButton onClick={() => navigate("/customer-list")}>
              <KeyboardBackspaceIcon />
            </IconButton>
          </Tooltip>
          <Box component="h3">Customer Details</Box>
          <Box>
            <Tooltip title="Edit">
              <IconButton onClick={editCustomer}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={deleteCustomer}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            {userDetails.is_active ? (
              <Tooltip title="Block">
                <IconButton onClick={blockCustomer}>
                  <BlockIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Unblock">
                <IconButton onClick={unblockCustomer}>
                  <BlockIcon sx={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <TableContainer component={Paper} elevation={10}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">{userDetails.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">{userDetails.first_name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell align="right">{userDetails.last_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date Of Birth</TableCell>
                <TableCell align="right">{userDetails.date_of_birth}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Mobile Number</TableCell>
                <TableCell align="right">
                  {userDetails.primary_mobile_number}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email </TableCell>
                <TableCell align="right">{userDetails.primary_email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Secondary Mobile Number </TableCell>
                <TableCell align="right">
                  {userDetails.secondary_mobile_number}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Secondary email </TableCell>
                <TableCell align="right">
                  {userDetails.secondary_email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Addresses </TableCell>
                <TableCell align="right">
                  {userDetails.addresses &&
                  userDetails.addresses.length == 0 ? (
                    <span style={{ color: "red" }}>No address found</span>
                  ) : (
                    userDetails.addresses &&
                    userDetails.addresses.map((address) => {
                      return (
                        <ul
                          style={{ listStyle: "none", display: "inline-flex" }}
                          key={address.id}
                        >
                          <li
                            style={{ display: "flex", alignItems: "center" }}
                            key={address.id}
                          >
                            {address.tag === "home" ? (
                              <HomeIcon style={{ marginRight: "5px" }} />
                            ) : (
                              <BusinessIcon style={{ marginRight: "5px" }} />
                            )}
                            {address.address_line_1 +
                              "," +
                              address.address_line_2 +
                              "," +
                              address.area +
                              "," +
                              address.city +
                              "-" +
                              address.postal_code +
                              "," +
                              address.state +
                              "," +
                              address.country +
                              "," +
                              address.landmark}
                          </li>
                        </ul>
                      );
                    })
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <OrdersTable userDetails={userDetails} />
      </Box>
      <EditCustomerDialog
        openEditCustomer={openEditCustomer}
        setOpenEditCustomer={setOpenEditCustomer}
        userDetails={userDetails}
        encryptedId={encryptedId}
      />
      <ConfirmDelete
        openConfirmDialog={openConfirmDialog}
        setOpenConfirmDialog={setOpenConfirmDialog}
        handleYes={handleYes}
        handleNo={handleNo}
        contentForDeleteDialog="Are you sure you want to delete this customer's details?"
      />
      <ConfirmDelete
        openConfirmDialog={openConfirmBlockDialog}
        setOpenConfirmDialog={setOpenConfirmBlockDialog}
        handleYes={handleYesForBlock}
        handleNo={handleNoForBlock}
        contentForDeleteDialog="Are you sure you want to block this customer?"
      />
      <ConfirmDelete
        openConfirmDialog={openConfirmUnblockDialog}
        setOpenConfirmDialog={setOpenConfirmUnblockDialog}
        handleYes={handleYesForUnblock}
        handleNo={handleNoForUnblock}
        contentForDeleteDialog="Are you sure you want to Unblock this customer?"
      />
    </>
  );
}

export default CustomersDetails;

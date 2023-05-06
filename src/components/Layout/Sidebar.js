import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "./Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import {
  AddCircleOutline as AddProductIcon,
  ListAlt as AllProductsIcon,
  AddBox as AddCategoryIcon,
  ShoppingCart as OrdersIcon,
  People as CustomersIcon,
  ExitToApp as LogoutIcon,
} from "@material-ui/icons";

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleListItemClick = (event, index) => {
    setSelected(index);
  };


  const handleLogoutClick = () => {
    toast.success("Logout Successfull", {
      position: "top-right",
      duration: 3000,
    });
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        {isMobileOrTablet ? null : (
          <Drawer
            variant="permanent"
            sx={{
              width: "197px",
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width:  "197px",
                boxSizing: "border-box",
              },
              display: { xs: "none", md: "flex" },
            }}

            // style={{
            //   zIndex : 900;
            // }}
          >
            <Toolbar />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                overflow: "auto",
              }}
            >
            <List className="activeLink">
      {[
        { text: "Add Product", icon: <AddProductIcon /> },
        { text: "All Product", icon: <AllProductsIcon /> },
        { text: "Add Category", icon: <AddCategoryIcon /> },
        { text: "Order list", icon: <OrdersIcon /> },
        { text: "Customer list", icon: <CustomersIcon /> },
        { text: "Logout", icon: <LogoutIcon />, onClick: handleLogoutClick },
      ].map((item, index) => (
        <Box key={index}>
          <ListItem
            key={item.text}
            disablePadding
            selected={selected === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemButton
              component={item.onClick ? "button" : NavLink}
              to={item.onClick ? undefined : `/${item.text.toLowerCase().replace(" ", "-")}`}
              onClick={item.onClick}
              sx={
                selected === index
                  ? { backgroundColor: " #4caf50", color: "white" }
                  : {}
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        </Box>
      ))}
    </List>
              <Divider />
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

// const pages = ["Dashboard", "ORDER LIST", "All PRODUCT"];
const settings = ["Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  // const [menu, setMenu] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();
  const Logout = (setting) => {
    if (setting === "Logout") {
      toast.success("Logout Successfull", {
        position: "top-right",
        duration: 3000,
      });
      sessionStorage.clear();
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };
  return (
    <AppBar
      position="fixed"
      color="success"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <Toolbar>
        <ShoppingCartIcon sx={{ display: { xs: "none", md: "flex" },
         mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/add-product"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "BlinkMacSystemFont",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          GROCERY APP
        </Typography>
        <div>
          <Toaster />
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            onClick={() => setOpenDrawer(!openDrawer)}
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              ml: "auto",
            }}
          >
            <MenuIcon />
          </Button>

        </Box>

        {/* ----- */}
        {/* <ShoppingCartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          GROCERY APP
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
             <AccountCircleIcon style={{ color: "white", fontSize: "40px" }} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => {
              return (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => Logout(setting)}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box sx={{ overflow: "auto" }}>
            <List>
              {[
                "ADD PRODUCT",
                "ALL PRODUCT",
                "MANAGE ORDERS",
                "ADD CATEGORY",
                "ORDER LIST",
                "LOGOUT",
              ].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

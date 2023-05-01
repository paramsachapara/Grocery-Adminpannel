import * as React from "react";
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

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar />
        {isMobileOrTablet ? null : (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}

            // style={{
            //   zIndex : 900;
            // }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                {[
                  "ADD PRODUCT",
                  "ALL PRODUCT",
                  "MANAGE ORDERS",
                  "ADD CATEGORY",
                  "ORDER LIST",
                  "CUSTOMER LIST",
                  "LOGOUT",

                  // "SIGNUP",
                  // "Login"
                ].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <NavLink to={"/" + text.toLowerCase().replace(" ", "-")}>
                        <ListItemText
                          primary={text}
                          // onClick={() => {
                          // navigate("signup");
                          // navigate("/" + text.toLowerCase().replace(" ", "-"));

                          // }}
                        />
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
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

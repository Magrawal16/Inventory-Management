import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import RawOnIcon from "@mui/icons-material/RawOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../appStore";

const SupplierIcon = () => (
  <img
    width="15"
    height="15"
    src="https://img.icons8.com/material/24/737373/supplier.png"
    alt="supplier"
    style={{ width: "24px", height: "24px" }} // Adjust the width and height as needed
  />
);

const OrderIcon = () => (
  <img
    width="24"
    height="24"
    src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/737373/external-augmented-reality-virtual-ar-vr-cube-hand-metaverse-tanah-basah-glyph-tanah-basah.png"
    alt="supplier"
    style={{ width: "24px", height: "24px" }} // Adjust the width and height as needed
  />
);

const CustomerIcon = () => (
  <img
    width="22"
    height="22"
    src="https://img.icons8.com/ios-glyphs/30/1A1A1A/batch-assign.png"
    alt="batch-assign"
  />
);

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const location = useLocation();
  const isActive = (pathname) => location.pathname === pathname;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/home");
            }}
            selected={location.pathname === "/home"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: isActive("/home") ? "#008060" : "inherit",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: isActive("/home") ? "#008060" : "inherit",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                color: "GrayText",
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemText primary="CATALOG" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/products");
              }}
              selected={location.pathname === "/products"}
            >
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/products") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/products") ? "#008060" : "inherit",
                  }}
                >
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/categories");
              }}
              selected={location.pathname === "/categories"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/categories") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/categories") ? "#008060" : "inherit",
                  }}
                >
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Categories"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/rawmaterials");
              }}
              selected={location.pathname === "/rawmaterials"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/rawmaterials") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/rawmaterials") ? "#008060" : "inherit",
                  }}
                >
                  <RawOnIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Raw Materials"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                color: "GrayText",
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemText primary="SALES" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/analytics");
              }}
              selected={location.pathname === "/analytics"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/analytics") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/analytics") ? "#008060" : "inherit",
                  }}
                >
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Analytics"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/orders");
              }}
              selected={location.pathname === "/orders"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/orders") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/orders") ? "#008060" : "inherit",
                  }}
                >
                  <OrderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Orders"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </List>
        <Divider />

        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                color: "GrayText",
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemText
                primary="USER MANAGEMENT"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <List>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/supplier");
              }}
              selected={location.pathname === "/supplier"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/supplier") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/supplier") ? "#008060" : "inherit",
                  }}
                >
                  <SupplierIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Suppliers"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/users");
              }}
              selected={location.pathname === "/users"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/users") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/users") ? "#008060" : "inherit",
                  }}
                >
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={() => {
                navigate("/customers");
              }}
              selected={location.pathname === "/customers"}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: isActive("/customers") ? "#008060" : "inherit",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: isActive("/customers") ? "#008060" : "inherit",
                  }}
                >
                  <CustomerIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customers"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </List>

        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => {
              navigate("/settings");
            }}
            selected={location.pathname === "/settings"}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: isActive("/settings") ? "#008060" : "inherit",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: isActive("/settings") ? "#008060" : "inherit",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

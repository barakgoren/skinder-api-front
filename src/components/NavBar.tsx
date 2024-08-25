import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaHome, FaInfo, FaMountain } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

interface Item {
  title: string;
  url: string;
  icon: JSX.Element;
}

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const pages2: Item[] = [
  { title: "Home", url: "/", icon: <FaHome /> },
  { title: "Resorts", url: "/resorts", icon: <FaMountain /> },
  { title: "About", url: "/about", icon: <FaInfo /> },
];

function ResponsiveAppBar() {
  const context = useContext(AppContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="p-5">
        <img src="/SkinderLogo.png" alt="logo" />
      </div>
      <List>
        {pages2.map((item: Item) => (
          <ListItem
            disablePadding
            key={item.title}
            sx={{
              borderBottom: "0.5px solid lightgrey",
            }}
          >
            <ListItemButton
              onClick={() => {
                nav(item.url);
              }}
            >
              <ListItemIcon sx={{ color: "#10897b" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      color="transparent"
      sx={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgb(77, 255, 219, 0.7)",
      }}
      position="sticky"
    >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Container
        className="bg-teal-8=500 w-[100%] backdrop:blur-lg"
        maxWidth="xl"
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#008066",
              textDecoration: "none",
            }}
          >
            SKINDER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpen(true)}
            >
              <MenuIcon sx={{ color: "#008066" }} />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#008066",
              textDecoration: "none",
            }}
          >
            SKINDER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages2.map((page: Item) => (
              <Button
                key={page.title}
                onClick={() => {
                  nav(page.url);
                }}
                sx={{ my: 2, color: "#008066", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {context?.user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={context.user.username}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                variant="outlined"
                onClick={() => nav("/signin")}
                sx={{
                  my: 2,
                  color: "white",
                  backgroundColor: "#10897b",
                  borderColor: "black",
                  "&:hover": {
                    backgroundColor: "#0d7266",
                    color: "white",
                    borderColor: "black",
                  },
                }}
              >
                Login
              </Button>
            )}
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
              <MenuItem onClick={() => nav("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => nav("/admin/users")}>Admin Panel</MenuItem>
              <MenuItem
                onClick={() => {
                  context?.logout();
                  nav("/");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

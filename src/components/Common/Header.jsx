import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import clsx from "clsx";
import navLinks from "../../utils/navLinks";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../features/auth/reducers/authSlice";

const useStyles = makeStyles((theme) => ({
  navLink: {
    color: "#fff",
    textDecoration: "none",
    padding: theme.spacing(2),
    transition: ".3s linear",
    "&.active": {
      color: theme.palette.myColor.secondary,
    },
    "&:hover": {
      color: theme.palette.myColor.secondary,
    },
  },
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    height: theme.spacing(8),
    transition: ".3s linear",
  },
  appBarBlack: {
    backgroundColor: theme.palette.myColor.lightBlack,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openUser, setOpenUser] = useState(null);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const open = Boolean(openUser);
  const dispatch = useDispatch();
  const handleOpenUserMenu = (e) => {
    setOpenUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setOpenUser(null);
  };

  const toggleNavbar = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpenNav(!isOpenNav);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  const navContent = navLinks.map((navItem, index) => (
    <Link
      key={index}
      className={`${classes.navLink} ${
        navItem.pathName === pathname ? "active" : ""
      }`}
      to={navItem.pathName}
    >
      {navItem.title}
    </Link>
  ));

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 70 || document.documentElement.scrollTop > 70) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarBlack]: isScroll,
        })}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
            }}
          >
            {/* Start MenuIcon */}
            <Box sx={{ display: { xs: " block", md: "none" } }}>
              <IconButton sx={{ color: "myColor.grey" }} onClick={toggleNavbar}>
                <MenuIcon />
              </IconButton>
            </Box>
            {/* End MenuIcon */}
            {/* Start LOGO */}
            <IconButton
              onClick={() => navigate("/")}
              sx={{ flex: { xs: 1, md: "0" } }}
            >
              <Avatar
                src="/images/logo.jpg"
                alt="logo"
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>
            {/* End LOGO */}
            {/* Start Navbar */}
            <Box
              sx={{
                flexGrow: 1,
                textAlign: "right",
                display: { xs: "none", md: "block" },
              }}
            >
              {navContent}
            </Box>
            {/* End Navbar */}
            {/* Start Navbar Mobile */}
            <Box>
              <SwipeableDrawer
                anchor="left"
                open={isOpenNav}
                onClose={toggleNavbar}
                onOpen={toggleNavbar}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "myColor.lightBlack",
                    color: "myColor.grey",
                    boxShadow: 2,
                  },
                }}
              >
                <Box
                  role="presentation"
                  onClick={toggleNavbar}
                  onKeyDown={toggleNavbar}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      color: "myColor.grey",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <List
                    sx={{
                      width: { xs: "100vw", sm: "50vw" },
                      py: 4,
                    }}
                  >
                    {navContent.map((item, index) => (
                      <ListItem button key={index} sx={{ textAlign: "center" }}>
                        <ListItemText>{item}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </SwipeableDrawer>
            </Box>
            {/* End Navbar Mobile */}
            {/* Start Avatar & tooltip */}
            {currentUser && (
              <>
                <Box>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: "myColor.blue",
                        }}
                      >
                        V
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  anchorEl={openUser}
                  id="account-menu"
                  open={open}
                  onClose={handleCloseUserMenu}
                  onClick={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: { xs: "25%", md: "50%" },
                        width: 10,
                        height: 10,
                        backgroundColor: "background.paper",
                        transform: {
                          xs: "translateY(-50%) rotate(45deg)",
                          md: "translateX(50%) translateY(-50%) rotate(45deg)",
                        },
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/ticket")}>
                    <ListItemIcon>
                      <ShoppingBagIcon fontSize="small" />
                    </ListItemIcon>
                    My Tickets
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
            {!currentUser && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "myColor.secondary",
                  "&:hover": {
                    backgroundColor: "myColor.orangeDark",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            )}

            {/* End Avatar & tooltip */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;

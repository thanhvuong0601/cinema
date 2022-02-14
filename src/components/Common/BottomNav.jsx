import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const navItem = [
  {
    title: "Home",
    icon: <HomeIcon />,
    pathUrl: "/",
  },
  {
    title: "Movies",
    icon: <GroupWorkIcon />,
    pathUrl: "/movies",
  },
  {
    title: "My Tickets",
    icon: <BookOnlineIcon />,
    pathUrl: "/ticket",
  },
];
const useStyles = makeStyles((theme) => ({
  navBottomWrap: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  navBottomItem: {
    backgroundColor: theme.palette.myColor.main,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    "& .MuiBottomNavigationAction-root": { color: theme.palette.myColor.grey },
    "& .MuiBottomNavigationAction-label": {
      mt: 1,
    },
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      color: theme.palette.myColor.secondary,
    },
  },
}));
const BottomNav = () => {
  const classes = useStyles();
  const [navIdx, setNavIdx] = useState(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const idx = pathname === "/" ? 0 : pathname === "/movies" ? 1 : 2;
    setNavIdx(idx);
  }, [pathname]);

  return (
    <Box className={classes.navBottomWrap}>
      <Container maxWidth="lg">
        <BottomNavigation
          value={navIdx}
          showLabels
          className={classes.navBottomItem}
        >
          {navItem.map((item, i) => (
            <BottomNavigationAction
              key={i}
              label={item.title}
              icon={item.icon}
              onClick={() => navigate(`${item.pathUrl}`)}
            />
          ))}
        </BottomNavigation>
      </Container>
    </Box>
  );
};

export default BottomNav;

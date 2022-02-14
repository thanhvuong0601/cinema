import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Input,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import React from "react";

const footerLink = {
  column1: ["About", "Cinemas", "Events", "Careers"],
  column2: ["Movies", "Showtime", "Services", "Contact"],
  column3: ["Gift card", "Payment", "Media center", "Help center"],
};

const useStyles = makeStyles((theme) => ({
  footerItem: {
    textTransform: "uppercase",
    color: theme.palette.myColor.lightGrey,
    transition: ".5s ease-in",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
    "&:hover": {
      color: theme.palette.myColor.grey,
    },
  },
  footerInput: {
    color: theme.palette.myColor.lightGrey,
    my: 2,
    "&::after": {
      borderBottomColor: theme.palette.myColor.lightGrey,
      borderBottomWidth: "1px",
      transform: "scale(1)",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" sx={{ backgroundColor: "#000", py: 2 }}>
      <Container maxWidth="lg">
        <Grid container py={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            textAlign={{ xs: "center", md: "initial" }}
          >
            <IconButton>
              <Avatar
                src="/images/logo.jpg"
                alt="logo"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={6} md={2}>
            <MenuList>
              {footerLink.column1.map((item, i) => (
                <MenuItem key={i} className={classes.footerItem}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={6} md={2}>
            <MenuList>
              {footerLink.column2.map((item, i) => (
                <MenuItem key={i} className={classes.footerItem}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={6} md={2}>
            <MenuList>
              {footerLink.column3.map((item, i) => (
                <MenuItem key={i} className={classes.footerItem}>
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={6} md={3} textAlign={{ xs: "center", md: "initial" }}>
            <Typography pt={{ xs: 3, sm: 1, textTransform: "uppercase" }}>
              Subscribe now
            </Typography>
            <Input placeholder="Your email" className={classes.footerInput} />
            <Box>
              <Button
                variant="text"
                sx={{
                  color: "myColor.secondary",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Typography
          component="div"
          textAlign=" center"
          py={2}
          sx={{ color: "lightGrey" }}
        >
          Copy right ©2022 VCinema. All right reversed.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

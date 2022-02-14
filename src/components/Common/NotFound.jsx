import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
const NotFound = ({ message }) => {
  const navigate = useNavigate();
  return (
    <Box
      textAlign={"center"}
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <img
        src="./images/404.svg"
        alt="404"
        style={{
          maxWidth: 300,
        }}
      />
      <Typography variant="subtitle2" my={2} textTransform={"uppercase"}>
        {" "}
        {message}
      </Typography>
      <Button
        variant="outlined"
        endIcon={<ArrowRightAltIcon />}
        sx={{
          color: "myColor.grey",
          borderColor: "myColor.grey",
          "&:hover": {
            borderColor: "myColor.secondary",
          },
        }}
        onClick={() => navigate("/")}
      >
        back to home
      </Button>
    </Box>
  );
};

export default NotFound;

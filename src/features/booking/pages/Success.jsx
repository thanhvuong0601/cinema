import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign={"center"} width={"100%"} py={4} className="success">
      <img
        src="./images/complete.svg"
        alt="complete"
        style={{ maxWidth: 200 }}
      />
      <Typography variant="subtitle1" gutterBottom>
        Booking Successfully!
      </Typography>
      <Box>
        <Button
          variant="outlined"
          sx={{ marginRight: 2 }}
          startIcon={<SettingsBackupRestoreIcon />}
          onClick={() => navigate("/")}
        >
          Back to home
        </Button>
        <Button
          variant="contained"
          startIcon={<BookOnlineIcon />}
          onClick={() => navigate("/ticket")}
        >
          View Tickets
        </Button>
      </Box>
    </Box>
  );
};

export default Success;

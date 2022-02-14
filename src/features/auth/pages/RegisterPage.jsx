import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Alert,
  CircularProgress,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignUp } from "../../../utils/validate";
import movieApi from "../../../api/movieApi";
import { useState } from "react";
import DialogStyled from "../../../components/Common/Dialog";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });

  const registerUser = async (user) => {
    try {
      setLoading(true);
      setError(null);
      await movieApi.registerUser(user);
      setOpenDialog(true);
      setLoading(false);
      reset();
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.content || error.message);
    }
  };

  const handleRegister = (data) => {
    const { email, ho, ten, taiKhoan, matKhau, soDt } = data;
    const userInfo = {
      email,
      taiKhoan,
      matKhau,
      soDt,
      hoTen: ho + " " + ten,
      maNhom: "GP07",
    };
    registerUser(userInfo);
  };

  return (
    <Box
      sx={{
        backgroundColor: "myColor.grey",
        color: "myColor.main",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            boxShadow: 2,
            my: 2,
            px: 4,
            py: 2,
          }}
        >
          <Box textAlign="center" mb={2}>
            <IconButton>
              <Avatar
                src="/images/logo.jpg"
                alt="logo"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleRegister)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("ho")}
                  error={Boolean(errors.ho)}
                  helperText={errors.ho?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("ten")}
                  error={Boolean(errors.ten)}
                  helperText={errors.ten?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  {...register("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  {...register("soDt")}
                  error={Boolean(errors.soDt)}
                  helperText={errors.soDt?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  {...register("taiKhoan")}
                  error={Boolean(errors.taiKhoan)}
                  helperText={errors.taiKhoan?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  {...register("matKhau")}
                  error={Boolean(errors.matKhau)}
                  helperText={errors.matKhau?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("matKhau1")}
                  error={Boolean(errors.matKhau1)}
                  helperText={errors.matKhau1?.message}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading && <CircularProgress size={20} color="secondary" />}
              &nbsp; Sign Up
            </Button>
            <Box textAlign={"center"}>
              <Link
                onClick={() => navigate("/login")}
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                Already have an account? Sign in
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          my: 2,
        }}
      >
        {"Copyright © "}
        <Link
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          VCinema
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      {
        <DialogStyled open={openDialog} handleOpen={setOpenDialog}>
          <DialogContent
            sx={{
              ".MuiSvgIcon-root": {
                width: 70,
                height: 70,
                color: "#2e7d32",
              },
              textAlign: "center",
            }}
          >
            <CheckCircleOutlineIcon />
            <Typography>
              Congratulations, your account has been successfully created.
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/login")}
            >
              go to login
            </Button>
          </DialogActions>
        </DialogStyled>
      }
    </Box>
  );
};

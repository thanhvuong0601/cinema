import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../reducers/authSlice";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "../../../utils/validate";
import { useEffect } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogging, error, currentUser } = useSelector((state) => state.auth);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignIn),
  });

  const handleSignIn = (data) => {
    dispatch(authActions.login(data));
  };

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

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
            height: "90vh",
            boxShadow: 2,
            p: 4,
          }}
        >
          <Box textAlign="center" mb={2}>
            <IconButton onClick={() => navigate("/")}>
              <Avatar
                src="/images/logo.jpg"
                alt="logo"
                sx={{ width: 50, height: 50 }}
              />
            </IconButton>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          <Box
            component="form"
            onSubmit={handleSubmit(handleSignIn)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              autoFocus
              label="User Name"
              {...register("taiKhoan")}
              error={Boolean(errors.taiKhoan)}
              helperText={errors.taiKhoan?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              {...register("matKhau")}
              label="Password"
              type="password"
              id="password"
              error={Boolean(errors.matKhau)}
              helperText={errors.matKhau?.message}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Sign In
            </Button>
            <Box textAlign={"center"}>
              <Link
                onClick={() => navigate("/register")}
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                {"Don't have an account? Sign Up"}
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
    </Box>
  );
};

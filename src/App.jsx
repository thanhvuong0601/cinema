import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/MainRoute";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import CustomTheme from "./utils/CustomTheme";
import { Box } from "@mui/system";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import BottomNav from "./components/Common/BottomNav";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./features/auth/reducers/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.getInfoUser());
  }, [dispatch]);
  return (
    <ThemeProvider theme={CustomTheme}>
      <Box
        sx={{
          backgroundColor: "myColor.main",
          // minHeight: "100vh",
          color: "myColor.grey",
        }}
      >
        <CssBaseline />
        <BrowserRouter>
          <MainRoute />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;

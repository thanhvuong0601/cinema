import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../components/Common/NotFound";
import HomePage from "../components/Layout/Home/index";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import Ticket from "../components/Layout/Tickets";
import MovieDetail from "../components/Layout/MovieDetail";
import ListMovie from "../features/movies/pages/ListMovie";
import Booking from "../features/booking/pages/Booking";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import BottomNav from "../components/Common/BottomNav";
import { Box } from "@mui/material";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="*" element={<DefaultPage />} />
    </Routes>
  );
};

const DefaultPage = () => {
  return (
    <>
      <Header />
      <Box>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<ListMovie />} />
          <Route path="movies/:id" element={<MovieDetail />} />
          <Route path="booking" element={<Booking />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
      <BottomNav />
    </>
  );
};

export default MainRoute;

import { Container } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Banner from "./Banner";
import Row from "../../Common/Row";
import News from "./News";
import { useDispatch, useSelector } from "react-redux";
import {
  movieActions,
  selectData,
  selectLoading,
} from "../../../features/movies/reducers/movieSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const { items } = useSelector(selectData);
  const openingMovies = items.filter((item) => item.dangChieu);
  const comingMovies = items.filter((item) => item.sapChieu);

  useEffect(() => {
    dispatch(movieActions.getMovie());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <Box py={6}>
        <Container maxWidth="lg">
          <Row
            title="Now showing"
            isLoading={isLoading}
            movies={openingMovies}
            itemPerView={10}
            showTime={false}
          />
          <Row
            title="Coming soon"
            isLoading={isLoading}
            movies={comingMovies}
            showTime={true}
            itemPerView={5}
          />
          <News />
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;

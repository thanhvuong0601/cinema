import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ContentLoading from "./ContentLoading";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const groupBtn = [
  {
    title: "All films",
    disabled: false,
  },
  {
    title: "2D",
    disabled: true,
  },
  {
    title: "3D",
    disabled: true,
  },
  {
    title: "IMAX",
    disabled: true,
  },
  {
    title: "IMAX 3D",
    disabled: true,
  },
];

const Row = ({ title, movies, isLoading, showTime, itemPerView }) => {
  const data = movies?.slice(0, itemPerView);
  const navigate = useNavigate();
  return (
    <Box py={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          gutterBottom
          variant="h6"
          sx={{ textTransform: "uppercase" }}
        >
          {title}
        </Typography>
        <Button
          variant="text"
          sx={{ color: "myColor.secondary" }}
          onClick={() => navigate("/movies")}
        >
          View All
        </Button>
      </Box>

      <Box
        sx={{
          height: "1px",
          mb: 4,
          background:
            "linear-gradient(90deg, rgba(255,44,31,1) 0%, rgba(229,92,82,1) 30%,rgba(9,10,13,1) 80%, rgba(9,10,13,1) 100%)",
        }}
      />
      {!showTime && (
        <Box mb={4}>
          <Stack direction="row" flexWrap="wrap">
            {groupBtn.map((item, i) => (
              <Button
                key={i}
                variant="contained"
                sx={[
                  {
                    mr: 2,
                    mb: 2,
                    backgroundColor: "myColor.secondary",
                    transition: ".5s linear",
                    "&:hover": {
                      backgroundColor: "myColor.orangeDark",
                    },
                  },
                  item.disabled && {
                    backgroundColor: "myColor.lightBlack",
                  },
                  {
                    flexWrap: "wrap",
                  },
                ]}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
      <Grid container rowSpacing={4} columnSpacing={2} columns={15}>
        {!isLoading &&
          data?.map((movie) => (
            <Grid item xs={15} sm={5} md={3} key={movie.maPhim}>
              <MovieItem movie={movie} showTime={showTime} />
            </Grid>
          ))}

        {isLoading && <ContentLoading numberItem={5} />}
      </Grid>
    </Box>
  );
};

export default Row;
Row.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showTime: PropTypes.bool.isRequired,
  itemPerView: PropTypes.number.isRequired,
};

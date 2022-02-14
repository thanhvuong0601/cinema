import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  IconButton,
  InputBase,
  Link,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentLoading from "../../../components/Common/ContentLoading";
import MovieItem from "../../../components/Common/MovieItem";
import NotFound from "../../../components/Common/NotFound";
import {
  movieActions,
  selectData,
  selectError,
  selectLoading,
} from "../reducers/movieSlice";
const ListMovie = () => {
  const dispatch = useDispatch();
  const listRef = useRef(null);
  const [page, setPage] = useState(1);
  const [isPhoneScreen, setIsPhoneScreen] = useState(false);
  const isLoading = useSelector(selectLoading);
  const { totalPages, items } = useSelector(selectData);
  const error = useSelector(selectError);

  const { pathname } = useLocation();
  const helmet = pathname.split("/");
  const itemPerPage = 10;
  const [search, setSearch] = useState("");

  const checkPhoneScreen = () => {
    if (window.innerWidth < 900) {
      setIsPhoneScreen(true);
    } else {
      setIsPhoneScreen(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // handle load & resize
  useEffect(() => {
    window.addEventListener("resize", checkPhoneScreen);
    return () => window.removeEventListener("resize", checkPhoneScreen);
  }, []);

  useEffect(() => {
    window.addEventListener("load", checkPhoneScreen);
    return () => window.removeEventListener("load", checkPhoneScreen);
  }, []);

  useEffect(() => {
    let searchOptions;
    if (isPhoneScreen && search) {
      searchOptions = {
        tenPhim: search,
      };
    } else if (isPhoneScreen && !search) {
      searchOptions = null;
    } else if (!isPhoneScreen && search) {
      searchOptions = {
        soTrang: page,
        soPhanTuTrenTrang: itemPerPage,
        tenPhim: search,
      };
    } else {
      searchOptions = {
        soTrang: page,
        soPhanTuTrenTrang: itemPerPage,
      };
    }
    dispatch(movieActions.getMovie({ searchOptions }));
  }, [dispatch, page, isPhoneScreen, search]);

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: "url('./images/banner-movie.jpg')",
          paddingTop: { xs: "50%", md: "30%" },
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            transform: "translateY(-50%)",
          }}
        >
          <Typography
            fontWeight="700"
            textAlign="center"
            sx={{
              textTransform: "uppercase",
              color: "myColor.secondary",
              fontSize: { xs: "1.5rem", md: "3rem" },
            }}
          >
            Get movie tickets
          </Typography>
          <Breadcrumbs
            separator={
              <NavigateNextIcon
                sx={{ color: "myColor.grey" }}
                fontSize="small"
              />
            }
            sx={{
              "& .MuiBreadcrumbs-ol": {
                justifyContent: "center",
              },
            }}
          >
            {helmet.map((item, i) => (
              <Link
                underline="none"
                sx={{ textTransform: "capitalize", color: "myColor.grey" }}
                key={i}
              >
                {item ? item : "Home"}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      </Box>
      <Container maxWidth="lg">
        {error && (
          <NotFound message="Oops! Something went wrong when load movies." />
        )}
        {!error && (
          <>
            <Box textAlign="right">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  width: { xs: "100%", md: "250px" },
                  display: "inline-flex",
                  backgroundColor: "transparent",
                  border: "1px solid",
                  borderColor: "myColor.grey",
                  my: 4,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, color: "myColor.grey" }}
                  placeholder="Search Movies ..."
                  onChange={handleChange}
                />
                <IconButton sx={{ p: "8px", color: "myColor.grey" }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={2}
              columns={15}
              ref={listRef}
            >
              {isLoading && <ContentLoading numberItem={itemPerPage} />}
              {!isLoading &&
                !!items?.length &&
                items?.map((movie) => (
                  <Grid item xs={15} sm={5} md={3} key={movie.maPhim}>
                    <MovieItem movie={movie} />
                  </Grid>
                ))}
              {!isLoading && !items?.length && (
                <Box margin="16px auto">
                  <Box>
                    <img
                      src="./images/empty.svg"
                      alt="no-data"
                      style={{
                        maxWidth: 300,
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="error"
                      gutterBottom
                      textAlign="center"
                    >
                      No data result!
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
            {/* Start Pagination */}
            {!isPhoneScreen && totalPages > 1 && (
              <Stack
                spacing={2}
                my={4}
                sx={{
                  display: { xs: "none", md: "flex" },
                  "& .MuiButtonBase-root": {
                    color: "myColor.grey",
                    transition: ".3s ease",
                  },
                  "& .MuiButtonBase-root:hover": {
                    color: "myColor.secondary",
                  },
                  "& .MuiButtonBase-root.Mui-selected": {
                    color: "myColor.secondary",
                    backgroundColor: "myColor.lightBlack",
                    boxShadow: 3,
                    border: "1px solid",
                  },
                  "& .MuiPagination-ul": {
                    justifyContent: "center",
                  },
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(event, value) => {
                    setPage(value);
                  }}
                  showFirstButton
                  showLastButton
                />
              </Stack>
            )}
            {/* End Pagination */}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ListMovie;

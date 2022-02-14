import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import movieApi from "../../../api/movieApi";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableFooter,
  IconButton,
  Skeleton,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import clsx from "clsx";
import { formatPrice } from "../../../utils/formatPrice";
import { useDispatch, useSelector } from "react-redux";
import { selectShowTimes, showTimesActions } from "../reducers/showTimeSlice";

const useStyles = makeStyles((theme) => ({
  screen: {
    borderTop: "70px solid #555",
    borderLeft: "25px solid transparent",
    borderRight: "25px solid transparent",
    height: 0,
    width: "100%",
  },
  box: {
    maxWidth: 324,
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
  },
  seat: {
    width: 25,
    height: 25,
    borderRadius: "4px",
    margin: "1px",
    cursor: "pointer",
    fontSize: "12px",
    lineHeight: "25px",
    textAlign: "center",
    border: "1px solid #fff",
  },
  seatSelected: {
    backgroundColor: "#45ab3d",
  },
  seatSold: {
    backgroundColor: theme.palette.myColor.secondary,
    cursor: "not-allowed",
  },
  table: {
    maxWidth: "300px",
    margin: "0 auto",
    maxHeight: "350px",
    "& .MuiTableRow-footer": {
      position: "sticky",
      bottom: 0,
      backgroundColor: "#fff",
    },
    "&::webkit-scrollbar-track": {
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar": {
      width: "4px",
      backgroundColor: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "#555",
    },
  },
}));

const Seat = () => {
  const classes = useStyles();
  const { calendarId, selectedSeats } = useSelector(selectShowTimes);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [seats, setSeats] = useState([]);
  const dispatch = useDispatch();

  const toggleSelectSeat = (seat) => {
    const { maGhe, giaVe, tenGhe } = seat;
    dispatch(showTimesActions.toggleSelectSeat({ maGhe, giaVe, tenGhe }));
  };

  const totalPrice = selectedSeats.reduce((total, seat) => {
    return total + seat?.giaVe;
  }, 0);

  useEffect(() => {
    dispatch(showTimesActions.resetState());

    const getSeats = async () => {
      try {
        setIsLoading(true);
        const result = await movieApi.getSeatById(calendarId);
        setSeats(result.danhSachGhe);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setErrors(e.message);
      }
    };
    getSeats();
  }, [calendarId, dispatch]);

  return (
    <Grid container spacing={1}>
      {isLoading && (
        <>
          <Grid item xs={12} md={7}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: 400,
                backgroundColor: "myColor.lightBlack",
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Skeleton
              variant="rectangular"
              sx={{
                height: 200,
                backgroundColor: "myColor.lightBlack",
              }}
            />
          </Grid>
        </>
      )}
      {!isLoading && !errors && (
        <>
          <Grid item xs={12} md={7}>
            <Box maxWidth={"300px"} margin={"32px auto"} textAlign="center">
              <Typography className={classes.screen}>SCREEN</Typography>
            </Box>
            <Grid container className={classes.box}>
              <Grid item xs={4}>
                <Box display={"flex"}>
                  <Typography
                    className={clsx(classes.seat, classes.seatSold)}
                  ></Typography>
                  <Typography ml={1} variant="subtitle1">
                    Sold
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box display={"flex"}>
                  <Typography
                    className={clsx(classes.seat, classes.seatSelected)}
                  ></Typography>
                  <Typography ml={1} variant="subtitle1">
                    Selected
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box display={"flex"}>
                  <Typography
                    className={clsx(classes.seat, classes.seatAvailable)}
                  ></Typography>
                  <Typography ml={1} variant="subtitle1">
                    Available
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box pt={4} className={classes.box}>
              {seats?.map((seat) => (
                <Typography
                  component="p"
                  key={seat.maGhe}
                  className={clsx(
                    classes.seat,
                    seat.daDat && classes.seatSold,
                    selectedSeats.some((item) => item.maGhe === seat.maGhe) &&
                      classes.seatSelected
                  )}
                  onClick={() => toggleSelectSeat(seat)}
                >
                  {seat.tenGhe}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box>
              <Typography
                component="h6"
                fontWeight={"600"}
                textTransform={"uppercase"}
                gutterBottom
                textAlign={"center"}
              >
                Seat selected
              </Typography>
              <TableContainer component={Paper} className={classes.table}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Seat ID</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedSeats.map((seat) => (
                      <TableRow key={seat.maGhe}>
                        <TableCell>{seat?.tenGhe}</TableCell>
                        <TableCell>{formatPrice(seat?.giaVe)}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => toggleSelectSeat(seat)}>
                            <DeleteRoundedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total:</TableCell>
                      <TableCell colSpan={2}>
                        {formatPrice(totalPrice)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </>
      )}
      {errors && (
        <Grid item xs={12}>
          <Typography
            textAlign={"center"}
            mt={2}
            sx={{ color: "myColor.grey" }}
          >
            Oops... Something wrong happened.Please try again later!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Seat;

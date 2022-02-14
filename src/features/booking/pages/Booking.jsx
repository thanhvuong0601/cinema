import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogStyled from "../../../components/Common/Dialog";
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Rating,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Ticket from "./Ticket";
import { formatLongDate } from "../../../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import Seat from "./Seat";
import Payment from "./Payment";
import { selectShowTimes, showTimesActions } from "../reducers/showTimeSlice";
import NotFound from "../../../components/Common/NotFound";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaPayment } from "../../../utils/validate";
import Success from "./Success";
import movieApi from "../../../api/movieApi";
const steps = ["Chose your tickets", "Chose your seats", "Payment"];
const useStyles = makeStyles((theme) => ({
  step: {
    width: "100%",
    "& .MuiStepLabel-label": {
      color: theme.palette.myColor.grey,
    },
    "& .MuiStepLabel-label.Mui-active, & .MuiStepLabel-label.Mui-completed": {
      color: theme.palette.myColor.secondary,
    },
    "& .MuiStepIcon-root": {
      color: theme.palette.myColor.lightBlack,
    },
    "& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed": {
      color: theme.palette.myColor.secondary,
    },
  },
  cardContent: {
    backgroundColor: theme.palette.myColor.lightBlack,
    color: theme.palette.myColor.grey,
  },
  form: {
    "& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.myColor.secondary,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.myColor.grey,
      backgroundColor: theme.palette.myColor.main,
    },
    "& .MuiSelect-select": {
      color: theme.palette.myColor.grey,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.myColor.grey,
    },
    "& .MuiTextField-root": {
      width: "100%",
    },
  },
}));
const Booking = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { isLoading, error, data, selectedValues, selectedSeats, calendarId } =
    useSelector(selectShowTimes);
  const [openToast, setOpenToast] = useState(false);
  const [errorSelect, setErrorSelect] = useState({});
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorBooking, setErrorBooking] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaPayment),
  });

  const validateSelect = (fieldValues = selectedValues) => {
    const temp = { ...errorSelect };
    if ("theater" in fieldValues)
      temp.theater = fieldValues.theater ? "" : "This field is required.";
    if ("address" in fieldValues)
      temp.address = fieldValues.address ? "" : "This field is required.";
    if ("datetime" in fieldValues)
      temp.datetime = fieldValues.datetime ? "" : "This field is required.";

    if ("hours" in fieldValues)
      temp.hours = fieldValues.hours ? "" : "This field is required.";
    if ("theaternumber" in fieldValues)
      temp.theaternumber = fieldValues.theaternumber
        ? ""
        : "This field is required.";

    setErrorSelect(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps();
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const newCompleted = Object.assign({}, completed);
    delete newCompleted[activeStep - 1];
    setCompleted(newCompleted);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const nextStep = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    handleComplete();
  };

  const handleBooking = async (data) => {
    try {
      setErrorBooking(null);
      await movieApi.booking(data);
      nextStep();
      setSuccess(true);
    } catch (e) {
      setErrorBooking(e.message);
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && validateSelect(selectedValues)) {
      nextStep();
    } else if (activeStep === 1 && selectedSeats.length > 0) {
      nextStep();
    } else if (activeStep === 1 && selectedSeats.length === 0) {
      setOpenToast(true);
    } else if (activeStep === 2) {
      handleBooking({
        maLichChieu: calendarId,
        danhSachVe: selectedSeats,
      });
    }
  };

  useEffect(() => {
    if (location.state?.id) {
      dispatch(showTimesActions.getShowTimePending(location.state.id));
    } else {
      setOpen(true);
    }
  }, [navigate, location, dispatch]);

  useEffect(() => {
    dispatch(showTimesActions.resetState());
  }, [dispatch]);

  return (
    <Box pt={10} className={classes.form} component="form" autoComplete="off">
      <Container maxWidth="lg">
        {isLoading && (
          <>
            <Skeleton variant="text" height={50} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3}>
                <Skeleton variant="rectangular" height="100%" />
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <Skeleton variant="text" height={50} />
                <Skeleton variant="text" height={50} />
                <Skeleton variant="text" height={50} />
                <Skeleton variant="text" height={50} />
              </Grid>
            </Grid>
          </>
        )}

        {!isLoading && !error && (
          <Box className={classes.step}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <Grid container py={4} spacing={4}>
              {!allStepsCompleted() && (
                <Grid item xs={12} sm={4} md={3}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={data?.hinhAnh}
                      alt={data?.biDanh}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        textTransform={"uppercase"}
                        fontWeight={"600"}
                      >
                        {data?.tenPhim}
                      </Typography>
                      <Typography gutterBottom component="div">
                        Release date: {formatLongDate(data?.ngayKhoiChieu).date}
                      </Typography>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Rating:
                        <Rating
                          size="small"
                          value={data?.danhGia / 2 || 0}
                          precision={0.5}
                          readOnly
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              {allStepsCompleted() ? (
                <Grid item xs={12}>
                  <Success />
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={9}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {activeStep === 0 && (
                    <Ticket validation={validateSelect} errors={errorSelect} />
                  )}
                  {activeStep === 1 && <Seat />}
                  {activeStep === 2 && (
                    <Payment errors={errors} register={register} />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 2,
                      marginTop: "auto",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      variant="contained"
                      onClick={
                        activeStep === 2 ? handleSubmit(handleNext) : handleNext
                      }
                      sx={{
                        mr: 1,
                        color: "myColor.grey",
                        backgroundColor: "myColor.secondary",
                        "&:hover": {
                          backgroundColor: "myColor.orangeDark",
                        },
                      }}
                    >
                      {activeStep === totalSteps() - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
        {error && <NotFound message={error} />}
      </Container>
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Please chose seat!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorBooking}
        autoHideDuration={3000}
        onClose={() => setErrorBooking(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setErrorBooking(null)}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {errorBooking}
        </Alert>
      </Snackbar>
      <DialogStyled open={open} handleOpen={setOpen}>
        <DialogTitle>
          <Typography fontWeight={600} textTransform={"uppercase"}>
            Notification
          </Typography>
          <Divider />
          <DialogContent>
            <Typography variant="subtitle1">
              You need to choose a movie.
            </Typography>
          </DialogContent>
        </DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/movies")}
          >
            OK
          </Button>
        </DialogActions>
      </DialogStyled>
    </Box>
  );
};

export default Booking;

import {
  Box,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import movieApi from "../../../api/movieApi";
import { formatShortDate } from "../../../utils/formatDate";
import { makeStyles } from "@mui/styles";
import ReactPlayer from "react-player";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import DialogStyled from "../../Common/Dialog";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  bgDetail: {
    backgroundImage: (props) => `url(${props.url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "40%",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      paddingTop: "100%",
    },
    "&:after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 2,
    },
  },
  wrapMovie: {
    position: "relative",
    zIndex: 3,
    transform: "translateY(-50%)",
    [theme.breakpoints.down("md")]: {
      transform: "translateY(-20%)",
    },
  },
  img: {
    backgroundImage: (props) => `url(${props.url})`,
    backgroundSize: "cover",
    backgroundPosition: "top ",
    width: 250,
    flexShrink: 0,
    height: 350,
    borderRadius: "8px",
    [theme.breakpoints.down("md")]: {
      height: 300,
      marginBottom: theme.spacing(2),
    },
  },
  btnBooking: {
    backgroundColor: theme.palette.myColor.secondary,
    color: theme.palette.myColor.grey,
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.myColor.orangeDark,
    },
  },

  btnWatch: {
    color: theme.palette.myColor.grey,
    "&:hover": {
      borderColor: theme.palette.myColor.secondary,
    },
  },

  hot: {
    display: "inline-block",
    marginBottom: theme.spacing(1),
    padding: "4px 8px",
    fontWeight: 500,
    borderRadius: "4px",
    color: theme.palette.myColor.grey,
    backgroundColor: theme.palette.myColor.secondary,
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "transparent",
    padding: theme.spacing(4),
  },
}));

const MovieDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const classes = useStyles({
    url: movie?.hinhAnh,
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBooking = (id) => {
    if (currentUser) {
      navigate("/booking", { state: { id } });
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    const getDetail = async () => {
      const result = await movieApi.getMovieById(id);
      setMovie(result);
    };
    getDetail();
  }, [id]);

  return (
    <Box>
      <div className={classes.bgDetail}></div>
      <Container maxWidth="lg">
        <div className={classes.wrapMovie}>
          <div className={classes.container}>
            <div className={classes.img} />
            <Box ml={{ xs: 0, md: 4 }}>
              <Typography
                fontSize={{ xs: "2rem", md: "3rem" }}
                textTransform="capitalize"
                gutterBottom
                textAlign={{ xs: "center", md: "left" }}
              >
                {movie?.tenPhim}
              </Typography>
              {movie?.hot && (
                <Box textAlign={{ xs: "center", md: "left" }}>
                  <Typography variant="span" className={classes.hot}>
                    HOT
                  </Typography>
                </Box>
              )}
              <Typography gutterBottom textAlign="justify">
                Descriptions: {movie?.moTa}
              </Typography>
              <Typography gutterBottom>
                Release Date: {formatShortDate(movie?.ngayKhoiChieu)}
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                Users Rating:
                <Rating value={movie?.danhGia / 2} precision={0.5} readOnly />
              </Typography>
              <Box mt={2}>
                <Button
                  variant="contained"
                  startIcon={<ConfirmationNumberIcon />}
                  className={classes.btnBooking}
                  onClick={() => handleBooking(movie.maPhim)}
                >
                  {" "}
                  Book now
                </Button>
                <Button
                  className={classes.btnWatch}
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleOpenModal}
                >
                  {" "}
                  Watch trailer
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </Container>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={classes.modal}>
          <Box textAlign="right">
            <IconButton
              sx={{ color: "myColor.grey", transform: "translateX(100%)" }}
              onClick={handleCloseModal}
            >
              <ClearIcon />
            </IconButton>
          </Box>
          <ReactPlayer width="100%" url={movie?.trailer} playing controls />
        </Box>
      </Modal>
      <DialogStyled open={open} handleOpen={setOpen}>
        <DialogTitle>
          <Typography textTransform={"uppercase"} fontWeight={600}>
            Join with us
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          You're not login. Please login & try again!
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/login")}
          >
            Go to login
          </Button>
        </DialogActions>
      </DialogStyled>
    </Box>
  );
};

export default MovieDetail;

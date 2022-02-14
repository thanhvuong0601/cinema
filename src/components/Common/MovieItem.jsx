import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Icon,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TodayIcon from "@mui/icons-material/Today";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { formatShortDate } from "../../utils/formatDate";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor: theme.palette.myColor.lightBlack,
    color: theme.palette.myColor.grey,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    transition: ".5s linear",
    boxShadow: 1,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.myColor.secondary,
    },
    "&:hover .MuiCardMedia-root": {
      transform: "scale(1.1)",
    },
  },
  cardContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    textTransform: "capitalize",
    display: "-webkit-box",
    textOverflow: "ellipsis",
    overflow: "hidden",
    wordBreak: "break-word",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  cardBadge: {
    backgroundColor: theme.palette.myColor.secondary,
    position: "absolute",
    top: 0,
    right: 0,
    width: "44px",
    padding: theme.spacing(1),
    color: theme.palette.myColor.grey,
    "&:after": {
      content: '""',
      width: 0,
      height: 0,
      left: 0,
      bottom: "-8px",
      position: "absolute",
      borderColor: "transparent #ff2c1f",
      borderStyle: "solid",
      borderWidth: "0 22px 8px",
    },
  },
  cardDateTime: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: "300px",
    transform: "translateY(calc(-100% - 16px))",
    "& span": {
      backgroundColor: theme.palette.myColor.secondary,
      color: theme.palette.myColor.grey,
      height: "30px",
      lineHeight: "30px",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      borderRadius: "2px",
    },
  },
  cardIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.myColor.secondary,
    color: theme.palette.myColor.grey,
    width: "30px",
    height: "30px",
    marginRight: theme.spacing(1),
    borderRadius: "2px",
  },
}));
const MovieItem = ({ movie, showTime = false }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card
      className={classes.card}
      onClick={() => navigate(`/movies/${movie.maPhim}`)}
    >
      <CardActionArea className={classes.cardContainer}>
        <Box sx={{ width: "100%", overflow: "hidden", flexShrink: 0 }}>
          <CardMedia
            component="img"
            height="300px"
            width="100%"
            image={movie.hinhAnh}
            alt={movie.biDanh}
            sx={{ transition: ".5s linear" }}
          />
        </Box>
        <CardContent sx={{ flex: 1, width: "100%" }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            className={classes.cardTitle}
          >
            {movie.tenPhim}
          </Typography>
        </CardContent>
      </CardActionArea>
      {movie.hot && (
        <Box component="div" className={classes.cardBadge}>
          <Typography variant="subtitle2" textAlign="center">
            HOT
          </Typography>
        </Box>
      )}
      {showTime && (
        <Box className={classes.cardDateTime}>
          <Icon component="div" className={classes.cardIcon}>
            <TodayIcon />
          </Icon>
          <Typography component="span">
            {formatShortDate(movie.ngayKhoiChieu)}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default MovieItem;
MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  showTime: PropTypes.bool,
};

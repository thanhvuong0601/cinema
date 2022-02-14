import { Grid, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import clsx from "clsx";
import React from "react";
const useStyles = makeStyles((theme) => ({
  bgContentLoading: {
    backgroundColor: theme.palette.myColor.lightBlack,
  },
  contentLoading: {
    width: "100%",
    height: "250px",
  },
}));
const ContentLoading = ({ numberItem }) => {
  const classes = useStyles();
  return (
    <>
      {[...Array(numberItem).keys()].map((_, i) => (
        <Grid item xs={15} sm={5} md={3} key={i}>
          <Box>
            <Skeleton
              animation="wave"
              variant="rectangular"
              className={clsx(classes.contentLoading, classes.bgContentLoading)}
            />
          </Box>
          <Box mt={1}>
            <Skeleton variant="caption" className = {classes.bgContentLoading}/>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default ContentLoading;
ContentLoading.propTypes = {
  numberItem: PropTypes.number.isRequired,
};

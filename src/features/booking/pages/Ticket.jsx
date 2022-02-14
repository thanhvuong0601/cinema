import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatLongDate } from "../../../utils/formatDate";
import { selectShowTimes, showTimesActions } from "../reducers/showTimeSlice";
import Selection from "./Selection";
import PropTypes from "prop-types";

const Ticket = ({ validation, errors }) => {
  const [allTheater, setAllTheater] = useState([]);
  const [allDateTime, setAllDateTime] = useState([]);
  const [allHours, setAllHours] = useState([]);
  const [allTheaterNum, setAllTheaterNum] = useState([]);

  const { data, selectedValues } = useSelector(selectShowTimes);

  const { theater, address, datetime, hours, theaternumber } = selectedValues;
  const dispatch = useDispatch();

  const findTheaterById = useCallback(
    (id) => {
      return data?.heThongRapChieu?.filter((item) => item.maHeThongRap === id);
    },
    [data]
  );

  const findAddressById = useCallback(
    (id) => {
      const filteredTheater = findTheaterById(theater);
      if (filteredTheater && filteredTheater[0]?.cumRapChieu) {
        return filteredTheater[0]?.cumRapChieu?.filter(
          (item) => item.maCumRap === id
        );
      }
    },
    [findTheaterById, theater]
  );
  // //handle show detail theater when change name
  useEffect(() => {
    if (theater !== "") {
      const filteredTheater = findTheaterById(theater);
      if (filteredTheater && filteredTheater[0]?.cumRapChieu)
        setAllTheater(filteredTheater[0].cumRapChieu);
    }
  }, [theater, findTheaterById]);

  // // handle show unique date when change address
  useEffect(() => {
    if (address !== "") {
      const dates = [];
      const filteredAddress = findAddressById(address);
      if (filteredAddress && filteredAddress[0]?.lichChieuPhim) {
        filteredAddress[0].lichChieuPhim?.forEach((item) => {
          dates.push(formatLongDate(item.ngayChieuGioChieu).date);
        });
        const uniqueDates = new Set(dates);
        setAllDateTime([...uniqueDates]);
      }
    } else {
      setAllDateTime([]);
    }
  }, [address, findAddressById]);

  // //handle show unique time with selected date
  useEffect(() => {
    if (datetime !== "") {
      const filteredAddress = findAddressById(address);
      if (filteredAddress && filteredAddress[0]?.lichChieuPhim) {
        const filteredHours = filteredAddress[0]?.lichChieuPhim.filter(
          (item) => {
            const reverseDate = datetime.split("-").reverse().join("-");
            return item.ngayChieuGioChieu.includes(
              formatLongDate(reverseDate).reverseDate
            );
          }
        );
        const arrTime = filteredHours?.map(
          (item) => formatLongDate(item.ngayChieuGioChieu).hours
        );
        const uniqueTimes = new Set(arrTime);
        setAllHours([...uniqueTimes]);
      }
    } else {
      setAllHours([]);
    }
  }, [datetime, address, findAddressById]);

  // //handle show unique theater number when select hours
  useEffect(() => {
    if (hours !== "") {
      const filteredAddress = findAddressById(address);
      if (filteredAddress && filteredAddress[0]?.lichChieuPhim) {
        const filteredTheaterNum = filteredAddress[0]?.lichChieuPhim.filter(
          (item) => {
            const reverseDate = datetime.split("-").reverse().join("-");
            const stringDateTime =
              formatLongDate(reverseDate).reverseDate + " " + hours;
            return (
              new Date(item.ngayChieuGioChieu).getTime() ===
              new Date(stringDateTime).getTime()
            );
          }
        );
        const theaterNum = filteredTheaterNum?.map((item) => item.tenRap);
        setAllTheaterNum(theaterNum);
      }
    } else {
      setAllTheaterNum([]);
    }
  }, [hours, address, datetime, findAddressById]);

  // // get showtime id with all selected values
  useEffect(() => {
    if (theaternumber !== "") {
      const filteredAddress = findAddressById(address);
      if (filteredAddress && filteredAddress[0]?.lichChieuPhim) {
        const filteredTheaterNum = filteredAddress[0]?.lichChieuPhim.filter(
          (item) => {
            const reverseDate = datetime.split("-").reverse().join("-");
            const stringDateTime =
              formatLongDate(reverseDate).reverseDate + " " + hours;
            return (
              new Date(item.ngayChieuGioChieu).getTime() ===
              new Date(stringDateTime).getTime()
            );
          }
        );

        const [filteredShowTime] = filteredTheaterNum?.filter(
          (item) => item.tenRap === theaternumber
        );
        dispatch(showTimesActions.setCalendarId(filteredShowTime.maLichChieu));
      }
    }
  }, [address, theaternumber, hours, datetime, findAddressById, dispatch]);

  return (
    <Grid
      container
      sx={{
        textTransform: "capitalize",
      }}
      rowSpacing={4}
      columnSpacing={2}
    >
      <Grid item xs={12}>
        <Selection
          label="theater"
          options={data?.heThongRapChieu}
          validation={validation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12}>
        <Selection
          label="address"
          options={allTheater}
          validation={validation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Selection
          label="datetime"
          options={allDateTime}
          validation={validation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Selection
          label="hours"
          options={allHours}
          validation={validation}
          errors={errors}
        />
      </Grid>
      <Grid item xs={12} sm={12} lg={4}>
        <Selection
          label="theaternumber"
          options={allTheaterNum}
          validation={validation}
          errors={errors}
        />
      </Grid>
    </Grid>
  );
};

export default Ticket;
Ticket.propTypes = {
  validation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

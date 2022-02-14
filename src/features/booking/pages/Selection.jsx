import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectShowTimes, showTimesActions } from "../reducers/showTimeSlice";
import PropTypes from "prop-types";
const Selection = ({ label, options, validation, errors }) => {
  const { selectedValues } = useSelector(selectShowTimes);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(showTimesActions.selection({ name, value }));
    validation({ [name]: value });
  };

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValues[label]}
        label={label}
        name={label}
        onChange={handleChange}
        error={!!errors[label]}
      >
        {options?.map((item, i) => (
          <MenuItem
            key={i}
            value={
              label === "theater"
                ? item.maHeThongRap
                : label === "address"
                ? item.maCumRap
                : item
            }
          >
            {label === "theater"
              ? item.tenHeThongRap
              : label === "address"
              ? item.tenCumRap + " - " + item.diaChi
              : item}
          </MenuItem>
        ))}
      </Select>
      {errors[label] && <FormHelperText error>{errors[label]}</FormHelperText>}
    </FormControl>
  );
};

export default Selection;

Selection.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  validation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

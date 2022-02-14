import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  data: [],
  calendarId: "",
  selectedValues: {
    theater: "",
    address: "",
    datetime: "",
    hours: "",
    theaternumber: "",
  },
  selectedSeats: [],
};

const showTimeSlice = createSlice({
  name: "showTimes",
  initialState,
  reducers: {
    getShowTimePending: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    getShowTimeSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getShowTimeFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    selection: (state, action) => {
      const { name, value } = action.payload;
      switch (name) {
        case "theater":
          state.selectedValues = {
            theater: value,
            address: "",
            datetime: "",
            hours: "",
            theaternumber: "",
          };
          break;
        case "address": {
          state.selectedValues = {
            ...state.selectedValues,
            address: value,
            datetime: "",
            hours: "",
            theaternumber: "",
          };
          break;
        }
        case "datetime": {
          state.selectedValues = {
            ...state.selectedValues,
            datetime: value,
            hours: "",
            theaternumber: "",
          };
          break;
        }
        case "hours": {
          state.selectedValues = {
            ...state.selectedValues,
            hours: value,
            theaternumber: "",
          };
          break;
        }
        default:
          state.selectedValues = {
            ...state.selectedValues,
            theaternumber: value,
          };
          break;
      }
    },
    resetState: (state) => {
      state.selectedValues = {
        theater: "",
        address: "",
        datetime: "",
        hours: "",
        theaternumber: "",
      };
      state.selectedSeats = [];
    },
    setCalendarId: (state, action) => {
      state.calendarId = action.payload;
    },
    toggleSelectSeat: (state, action) => {
      const { maGhe } = action.payload;
      const isSelected = state.selectedSeats.some(
        (item) => item.maGhe === maGhe
      );
      if (isSelected) {
        const newSelected = state.selectedSeats.filter(
          (item) => item.maGhe !== maGhe
        );
        state.selectedSeats = newSelected;
      } else {
        state.selectedSeats = [...state.selectedSeats, action.payload];
      }
    },
  },
});
const showTimesReducer = showTimeSlice.reducer;
export const selectShowTimes = (state) => state.showTimes;
export const showTimesActions = showTimeSlice.actions;

export default showTimesReducer;

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import movieReducer from "../features/movies/reducers/movieSlice";
import showTimesReducer from "../features/booking/reducers/showTimeSlice";
import authReducer from "../features/auth/reducers/authSlice";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    movies: movieReducer,
    showTimes: showTimesReducer,
    auth: authReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;

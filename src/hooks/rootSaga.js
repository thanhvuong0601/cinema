import { all } from "redux-saga/effects";
import authSaga from "../features/auth/sagas/authSaga";
import movieSaga from "../features/movies/sagas/movieSaga";
import showTimeSaga from "../features/booking/sagas/showTimeSaga";
export default function* rootSaga() {
  yield all([movieSaga(), showTimeSaga(), authSaga()]);
}

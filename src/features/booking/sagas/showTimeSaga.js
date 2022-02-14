import { call, fork, put, take } from "redux-saga/effects";
import movieApi from "../../../api/movieApi";
import { showTimesActions } from "../reducers/showTimeSlice";

function* watchShowTime() {
  while (true) {
    const { payload } = yield take(showTimesActions.getShowTimePending.type);
    try {
      const result = yield call(movieApi.getShowTimes, payload);
      yield put(showTimesActions.getShowTimeSuccess(result));
    } catch (error) {
      yield put(showTimesActions.getShowTimeFailed(error.message));
    }
  }
}
function* watchBooking() {
  
}

function* showTimeSaga() {
  yield fork(watchShowTime);
  yield fork(watchBooking);
}
export default showTimeSaga;

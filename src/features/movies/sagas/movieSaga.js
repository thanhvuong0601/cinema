import { call, fork, put, take } from "redux-saga/effects";
import movieApi from "../../../api/movieApi";
import { movieActions } from "../reducers/movieSlice";

function* watchGetMovies() {
  while (true) {
    // 3 case: get all, get item/page, get item search
    const { payload } = yield take(movieActions.getMovie.type);
    try {
      // at phone screen  can't pass params when call api =>get All.
      // at desktop screen   pass params when call api =>get item/page.
      const params = payload ? payload?.searchOptions : payload;
      const result = yield call(movieApi.getAllMovies, params);
      yield put(movieActions.getMovieSuccess(result));
    } catch (error) {
      yield put(movieActions.getMovieFailed(error.message));
    }
  }
}
export default function* movieSaga() {
  yield fork(watchGetMovies);
}

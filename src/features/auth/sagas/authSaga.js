import { call, fork, put, take } from "redux-saga/effects";
import { authActions } from "../reducers/authSlice";
import movieApi from "../../../api/movieApi";

function* handleLogin(data) {
  try {
    const user = yield call(movieApi.login, data);
    localStorage.setItem("accessToken", user.accessToken);
    yield put(authActions.loginSuccess(user));
  } catch (e) {
    yield put(authActions.loginFailed(e?.response?.data?.content || e.message));
  }
}

function* handleLogout() {
  localStorage.removeItem("accessToken");
}

function* handleGetInfoUser() {
  try {
    const user = yield call(movieApi.getInfoUser);
    yield put(authActions.getInfoUseSuccess(user));
  } catch (e) {
    yield put(authActions.getInfoUseFailed());
    yield call(handleLogout);
  }
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
    if (!isLoggedIn) {
      const { payload } = yield take(authActions.login.type);
      yield fork(handleLogin, payload);
    }

    // after login & reload page => getInfo user by accessToken
    // if accessToken invalid => remove accessToken
    const { type } = yield take([
      authActions.logout.type,
      authActions.loginFailed.type,
      authActions.getInfoUser.type,
    ]);

    if (type === authActions.getInfoUser.type) {
      yield call(handleGetInfoUser);
    } else {
      yield call(handleLogout);
    }
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}

import {Alert} from 'react-native';
import {takeEvery, takeLatest, call, fork, put} from 'redux-saga/effects';
import * as actions from './actions';
import navigation from '../../navigation/NavigationService';

import {client} from '../../../App';
import {
  CHANGE_PASSWORD,
  GET_NOTIFICATIONS,
  LOGIN_USER,
  REGISTER_USER,
  REQUEST_VERIFICATION_CODE,
  UPDATE_USER,
  VERIFY_CODE,
} from './graphql';

function showAlert(title, message) {
  Alert.alert(title, message);
}

function* logoutSaga() {
  yield navigation.navigate('Auth', {screen: 'Welcome'});
}

function* getNotificationsSaga() {
  try {
    const response = yield call(client.query, {query: GET_NOTIFICATIONS});
    if (response.data) {
      const notifications = response.data.getNotifications;
      yield put({
        type: actions.Types.GET_NOTIFICATIONS_SUCCESS,
        payload: notifications,
      });
    } else {
      yield put({
        type: actions.Types.GET_NOTIFICATIONS_ERROR,
        payload: 'Error encountered while fetching notification',
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.GET_NOTIFICATIONS_ERROR,
      payload: error,
    });
  }
}

function* verifyCodeSaga({payload}) {
  try {
    const {code, email, type} = payload;
    let response = yield call(client.mutate, {
      mutation: VERIFY_CODE,
      variables: {code, email, type},
    });

    if (response.data.verifyCode?.success) {
      yield put({
        type: actions.Types.VERIFY_CODE_SUCCESS,
      });
      if (payload.isResetPassword) {
        yield navigation.navigate('Reset', {email});
      } else {
        yield navigation.replace('Main');
      }
    } else {
      yield put({
        type: actions.Types.VERIFY_CODE_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.VERIFY_CODE_ERROR,
    });
  }
}

function* requestCodeSaga({payload}) {
  try {
    let response = yield call(client.mutate, {
      mutation: REQUEST_VERIFICATION_CODE,
      variables: payload,
    });

    if (response.data.requestVerificationCode?.success) {
      yield put({
        type: actions.Types.REQUEST_VERIFICATION_CODE_SUCCESS,
      });
    } else {
      yield put({
        type: actions.Types.REQUEST_VERIFICATION_CODE_ERROR,
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.REQUEST_VERIFICATION_CODE_SUCCESS,
    });
  }
}

function* changePasswordSaga({payload}) {
  try {
    let response = yield call(client.mutate, {
      mutation: CHANGE_PASSWORD,
      variables: payload,
    });

    if (response.data.changePassword?.success) {
      yield put({
        type: actions.Types.CHANGE_PASSWORD_SUCCESS,
      });
      yield navigation.navigate('Login');
    } else {
      yield put({
        type: actions.Types.CHANGE_PASSWORD_ERROR,
      });
      yield showAlert('Error!', 'Password update failed.');
    }
  } catch (error) {
    yield put({
      type: actions.Types.CHANGE_PASSWORD_ERROR,
    });
    yield showAlert('Password update failed!', error.message);
  }
}

function* updateUserSaga({payload}) {
  try {
    let response = yield call(client.mutate, {
      mutation: UPDATE_USER,
      variables: payload,
    });

    if (response.data.updateUser?.success) {
      const {
        data: {
          updateUser: {
            result: {user},
          },
        },
      } = response;
      yield put({
        type: actions.Types.UPDATE_SUCCESS,
        payload: {user},
      });
    } else {
      yield put({
        type: actions.Types.UPDATE_ERROR,
        payload: {
          error: response.data.updateUser?.message || 'Unable to update user.',
        },
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.UPDATE_ERROR,
      payload: {
        error,
      },
    });
  }
}

function* loginUserSaga({payload}) {
  try {
    const variables = {
      phone: payload.phone,
      password: payload.password,
    };

    let response = yield call(client.mutate, {
      mutation: LOGIN_USER,
      variables,
    });

    if (!response.error && response.data.login?.success) {
      const {
        data: {
          login: {
            success,
            message,
            result: {user, token},
          },
        },
      } = response;
      yield put({
        type: actions.Types.LOGIN_SUCCESS,
        payload: {sessionToken: token, user},
      });
      yield navigation.replace('Main');
    } else {
      const errorMessage = response.error?.message || 'Unable to login user.';

      yield put({
        type: actions.Types.LOGIN_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      yield call(showAlert, 'Login failed!', errorMessage);
    }
  } catch (error) {
    yield put({
      type: actions.Types.LOGIN_ERROR,
      payload: {
        error,
      },
    });
    yield call(showAlert, 'Login failed!', error.message);
  }
}

function* registerUserSaga({payload}) {
  try {
    const variables = {
      phone: payload.phone,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      dob: payload.dob,
      email: payload.email,
      gender: payload.gender,
    };

    let response = yield call(client.mutate, {
      mutation: REGISTER_USER,
      variables,
    });

    if (!response.error && response.data.register?.success) {
      const {
        data: {
          register: {
            success,
            message,
            result: {user, token},
          },
        },
      } = response;
      yield put({
        type: actions.Types.SIGNUP_SUCCESS,
        payload: {sessionToken: token, user},
      });
      yield navigation.navigate('Verify', {email: payload.email});
    } else {
      const errorMessage =
        response.data.register?.message || 'Unable to create account.';
      yield put({
        type: actions.Types.SIGNUP_ERROR,
        payload: {
          error: errorMessage,
        },
      });
      yield call(showAlert, 'Sign up failed!', errorMessage);
    }
  } catch (error) {
    yield put({
      type: actions.Types.SIGNUP_ERROR,
      payload: {
        error: error,
      },
    });
    yield call(showAlert, 'Sign up failed!', error.message);
  }
}

function* watchLoginSaga() {
  yield takeLatest(actions.Types.LOGIN, loginUserSaga);
}

function* watchRegisterSaga() {
  yield takeLatest(actions.Types.SIGNUP, registerUserSaga);
}

function* watchLogoutSaga() {
  yield takeLatest(actions.Types.LOGOUT, logoutSaga);
}

function* watchUpdateSaga() {
  yield takeLatest(actions.Types.UPDATE, updateUserSaga);
}

function* watchChangePasswordSaga() {
  yield takeLatest(actions.Types.CHANGE_PASSWORD, changePasswordSaga);
}

function* watchRequestCodeSaga() {
  yield takeLatest(actions.Types.REQUEST_VERIFICATION_CODE, requestCodeSaga);
}

function* watchVerifyCodeSaga() {
  yield takeLatest(actions.Types.VERIFY_CODE, verifyCodeSaga);
}

function* watchGetNotificationsSaga() {
  yield takeLatest(actions.Types.NOTIFICATION_RECEIVED, getNotificationsSaga);
}

const UserSagas = [
  fork(watchLoginSaga),
  fork(watchLogoutSaga),
  fork(watchRegisterSaga),
  fork(watchUpdateSaga),
  fork(watchChangePasswordSaga),
  fork(watchRequestCodeSaga),
  fork(watchVerifyCodeSaga),
  fork(watchGetNotificationsSaga),
];

export default UserSagas;

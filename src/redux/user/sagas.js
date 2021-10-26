import {Alert} from 'react-native';
import {takeEvery, takeLatest, call, fork, put} from 'redux-saga/effects';
import * as actions from './actions';
import navigation from '../../navigation/NavigationService';

import {client} from '../../../App';
import {LOGIN_USER, REGISTER_USER, UPDATE_USER} from './graphql';

function showAlert(title, message) {
  Alert.alert(title, message);
}

function* logoutSaga() {
  yield navigation.navigate('Auth', {screen: 'Welcome'});
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
      yield navigation.replace('Main');
    } else {
      const errorMessage = response.data.register?.message || 'Unable to create account.';
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

const UserSagas = [
  fork(watchLoginSaga),
  fork(watchLogoutSaga),
  fork(watchRegisterSaga),
  fork(watchUpdateSaga),
];

export default UserSagas;

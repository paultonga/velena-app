import {takeEvery, takeLatest, call, fork, put} from 'redux-saga/effects';
import * as actions from './actions';
import navigation from '../../navigation/NavigationService';

import {client} from '../../../App';
import {LOGIN_USER, REGISTER_USER} from './graphql';

function* logoutSaga() {
  yield navigation.navigate('Auth', {screen: 'Welcome'});
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
      yield put({
        type: actions.Types.LOGIN_ERROR,
        payload: {
          error: response.data.login?.message || 'Unable to login user.',
        },
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.LOGIN_ERROR,
      payload: {
        error,
      },
    });
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
      yield put({
        type: actions.Types.SIGNUP_ERROR,
        payload: {
          error: response.data.register?.message || 'Unable to create account.',
        },
      });
    }
  } catch (error) {
    yield put({
      type: actions.Types.SIGNUP_ERROR,
      payload: {
        error: error,
      },
    });
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

const UserSagas = [
  fork(watchLoginSaga),
  fork(watchLogoutSaga),
  fork(watchRegisterSaga),
];

export default UserSagas;

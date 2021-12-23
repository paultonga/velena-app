export const Types = {
  RESET: 'user/RESET',
  LOGIN: 'user/LOGIN',
  SIGNUP: 'user/SIGNUP',
  LOGIN_ERROR: 'user/LOGIN_ERROR',
  SIGNUP_ERROR: 'user/SIGNUP_ERROR',
  LOGIN_SUCCESS: 'user/LOGIN_SUCCESS',
  SIGNUP_SUCCESS: 'user/SIGNUP_SUCCESS',
  LOGOUT: 'user/LOGOUT',
  UPDATE: 'user/UPDATE',
  UPDATE_SUCCESS: 'user/UPDATE_SUCCESS',
  UPDATE_ERROR: 'user/UPDATE_ERROR',
  SET_INTRO_VIEWED: 'user/SET_INTRO_VIEWED',
  NOTIFICATION_RECEIVED: 'user/NOTIFICATION_RECEIVED',

  VERIFY_CODE: 'user/VERIFY_CODE',
  VERIFY_CODE_SUCCESS: 'user/VERIFY_CODE_SUCCESS',
  VERIFY_CODE_ERROR: 'user/VERIFY_CODE_ERROR',

  CHANGE_PASSWORD: 'user/CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'user/CHANGE_PASSOWRD_SUCCESS',
  CHANGE_PASSWORD_ERROR: 'user/CHANGE_PASSWORD_ERROR',

  REQUEST_VERIFICATION_CODE: 'user/REQUEST_VERIFICATION_CODE',
  REQUEST_VERIFICATION_CODE_SUCCESS: 'user/REQUEST_VERIFICATION_CODE_SUCCESS',
  REQUEST_VERIFICATION_CODE_ERROR: 'user/REQUEST_VERIFICATION_CODE_ERROR',

  GET_NOTIFICATIONS_SUCCESS: 'user/GET_NOTIFICATIONS_SUCCESS',
  GET_NOTIFICATIONS_ERROR: 'user/GET_NOTIFICATIONS_ERROR',
};

export const loginUser = payload => ({
  type: Types.LOGIN,
  payload,
});

export const updateUser = payload => ({
  type: Types.UPDATE,
  payload,
});

export const signUpUser = payload => ({
  type: Types.SIGNUP,
  payload,
});

export const logoutUser = () => ({
  type: Types.LOGOUT,
});

export const setIntroViewed = () => ({
  type: Types.SET_INTRO_VIEWED,
});

export const reset = () => ({
  type: Types.RESET,
});

export const verifyCode = payload => ({
  type: Types.VERIFY_CODE,
  payload,
});

export const requestCode = payload => ({
  type: Types.REQUEST_VERIFICATION_CODE,
  payload,
});

export const changePassword = payload => ({
  type: Types.CHANGE_PASSWORD,
  payload,
});

export const fetchNotifications = () => ({
  type: Types.NOTIFICATION_RECEIVED,
});

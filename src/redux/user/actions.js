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

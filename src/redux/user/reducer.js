import {Types} from './actions';

const INITIAL = {
  user: null,
  sessionToken: null,
  loading: false,
  isLoggedIn: false,
  hasViewedIntro: false,
};

export default function UserReducer(state = INITIAL, action) {
  switch (action.type) {
    case Types.LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case Types.LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case Types.LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        sessionToken: action.payload.sessionToken,
        user: action.payload.user,
        isLoggedIn: true,
      };
    }
    case Types.SIGNUP: {
      return {
        ...state,
        loading: true,
      };
    }
    case Types.SIGNUP_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case Types.SIGNUP_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        sessionToken: action.payload.sessionToken,
        user: action.payload.user,
        isLoggedIn: true,
      };
    }
    case Types.LOGOUT: {
      return {
        ...state,
        error: null,
        loading: false,
        sessionToken: null,
        user: null,
        isLoggedIn: false,
      };
    }
    case Types.SET_INTRO_VIEWED: {
      return {
        ...state,
        hasViewedIntro: true,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

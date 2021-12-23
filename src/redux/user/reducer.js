import {Types} from './actions';

const INITIAL = {
  user: null,
  sessionToken: null,
  loading: false,
  isLoggedIn: false,
  hasViewedIntro: false,
  notifications: new Array(),
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
    case Types.UPDATE: {
      return {
        ...state,
        loading: true,
      };
    }
    case Types.UPDATE_ERROR: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case Types.UPDATE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        user: action.payload.user,
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
    case Types.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case Types.CHANGE_PASSWORD_ERROR:
    case Types.CHANGE_PASSWORD_SUCCESS:
    case Types.REQUEST_VERIFICATION_CODE_ERROR:
    case Types.REQUEST_VERIFICATION_CODE_SUCCESS:
    case Types.VERIFY_CODE_ERROR:
    case Types.VERIFY_CODE_SUCCESS:
    case Types.RESET: {
      return {
        ...state,
        loading: false,
      };
    }
    case Types.CHANGE_PASSWORD:
    case Types.REQUEST_VERIFICATION_CODE:
    case Types.VERIFY_CODE: {
      return {
        ...state,
        loading: true,
      };
    }
    default: {
      return state;
    }
  }
}

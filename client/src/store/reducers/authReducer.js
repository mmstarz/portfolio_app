import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GOT_USER,
  ERR_AUTH,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  ACCOUNT_DELETED,
} from "../actions/types";

// get token from localStorage
const initialState = {
  token: localStorage.getItem("token"),
  isAuth: null,
  loading: true,
  user: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GOT_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: true, // ? need here
      };
    case ACCOUNT_DELETED:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case ERR_AUTH:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: true, // ? true
        user: null // ? should clear user or not
      };
    default:
      return state;
  }
};

export default reducer;

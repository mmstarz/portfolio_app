import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  GOT_USER,
  ERR_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,  
} from "./types";
import { setAlert } from "./alertActions";
import { setAuthToken } from "../../utils/auth";

// @GET USER DATA
export const loadUser = () => {
  return async (dispatch) => {
    // setup axios request header
    const token = localStorage.getItem("token");
    setAuthToken(token);

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: GOT_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: ERR_AUTH });
    }
  };
};

// @LOGIN A USER
export const login = (email, password) => {
  return async (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // body
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(setAlert("Logged in successfully", "success"));
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      }

      dispatch({ type: LOGIN_FAIL });
    }
  };
};

// @REGISTER A USER
export const register = ({ username, email, password }) => {
  return async (dispatch) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // body
    const body = JSON.stringify({ username, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(setAlert("Registered successfully", "success"));
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  };
};

// @LOGOUT
export const logout = () => {
  return (dispatch) => {  
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
    dispatch(setAlert("Logout successfully", "success"));
  };
};

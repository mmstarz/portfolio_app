import axios from "axios";

export const setAuthToken = (token) => {
  // set global header to axios requests  
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

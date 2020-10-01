import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/layout";
import Routes from "./routes/routes";
import "./index.css";
// redux
import { Provider } from "react-redux";
import store from "./store/store";
// action
import { loadUser } from "./store/actions/authActions";
// axios authorization header
import { setAuthToken } from "./utils/auth";
// material-ui
import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
const theme = unstable_createMuiStrictModeTheme();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

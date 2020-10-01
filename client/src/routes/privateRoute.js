import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// ? auth or isAuth only
const PrivateRoute = ({
  auth: { isAuth, loading }, // ? auth, loading
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// ? auth or isAuth only
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);

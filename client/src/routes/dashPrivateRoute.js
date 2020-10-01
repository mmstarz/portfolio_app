import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

// ? auth or isAuth only
const DashPrivateRoute = ({
  auth: { isAuth, loading },
  component: Component,
  edit,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        // !isAuth && loading ?
        !isAuth ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} edit={edit} />
        )
      }
    />
  );
};

DashPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// ? auth or isAuth only
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(DashPrivateRoute);

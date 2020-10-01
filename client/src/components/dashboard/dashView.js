import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// els
import DashViewActions from "./actions/dashViewActions";
import DashViewExp from "./experience/dashViewExp";
import DashViewEdu from "./education/dashViewEdu";

const DashView = ({ profile: { data, loading } }) => {
  return (
    <Fragment>
      <DashViewActions />
      <DashViewExp expList={data.experience} />
      <DashViewEdu eduList={data.education} />
    </Fragment>
  );
};

DashView.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => {
  return {
    profile: state.site.profile,
  };
};

export default connect(mapStatetoProps, null)(DashView);

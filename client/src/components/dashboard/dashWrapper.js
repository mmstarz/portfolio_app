import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as ProfileActions from "../../store/actions/profileActions";
// els
import Spinner from "../../widgets/spinner/spinner";
import DashMain from "./dashMain";

const DashWrapper = ({ loading, getCurrentUserProfile, clearProfile }) => {
  const onMount = useCallback(() => {
    getCurrentUserProfile();
  }, [getCurrentUserProfile]);

  const onUnMount = useCallback(() => {
    clearProfile();
  }, [clearProfile]);

  useEffect(() => {
    let mount = true;

    if (mount && loading) {
      onMount();
    }

    return () => {
      mount = false;
      if (!mount && !loading) {
        onUnMount();
      }
    };
  }, [onMount, onUnMount, loading]);

  return <div>{loading ? <Spinner /> : <DashMain />}</div>;
};

DashWrapper.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  clearProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.site.profile.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUserProfile: () => {
      dispatch(ProfileActions.getCurrentProfile());
    },
    clearProfile: () => {
      dispatch(ProfileActions.clearProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashWrapper);

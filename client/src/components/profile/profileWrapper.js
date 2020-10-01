import React, { Fragment, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { CLEAR_PROFILE, CLEAR_REPOS } from "../../store/actions/types";
import * as ProfileActions from "../../store/actions/profileActions";
// els
import Spinner from "../../widgets/spinner/spinner";
import MainWrapper from "./main/mainWrapper";
import EduWrapper from "./education/eduWrapper";
import ExpWrapper from "./experience/expWrapper";
import ReposWrapper from "./repos/reposWrapper";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// styles
import { makeStyles } from "@material-ui/core/styles";
// with styles
import {
  PaperContainerNoLimit,
  TextPrimary,
} from "../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tbInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  page_icon: {
    color: "white",
  },
  details: {
    color: "white",
    marginLeft: 8,
  },
  edit: {
    color: "white",
  },
  divider: {
    background: "white",
    marginBottom: 8,
    marginTop: 8,
  },
  wrapper1: {
    filter: "drop-shadow(2px 4px 6px black)",
    display: "flex",
    alignItems: "baseline",
    flexWrap: "wrap",
    "@media (max-width: 530px)": {
      justifyContent: "center",
    },
    "@media (min-width: 530px)": {
      justifyContent: "start",
    },
  },
  wrapper2: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    "@media (min-width: 280px)": {
      width: "100%",
      marginBottom: 4,
    },
    "@media (min-width: 530px)": {
      width: "49%",
      marginRight: 4,
      marginBottom: 0,
    },
    "@media (min-width: 780px)": {
      width: "34%",
    },
    "@media (min-width: 1060px)": {
      width: "25%",
    },
  },
  wrapper3: {
    columnWidth: "auto",
    columnGap: 4,
    "@media (min-width: 280px)": {
      width: "100%",
      columnCount: 1,
    },
    "@media (min-width: 530px)": {
      width: "50%",
    },
    "@media (min-width: 780px)": {
      width: "65%",
      columnCount: 2,
    },
    "@media (min-width: 1060px)": {
      width: "74%",
      columnCount: 3,
    },
  },
  flexbox: {
    display: "flex",
    alignItems: "baseline",
    minWidth: 500,
    maxWidth: 600,
  },
  wrap: {
    flexWrap: "wrap",
  },
  nowrap: {
    flexWrap: "nowrap",
  },
}));

const ProfileWrapper = ({
  auth,
  data,
  loading,
  getProfileById,
  clearProfile,
  clearRepos,
  match,
}) => {
  const classes = useStyles();

  const onMount = useCallback(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  const onUnMount = useCallback(() => {
    clearProfile();
    clearRepos();
  }, [clearProfile, clearRepos]);

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

  const current =
    auth.isAuth && !auth.loading && !loading && auth.user._id === data.user._id;

  // const nowrap =
  //   !loading && data && data.experience.length > 0 && data.education.length > 0;

  const renderEdit = () => {
    return (
      <IconButton
        aria-label="details"
        component={RouterLink}
        to="/dashboard"
        color="primary"
        classes={{
          colorPrimary: classes.edit,
        }}
      >
        <EditIcon />
      </IconButton>
    );
  };

  return (
    <PaperContainerNoLimit elevation={0}>
      <Fragment>
        <Box className={classes.toolbar}>
          <Box className={classes.tbInner}>
            <AccountBoxIcon className={classes.page_icon} fontSize="large" />
            <TextPrimary variant="h4" color="primary">
              Profile
            </TextPrimary>
            {!loading && current && renderEdit()}
          </Box>
          <IconButton
            aria-label="details"
            component={RouterLink}
            to="/developers"
            color="inherit"
            classes={{
              colorInherit: classes.details,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Divider classes={{ root: classes.divider }} />
        {loading ? (
          <Spinner />
        ) : (
          <Box
            classes={{
              root: classes.wrapper1,
            }}
          >
            <Box
              classes={{
                root: classes.wrapper2,
              }}
            >
              <MainWrapper />
            </Box>
            <Box
              classes={{
                root: classes.wrapper3,
              }}
            >
              <EduWrapper />
              <ExpWrapper />
              {data.githubusername && <ReposWrapper />}
            </Box>
          </Box>
        )}
      </Fragment>
    </PaperContainerNoLimit>
  );
};

ProfileWrapper.propTypes = {
  data: PropTypes.object,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getProfileById: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  clearRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.site.profile.loading,
  data: state.site.profile.data,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileById: (id) => {
      dispatch(ProfileActions.getProfileById(id));
    },
    clearProfile: () => {
      dispatch({ type: CLEAR_PROFILE });
    },
    clearRepos: () => {
      dispatch({ type: CLEAR_REPOS });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);

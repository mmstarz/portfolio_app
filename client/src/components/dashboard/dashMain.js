import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../store/actions/profileActions";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// mui icons
import PersonIcon from "@material-ui/icons/Person";
// with styles
import {
  TextPrimary,
  BoxAlignLeft,
  BoxMovedLeft,
  BoxFormActionsSpace,
  FAButton,
  PaperContainerLarge,
} from "../../widgets/withStyles/withStyles";
// icons
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
// els
import DashView from "./dashView";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  btnLink: {
    width: 140,
  },
}));

// @DashViewProfile if profile exists
// @Redirect button to DashAddProfile if no profile

const DashMain = ({ auth: { user }, profile, deleteAccount }) => {
  const classes = useStyles();

  return (
    <PaperContainerLarge elevation={0}>
      <TextPrimary variant="h4" color="primary" gutterBottom={true}>
        Dashsboard
      </TextPrimary>

      <BoxMovedLeft>
        <PersonIcon size="small" />
        <TextPrimary variant="subtitle1">
          Welcome to your account, {user && user.username}.
        </TextPrimary>
      </BoxMovedLeft>

      {profile.data !== null ? (
        <DashView />
      ) : (
        <Fragment>
          <BoxAlignLeft>
            <TextPrimary variant="subtitle1">
              You have not yet setup a profile, please add some info.
            </TextPrimary>
          </BoxAlignLeft>
          <BoxFormActionsSpace>
            <FAButton
              color="primary"
              component={Link}
              to="/profile-create"
              classes={{ root: classes.btnLink }}
            >
              <AddIcon className={classes.extendedIcon} />
              Create profile
            </FAButton>
            <FAButton
              classes={{ root: classes.btnLink }}
              color="secondary"
              onClick={() => deleteAccount()}
            >
              <ClearIcon className={classes.extendedIcon} />
              del. account
            </FAButton>
          </BoxFormActionsSpace>
        </Fragment>
      )}
    </PaperContainerLarge>
  );
};

DashMain.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.site.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(ProfileActions.deleteAccount());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashMain);

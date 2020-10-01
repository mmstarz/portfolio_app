import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as ProfileActions from "../../../store/actions/profileActions";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
// icons
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
// with styles
import {
  FAButton,
  BoxFormActionsSpace,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    margin: theme.spacing(1),
  },
}));

const DashViewActions = ({ deleteAccount }) => {
  const classes = useStyles();

  return (
    <BoxFormActionsSpace>
      <FAButton color="primary" to="/profile-edit" component={Link}>
        <EditIcon className={classes.extendedIcon} />
        Profile
      </FAButton>
      <FAButton color="primary" to="/profile-add-edu" component={Link}>
        <AddIcon className={classes.extendedIcon} />
        Education
      </FAButton>
      <FAButton color="primary" to="/profile-add-exp" component={Link}>
        <AddIcon className={classes.extendedIcon} />
        Experience
      </FAButton>
      <FAButton color="secondary" onClick={() => deleteAccount()}>
        <ClearIcon className={classes.extendedIcon} />
        DELETE
      </FAButton>
    </BoxFormActionsSpace>
  );
};

DashViewActions.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAccount: () => {
      dispatch(ProfileActions.deleteAccount());
    },
  };
};

export default connect(null, mapDispatchToProps)(DashViewActions);

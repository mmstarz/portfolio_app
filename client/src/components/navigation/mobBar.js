import React from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
//els
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// styles
import { makeStyles } from "@material-ui/core/styles";
// forms clear
import { clearEduForm } from "../dashboard/profile-forms/addEdu";
import { clearExpForm } from "../dashboard/profile-forms/addExp";
import { clearMainFormData } from "../dashboard/profile-forms/createProfileMain";
import { clearSocialsFormData } from "../dashboard/profile-forms/createProfileSocials";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    "& .nav-ctn": {
      display: "flex",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      display: "flex",
      justifyContent: "space-between",
    },
    [theme.breakpoints.between("md", "xl")]: {
      display: "none",
    },
  },
  menuButton: {
    padding: theme.spacing(2),
    "&:hover": {
      background: "#455a65",
      borderRadius: 0,
      "& span:not(:first-child)": {
        // borderRadius: 0,
        boxShadow: "0px 2px 0px 0px #FF9800",
      },
      "& span:first-child svg": {
        fill: "#FF9800",
      },
    },
  },
  link: {
    color: "white",
    border: 0,
    padding: theme.spacing(2),
    boxShadow: "0px 2px 0px 0px lightcyan",
    fontWeight: 600,
    "&:hover": {
      color: "#FF9800",
      boxShadow: "0px 2px 0px 0px #FF9800",
      background: "#455a65",
    },
  },
}));

const MobBar = ({ click, isAuth, logout }) => {
  const classes = useStyles();

  const handleLogout = () => {
    clearEduForm();
    clearExpForm();
    clearMainFormData();
    clearSocialsFormData();
    logout();
  };

  return (
    <div className={classes.root}>
      <div className="nav-ctn">
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={click}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className={classes.link}>
          MMFactory
        </Link>
      </div>
      <div className="nav-ctn">
        {isAuth && (
          <IconButton
            className={classes.menuButton}
            color="inherit"
            component="button"
            onClick={() => handleLogout()}
          >
            <ExitToAppIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

MobBar.propTypes = {
  isAuth: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  click: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { logout })(MobBar);

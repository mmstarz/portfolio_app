import React from "react";
import PropTypes from "prop-types";
//redux
import { logout } from "../../store/actions/authActions";
import { connect } from "react-redux";
// els
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
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
      display: "none",
    },
    [theme.breakpoints.between("md", "xl")]: {
      display: "flex",
      justifyContent: "space-between",
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
}));

const WideBar = ({ navList, logout, isAuth }) => {
  const classes = useStyles();

  const handleLogout = () => {
    clearEduForm();
    clearExpForm();
    clearMainFormData();
    clearSocialsFormData();
    logout()
  }

  const renderNavLinks = () => {
    return navList.map((item, index) => {
      return (
        <Link key={index} to={item.to} className={classes.link}>
          {item.name}
        </Link>
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className="nav-ctn">
        <Link to="/" className={classes.link}>
          MMFactory
        </Link>
      </div>
      <div className="nav-ctn">
        {renderNavLinks()}
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

WideBar.propTypes = {
  navList: PropTypes.array.isRequired,
  logout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, {logout})(WideBar);

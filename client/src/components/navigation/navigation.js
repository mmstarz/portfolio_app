import React, { useState } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
// els
import UpdSideBar from "./updSideBar";
import MobBar from "./mobBar";
import WideBar from "./wideBar";
// styles
import { makeStyles } from "@material-ui/core/styles";
// mui els
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  },
  bgColor: {
    color: "#fff",
    backgroundColor: "#263238",
    boxShadow: "0px 2px 0px 0px lightcyan",
  },
  drawer_bg: {
    background: "#13191c",
  },
}));

// ? auth or isAuth only?
const Navigation = ({ auth: { isAuth, loading } }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const navList = !isAuth
    ? [
        { name: "Developers", to: "/developers" },
        { name: "Posts", to: "/posts" },
        { name: "Login", to: "/login" },
        { name: "Reister", to: "/register" },
      ]
    : [
        { name: "Dashboard", to: "/dashboard" },
        { name: "Developers", to: "/developers" },
        { name: "Posts", to: "/posts" },
      ];

  // const handleShow = () => {
  //   setShow((status) => !status);
  // };

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        classes={{
          colorPrimary: classes.bgColor,
        }}
      >
        <Toolbar disableGutters={true} variant="dense">
          {/* with drawer */}
          <Drawer
            classes={{ paper: classes.drawer_bg }}
            anchor="left"
            open={show}
            onClose={handleClose}
          >
            <UpdSideBar show={show} click={handleClose} navList={navList} />
          </Drawer>          
          {/* mobbar */}
          <MobBar click={handleOpen} />
          {/* widebar */}
          <WideBar navList={navList} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
};

// ? auth or isAuth only?
const mapStatetoProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStatetoProps)(Navigation);

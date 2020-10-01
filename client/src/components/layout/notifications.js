import React, { useEffect } from "react";
import PropTypes from 'prop-types';

// redux
import { connect } from "react-redux";
import * as AlertActions from "../../store/actions/alertActions";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
// with styles
import {
  BoxNotificationDanger,
  BoxNotificationSuccess,
  ButtonNTFClose
} from "../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    bottom: "10%",
    right: 0,
    background: "transparent",
    marginRight: 8,
    maxHeight: 0,
    "& .notification": {
      position: "relative",
      top: 0,
      left: 0,
      opacity: 0,
      transform: "translateY(0%)",
      transition: "transform 200ms ease-in, opacity 200ms ease-in",
      "&.show": {
        opacity: 1,
        transform: "translateY(-200%)",
        filter: "drop-shadow(2px 4px 6px currentColor)",
      },
      "& .ntfBox": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
  },
  closeBtn: {
    padding: "0 8px",
    border: "0",
    outline: "none",
    background: "transparent",
    cursor: "pointer",
  },
  ntfAction: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

const Notifications = ({ alert, removeAlert }) => {
  const classes = useStyles();

  const renderAlerts = () => {
    const { alerts } = alert;

    return alerts !== null && alerts.length > 0 && alerts.map((el, idx) => {
      return (
        <div
          className="notification"
          key={idx}  
        >
          {el.type === "success" ? (
            <div className="ntfBox">
              <BoxNotificationSuccess>{el.msg}</BoxNotificationSuccess>              
                <ButtonNTFClose
                  component="span"
                  onClick={() => removeAlert(el.id)}
                >
                  <CloseIcon />
                </ButtonNTFClose>              
            </div>
          ) : (
            <div className="ntfBox">
              <BoxNotificationDanger>{el.msg}</BoxNotificationDanger>
              <ButtonNTFClose
                  component="span"
                  onClick={() => removeAlert(el.id)}
                >
                  <CloseIcon />
                </ButtonNTFClose> 
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    let mount = true;

    if (mount) {
      let nodes = document.querySelectorAll(".notification");
      if (nodes.length > 0) {
        nodes.forEach((node) => node.classList.add("show"));
      }
    }

    return () => {
      mount = false;
    };
  }, [alert]);

  return <div className={classes.root}>{renderAlerts()}</div>;
};

Notifications.propTypes = {
    alert: PropTypes.object.isRequired,
    removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAlert: (id) => {
      dispatch(AlertActions.removeAlert(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

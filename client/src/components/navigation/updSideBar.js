import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
// menu
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import HowToRegIcon from "@material-ui/icons/HowToReg";

const useStyles = makeStyles((theme) => ({ 
  list: {
    width: 250,
  },  
  iconColor: {
    color: "#17a2b8", // #17a2b8
  },
}));

const SideBar = ({ show, click, navList }) => {
  const classes = useStyles();

  const renderIcon = (dest) => {
    switch (dest) {
      case "/dashboard":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <DashboardIcon />
          </ListItemIcon>
        );
      case "/posts":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <InboxIcon />
          </ListItemIcon>
        );
      case "/developers":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <AccountBoxIcon />
          </ListItemIcon>
        );
      case "/register":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <HowToRegIcon />
          </ListItemIcon>
        );
      case "/login":
        return (
          <ListItemIcon classes={{ root: classes.iconColor }}>
            <MeetingRoomIcon />
          </ListItemIcon>
        );
      default:
        // code...
        break;
    }
  };

  const renderMenuList = () => {
    return (
      <List>
        {navList.map((item, index) => (
          <Link
            onClick={click}
            key={item.name}
            to={item.to}
            style={{ color: "white" }}
          >
            <ListItem button>
              {renderIcon(item.to)}
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    );
  };

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={click}
      onKeyDown={click}
    >
      <Divider />
      {renderMenuList()}
    </div>
  );
};

export default SideBar;

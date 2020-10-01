import React from "react";
import PropTypes from "prop-types";
// mui els
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// styles
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tech_item_root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 4   
  },
  tech_item_avatar: {
    background: "#263238",
    width: "5rem",
    height: "5rem",
    margin: "4px 8px",
    padding: 8,
    filter: "drop-shadow(1px 1px 2px black)",
    "@media(min-width: 1040px)": {
        width: "4.5rem",
        height: "4.5rem",
    },
    "@media(min-width: 1160px)": {
        width: "4rem",
        height: "4rem",
    }  
  },
  tech_item_avatar_img: {
    width: "120%",
    height: "120%",
  },
  tech_item_name: {
    color: "#263238",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
}));

const TechItem = ({ name, iconsrc }) => {
  const classes = useStyles();

  return (
    <Box className={classes.tech_item_root}>
      <Avatar
        classes={{
          root: classes.tech_item_avatar,
          img: classes.tech_item_avatar_img,
        }}
        alt={name}
        src={iconsrc}
      />
      <Typography
        classes={{ subtitle1: classes.tech_item_name }}
        variant="subtitle1"
      >
        {name}
      </Typography>
    </Box>
  );
};

TechItem.propTypes = {
  name: PropTypes.string.isRequired,
  iconsrc: PropTypes.string.isRequired,
};

export default TechItem;

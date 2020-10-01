import React from "react";
import PropTypes from "prop-types";
import { Link as Routerlink } from "react-router-dom";
// moment
import Moment from "react-moment";
// mui els
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/More";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
// styles
import "./pureSlider.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    position: "absolute",
    top: 0,
    width: "100%",
    display: "flex",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",    
  },
  headerContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  header_title: {
    color: "#FFEB3B",
  },
  header_subheader: {
    color: "#FFEB3B",
  },
  cardActions: {
    position: "absolute !important",
    bottom: 0,
    right: 0,    
  },
  details: {
    fontWeight: "600",
    color: "#FFEB3B",
  },
  icon_button_root: {
    padding: 4,
    color: "#FFEB3B",
  },
}));

const PureSlider = ({ _id, intro, title, date }) => {
  const classes = useStyles();  

  return (
    <span
      className="slide"
      style={{
        backgroundImage: `url(${intro})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",        
      }}
    >
      <CardHeader
        classes={{
          root: classes.headerRoot,
          content: classes.headerContent,
          title: classes.header_title,
          subheader: classes.header_subheader,
        }}
        title={title}
        subheader={<Moment format="YYYY/MM/DD">{date}</Moment>}
      />
      <CardActions
        disableSpacing
        className="redirect"
        classes={{
          root: classes.cardActions,
        }}
      >
        <Typography          
          variant="button"
          display="block"
          classes={{
            button: classes.details,
          }}
        >
          Details
        </Typography>
        <IconButton
          classes={{ root: classes.icon_button_root }}
          size="medium"
          color="secondary"
          component={Routerlink}
          to={`/post/${_id}`}
        >
          <MoreIcon />
        </IconButton>
      </CardActions>
    </span>
  );
};

PureSlider.propTypes = {
  _id: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,  
  date: PropTypes.string.isRequired,  
}

export default PureSlider;

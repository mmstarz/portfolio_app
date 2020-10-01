import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { connect } from "react-redux";
// mui els
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// quill imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  inActive: {
    background: "#757575",
  },
  active: {
    background: "#9C27B0",
  },
  actionButton: {
    color: "white",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const BioSection = ({ bio }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      {bio ? (
        <Fragment>
          <CardActions
            classes={{
              root: classes.active,
            }}
            disableSpacing
          >
            <Typography variant="h6" className={classes.textWhite}>
              Biography:
            </Typography>
            <IconButton
              classes={{
                root: classes.actionButton,
              }}
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <ReactQuill
                name="bio"
                value={bio}
                readOnly={true}
                theme="bubble"
              />
            </CardContent>
          </Collapse>
        </Fragment>
      ) : (
        <CardActions
          classes={{
            root: classes.inActive,
          }}
          disableSpacing
        >
          <Typography variant="h6" className={classes.textWhite}>
            Biography:
          </Typography>
          <IconButton
            classes={{
              root: classes.actionButton,
            }}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            aria-expanded={expanded}
            aria-label="show more"
            disabled={true}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      )}
    </Fragment>
  );
};

BioSection.propTypes = {
  bio: PropTypes.string,
};

const mapStateToProps = (state) => ({
  bio: state.site.profile.data.bio,
});

export default connect(mapStateToProps, null)(BioSection);

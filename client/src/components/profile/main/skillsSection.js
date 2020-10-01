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

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  cardActions: {
    background: "#4CAF50",
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

const SkillsSection = ({ skills }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <CardActions
        classes={{
          root: classes.cardActions,
        }}
        disableSpacing
      >
        <Typography variant="h5" className={classes.textWhite}>
          Skills:
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
          {skills.map((skill, idx) => (
            <Typography key={idx} paragraph>
              {skill}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Fragment>
  );
};

SkillsSection.propTypes = {
  skills: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  skills: state.site.profile.data.skills,
});

export default connect(mapStateToProps, null)(SkillsSection);

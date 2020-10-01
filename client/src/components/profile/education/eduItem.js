import React, { Fragment } from "react";
import PropTypes from "prop-types";
// els
import EduDetails from "./eduDetails";
// mui els
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  cardHeader: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 4,
    "& .MuiCardHeader-content": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0),
      alignSelf: "baseline",
      width: "100%",
    },
  },
  avatarLarge: {
    width: "13rem",
    height: "13rem",
  },
  notCurrent: {
    background: "#4CAF50",
  },
  current: {
    background: "#9C27B0",
  },
}));

const EduItem = ({
  current,
  school,
  degree,
  fieldofstudy,
  from,
  to,
  description,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CardHeader
        classes={{
          root: classes.cardHeader,
        }}
        className={current ? classes.current : classes.notCurrent}
        title={
          <Typography variant="h6" className={classes.textWhite}>
            {school}
          </Typography>
        }      
      />
      <Divider />
      <EduDetails
        current={current}
        degree={degree}
        fieldofstudy={fieldofstudy}
        from={from}
        to={to}
        description={description}
      />
    </Fragment>
  );
};

EduItem.propTypes = {
  school: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  fieldofstudy: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string,
  current: PropTypes.bool,
  description: PropTypes.string,
};

export default EduItem;

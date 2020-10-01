import React, { Fragment } from "react";
import PropTypes from "prop-types";
// els
import ExpDetails from "./expDetails";
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
  current: {
    background: "#4CAF50",
  },
  notCurrent: {
    background: "#9C27B0",
  },
}));

const ExpItem = ({
  current,
  title,
  company,
  location,
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
            {title}
          </Typography>
        }      
      />
      <Divider />
      <ExpDetails
        current={current}
        company={company}
        location={location}
        from={from}
        to={to}
        description={description}
      />
    </Fragment>
  );
};

ExpItem.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  location: PropTypes.string,
  to: PropTypes.string,
  current: PropTypes.bool,
  description: PropTypes.string,
};

export default ExpItem;

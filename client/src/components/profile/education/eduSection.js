import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// els
import EduItem from "./eduItem";
// mui els
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// icons
import ReplayIcon from "@material-ui/icons/Replay";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  cardHeader: {
    background: "#17a2b8",
    textAlign: "center",
  },
  nodata: {
    fontWeight: 600,
  },
  centerFlex: {
    justifyContent: "center",
  },
  colorPrimary: {
    color: "#17a2b8",
  },
}));

const EduSection = ({ education }) => {
  const classes = useStyles();
  const [amount, setAmount] = useState(1);

  const expandable = amount < education.length;
  const shrinkable = amount > 1;

  const showMore = () => {
    if (expandable) {
      setAmount(amount + 1);
    } else {
      return
    }
  };

  const showLess = () => {
    if(shrinkable) {
      setAmount(1)
    } else {
      return
    }
  }  

  const renderEducation = () => {
    if (education.length > 0) {
      return education
        .slice(0, amount)
        .map((edu, idx) => <EduItem key={idx} {...edu} />);
    } else {
      return (
        <CardContent>
          <Typography
            className={classes.nodata}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            There is no education data.
          </Typography>
        </CardContent>
      );
    }
  };

  return (
    <Fragment>
      <CardHeader
        classes={{
          root: classes.cardHeader,
        }}
        title={
          <Typography variant="h4" className={classes.textWhite}>
            Education
          </Typography>
        }
      />
      {renderEducation()}
      <CardActions
        classes={{
          root: classes.centerFlex,
        }}
        disableSpacing
      >
        <IconButton
          aria-label="more"
          onClick={() => showMore()}
          disabled={!expandable}
        >
          <MoreHorizIcon
            classes={{
              colorPrimary: classes.colorPrimary,
            }}
            fontSize="large"
            color={expandable ? "primary" : "disabled"}
          />
        </IconButton>

        <IconButton
          aria-label="more"
          onClick={() => showLess()}
          disabled={amount === 1}
        >
          <ReplayIcon
            fontSize="large"
            color={amount !== 1 ? "secondary" : "disabled"}
          />
        </IconButton>
      </CardActions>
    </Fragment>
  );
};

EduSection.propTypes = {
  education: PropTypes.array,
};

const mapStateToProps = (state) => ({
  education: state.site.profile.data.education,
});

export default connect(mapStateToProps, null)(EduSection);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// els
import TopSectionTitle from './topSectionTitle';
import TopSectionSub from './topSectionSub';
// mui els
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  cardHeader1: {
    background: "#17a2b8",
    textAlign: "center",
  },
  cardHeader2: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    "& .MuiCardHeader-content": {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(0),
      alignSelf: "baseline",
      width: "100%",
    },
    "& .MuiCardHeader-avatar": {
      marginRight: theme.spacing(0),
    },
  },
  avatarLarge: {
    width: "13rem",
    height: "13rem",
  },
}));

const TopSection = ({ user }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CardHeader
        classes={{
          root: classes.cardHeader1,
        }}
        title={
          <Typography variant="h4" className={classes.textWhite}>
            Main
          </Typography>
        }
      />
      <CardHeader
        classes={{
          root: classes.cardHeader2,
        }}
        avatar={
          <Avatar
            alt={user._id}
            src={user.avatar}
            className={classes.avatarLarge}
          />
        }
        title={<TopSectionTitle />}
        subheader={<TopSectionSub />}
      />
    </Fragment>
  );
};

TopSection.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.site.profile.data.user,
});

export default connect(mapStateToProps, null)(TopSection);

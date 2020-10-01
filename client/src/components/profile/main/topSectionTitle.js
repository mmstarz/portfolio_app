import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// mui els
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// icons
import IconButton from "@material-ui/core/IconButton";
// socila icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  textField: {
    padding: "4px 8px",
    marginBottom: 4,
    fontSize: "small",
    fontWeight: 600,
  },
  textLable: {
    textTransform: "capitalize",
  },
  space: {
    display: "flex",
    justifyContent: "space-between",
  },
  socialBtn: {
    padding: 8,
  },
  tw: {
    fill: "#03A9F4",
  },
  fb: {
    fill: "#3F51B5",
  },
  in: {
    fill: "#2196F3",
  },
  yt: {
    fill: "crimson",
  },
  ins: {
    background:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
    fill: "white",
  },
}));

const TopSectionTitle = ({ username, social }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <Divider /> */}
      <Box className={classes.space}>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialBtn}
          aria-label="facebook-link"
          disabled={!social || !social.facebook ? true : false}
          component="a"
          href={social && social.facebook ? social.facebook : "!#"}
        >
          <FacebookIcon
            classes={{
              root: social && social.facebook ? classes.fb : "",
            }}
          />
        </IconButton>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialBtn}
          aria-label="twitter-link"
          disabled={!social || !social.twitter ? true : false}
          component="a"
          href={social && social.twitter ? social.twitter : "!#"}
        >
          <TwitterIcon
            classes={{
              root: social && social.twitter ? classes.tw : "",
            }}
          />
        </IconButton>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialBtn}
          aria-label="youtube-link"
          disabled={!social || !social.youtube ? true : false}
          component="a"
          href={social && social.youtube ? social.youtube : "!#"}
        >
          <YouTubeIcon
            classes={{
              root: social && social.youtube ? classes.yt : "",
            }}
          />
        </IconButton>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialBtn}
          aria-label="linkedin-link"
          disabled={!social || !social.linkedin ? true : false}
          component="a"
          href={social && social.linkedin ? social.linkedin : "!#"}
        >
          <LinkedInIcon
            classes={{
              root: social && social.linkedin ? classes.in : "",
            }}
          />
        </IconButton>
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={classes.socialBtn}
          aria-label="instagram-link"
          disabled={!social || !social.instagram ? true : false}
          component="a"
          href={social && social.instagram ? social.instagram : "!#"}
        >
          <InstagramIcon
            classes={{
              root: social && social.instagram ? classes.ins : "",
            }}
          />
        </IconButton>
      </Box>
      <Divider />
      <Box className={classes.limits}>
        <Typography
          className={classes.textLable}
          variant="body1"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Username:
        </Typography>
        <Typography
          className={classes.textField}
          variant="body2"
          color="textPrimary"
          component="p"
        >
          {username}
        </Typography>
      </Box>
    </Fragment>
  );
};

TopSectionTitle.propTypes = {
  username: PropTypes.string.isRequired,
  social: PropTypes.object,
};

const mapStateToProps = (state) => ({
  username: state.site.profile.data.user.username,
  social: state.site.profile.data.social,
});

export default connect(mapStateToProps, null)(TopSectionTitle);

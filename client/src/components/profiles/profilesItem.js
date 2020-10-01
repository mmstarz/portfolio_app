import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// mui els
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
// icons
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/More";
// socila icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

// with styles
import {
  BoxCardContent,
  BoxCardContentSkills,
} from "../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    width: 300,
    margin: 4,
    filter: "drop-shadow(2px 2px 2px black)",
  },
  header: {
    minHeight: 92,
    overflowX: "overlay",
    "& span": {
      fontSize: "small",
      fontWeight: 600,  
    },
  },
  content: {
    minHeight: 380,
    background: "linear-gradient(-135deg, #CFD8DC, transparent)",
  },
  textFieldLimit: {
    maxWidth: 230,
    padding: "4px 8px",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  skills: {
    minHeight: 108,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  space: {
    justifyContent: "space-between",
  },
  details: {
    color: "#17a2b8",
    marginLeft: 8,
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

const ProfilesItem = ({
  profile: { user, status, social, skills, company, location },
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{
          root: classes.header,
        }}
        avatar={
          <Avatar alt={user._id} src={user.avatar} className={classes.large} />
        }
        action={
          <IconButton
            aria-label="details"
            component={RouterLink}
            to={`/profile/${user._id}`}
            color="inherit"
            classes={{
              colorInherit: classes.details,
            }}
          >
            <MoreIcon />
          </IconButton>
        }
        title={user.username}
        subheader={status}
      />
      <CardContent className={classes.content}>
        <BoxCardContent>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Company:
          </Typography>
          <Typography
            className={classes.textFieldLimit}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {company ? `${company}` : "--no company data--"}
          </Typography>
        </BoxCardContent>
        <BoxCardContent>
          <Typography
            gutterBottom
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Location:
          </Typography>
          <Typography
            className={classes.textFieldLimit}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {location ? `${location}` : "--no location data--"}
          </Typography>
        </BoxCardContent>
        <BoxCardContentSkills>
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Skills:
          </Typography>
          {skills.slice(0, 3).map((skill, idx) => (
            <Typography
              className={classes.textFieldLimit}
              key={idx}
              variant="body2"
              color="textPrimary"
              component="p"
            >
              {skill}
            </Typography>
          ))}
          <Typography variant="body1" color="textSecondary" component="p">
            ...
          </Typography>
        </BoxCardContentSkills>
      </CardContent>

      <CardActions className={classes.space} disableSpacing>
        <IconButton
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
      </CardActions>
    </Card>
  );
};

ProfilesItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfilesItem;

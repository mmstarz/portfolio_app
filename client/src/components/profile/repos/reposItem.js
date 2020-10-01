import React, { Fragment } from "react";
import PropTypes from "prop-types";
// mui els
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
// icons
import HttpIcon from "@material-ui/icons/Http";
import StarsIcon from "@material-ui/icons/Stars";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    color: "white",
    marginTop: 4,
    background: "#607D8B",
  },
  content: {
    background: "#607D8B",
  },
  linkColor: {
    color: "#FFEB3B",
  },
  iconsColor: {
    color: "white",
  },
  actionsSpacing: {
    justifyContent: "space-around",
    background: "#607D8B",
    padding: "16px 8px",
  },
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  textField: {
    padding: "4px 8px",
    marginBottom: 4,
    fontSize: "1.0rem",
    fontWeight: 600,
    color: "white",
  },
  textLable: {
    color: "#FFEB3B",
    fontSize: "1.1rem",
    textTransform: "capitalize",
  },
}));

const ReposItem = ({
  html_url,
  name,
  description,
  stargazers_count,
  watchers_count,
  forks_count,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <CardHeader
        className={classes.header}
        action={
          <IconButton
            className={classes.linkColor}
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            component="a"
            aria-label="link-to"
          >
            <HttpIcon fontSize="large" />
          </IconButton>
        }
        title={
          <Box className={classes.limits}>
            <Typography
              className={classes.textLable}
              variant="body1"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Title:
            </Typography>
            <Typography
              className={classes.textField}
              variant="body2"
              color="textPrimary"
              component="p"
            >
              {name}
            </Typography>
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Box className={classes.limits}>
          <Typography
            className={classes.textLable}
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Description:
          </Typography>
          <Typography
            className={classes.textField}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
      <CardActions className={classes.actionsSpacing}>
        <Badge color="secondary" badgeContent={watchers_count} showZero>
          <VisibilityIcon className={classes.iconsColor} fontSize="large" />
        </Badge>

        <Badge color="secondary" badgeContent={stargazers_count} showZero>
          <StarsIcon className={classes.iconsColor} fontSize="large" />
        </Badge>

        <Badge color="secondary" badgeContent={forks_count} showZero>
          <AccountTreeIcon className={classes.iconsColor} fontSize="large" />
        </Badge>
      </CardActions>
    </Fragment>
  );
};

ReposItem.propTypes = {
  html_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  stargazers_count: PropTypes.number,
  watchers_count: PropTypes.number,
  forks_count: PropTypes.number,
};

export default ReposItem;

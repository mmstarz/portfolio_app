import React from "react";
import PropTypes from "prop-types";
// mui els
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Typography from "@material-ui/core/Typography";
// icons
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";

import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";

import DataUsageIcon from "@material-ui/icons/DataUsage";
import GitHubIcon from "@material-ui/icons/GitHub";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
// styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  service_item_root: {
    marginTop: 2,
    marginBottom: 8,
    "&.design": {
      background: "#388E3C",
    },
    "&.data": {
      background: "#3F51B5",
    },
    "&.libs": {
      background: "#9C27B0",
    },
    "&.stack": {
      background: "#BF360C",
    },
  },
  _icons_avatar_group: {
    alignItems: "center",
    filter: "drop-shadow(1px 1px 2px black)",
    "& .MuiAvatarGroup-avatar:first-child": {
      margin: "4px 8px",
    },
  },
  avatar_group__item: {
    background: "#263238",
    width: "3rem",
    height: "3rem",
    margin: "4px 8px",
    padding: 8,
    "& ._design": {
      fill: "#8BC34A", // "#03A9F4"
    },
    "& ._data": {
      fill: "#00BCD4", // "#4CAF50"
    },
    "& ._libs": {
      fill: "#E91E63", // "#FF5722"
    },
    "& ._stack": {
      fill: "#FF5722",
    },
  },
  _title: {
    color: "white",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  _content: {
    minHeight: 120,
    padding: "12px 24px",
    "&:last-child": {
      paddingBottom: 12,
    },
  },
  _paragraph: {
    color: "white",
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
}));

const ServItem = ({ heading, description, icon }) => {
  const classes = useStyles();

  const renderIcons = () => {
    switch (icon) {
      case "design":
        // code...
        return (
          <AvatarGroup max={4} className={classes._icons_avatar_group}>
            <Avatar
              className={classes.avatar_group__item}
              children={<PhoneAndroidIcon className="_design" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<TabletMacIcon className="_design" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<DesktopWindowsIcon className="_design" />}
            />
          </AvatarGroup>
        );
      case "data":
        // code...
        return (
          <AvatarGroup max={4} className={classes._icons_avatar_group}>
            <Avatar
              className={classes.avatar_group__item}
              children={<DescriptionIcon className="_data" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<StorageIcon className="_data" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<CloudQueueIcon className="_data" />}
            />
          </AvatarGroup>
        );
      case "libs":
        // code...
        return (
          <AvatarGroup max={4} className={classes._icons_avatar_group}>
            <Avatar
              className={classes.avatar_group__item}
              children={<DataUsageIcon className="_libs" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<GitHubIcon className="_libs" />}
            />
            <Avatar
              className={classes.avatar_group__item}
              children={<DeveloperModeIcon className="_libs" />}
            />
          </AvatarGroup>
        );      
      default:
        // code...
        break;
    }
  };

  return (
    <Card className={clsx(classes.service_item_root, icon)}>
      <CardHeader
        classes={{
          title: classes._title,
        }}
        title={heading}
        subheader={renderIcons()}
      />
      <CardContent classes={{ root: classes._content }}>
        <Typography
          classes={{
            paragraph: classes._paragraph,
          }}
          paragraph
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

ServItem.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ServItem;

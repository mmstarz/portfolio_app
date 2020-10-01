import React, { Fragment } from "react";
import PropTypes from "prop-types";
// styles
import { makeStyles } from "@material-ui/core/styles";
// mui els
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
// icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// with styles
import {
  BadgeRequired,
  TextSmallRequired,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    background: "transparent",
    filter: "drop-shadow(1px 1px 2px black)",
    boxShadow: "none",
  },
  avatar: {
    color: "black",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  chip: {
    margin: theme.spacing(0.5),
    "& .MuiChip-avatarColorPrimary": {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
    "& .MuiChip-label": {
      fontSize: "1rem",
    },
  },
  form_group: {
    margin: "1.2rem 0",
    "& > div": {
      position: "relative",
      "& > div": {
        position: "absolute",
        top: -12,
        right: 0,
      },
    },
  },
  icon_btn_add: {
    color: "#17a2b8",
  },
  valid: {
    boxShadow: "0px 2px 0px 0px #21e91e",
  },
  invalid: {
    boxShadow: "0px 2px 0px 0px #f50057",
  },
  untouched: {
    boxShadow: "0px 2px 0px 0px currentColor",
  },
}));

const AddTags = ({
  tags,
  setTags,
  elementName,
  elementBody,
  options,
  info,
  error,
  onBlur,
  onChange,
  onFocus,
  clean,
}) => {
  const classes = useStyles();

  const able = elementBody.value.length > 0;

  const handleKey = (e) => {
    if (e.keyCode === 13) {
      addTag();
    }
  };

  const addTag = () => {
    // check familiar keys
    let valid =
      tags.filter((tag) => tag.key === elementBody.value).length === 0;

    // console.log("valid: ", valid);

    if (valid) {
      let updData = [
        ...tags,
        {
          key: elementBody.value,
          label: `#${elementBody.value}`,
        },
      ];
      // console.log("updChipData: ", updChipData);
      setTags(updData);

      let result = {
        target: {
          name: elementBody.name,
          value: "",
          valid: true,
          added: true,          
        },
      };

      onChange(result);
    } else {
      let result = {
        target: {
          name: elementBody.name,
          value: elementBody.value,
          valid: tags.length > 0,          
          error: "This tag already added",
        },
      };
      onChange(result);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    const updTags = tags.filter(tag => tag.key !== chipToDelete.key)
    // console.log('updTags: ', updTags);
    setTags(updTags);

    let result = {
      target: {
        name: elementBody.name,
        value: elementBody.value,
        valid: tags.length - 1 > 0,
      },
    };
    onChange(result);
  };

  const handleChange = (e) => {
    let valid = tags.length > 0;

    let result = {
      target: {
        name: e.target.name,
        value: e.target.value,
        valid: valid,
      },
    };
    onChange(result);
  };

  return (
    <Fragment>
      <div className={classes.form_group}>
        <div>
          <input
            className={
              options.typed
                ? options.valid
                  ? classes.valid
                  : classes.invalid
                : classes.untouched
            }
            {...elementBody}
            onFocus={(e) => onFocus(e)}
            onBlur={(e) => onBlur(e)}
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleKey(e)}
          />
          <div>
            <IconButton
              classes={{
                colorSecondary: classes.icon_btn_add,
              }}
              disabled={!able}
              color="secondary"
              aria-label="add tag"
              onClick={() => addTag()}
            >
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton
              disabled={!able}
              color="secondary"
              aria-label="clear input"
              onClick={() => clean()}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
        </div>

        <BadgeRequired
          variant="dot"
          color={tags.length > 0 ? "primary" : "secondary"}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <TextSmallRequired>{info}</TextSmallRequired>
        </BadgeRequired>
      </div>
      {tags.length > 0 && (
        <Paper component="ul" className={classes.root}>
          {tags.map((data) => {
            return (
              <li key={data.key}>
                <Chip
                  className={classes.chip}
                  color="primary"
                  // variant="outlined"
                  avatar={<Avatar>#</Avatar>}
                  label={data.label}
                  onDelete={handleDelete(data)}
                />
              </li>
            );
          })}
        </Paper>
      )}
    </Fragment>
  );
};

AddTags.propTypes = {
  tags: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
};

export default AddTags;

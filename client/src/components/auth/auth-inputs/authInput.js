import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
// with styles
import {
  BadgeRequired,
  TextSmall,
  TextSmallRequired,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
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

const AuthInputs = ({
  elementName,
  error,
  elementBody,
  options,
  info,
  onBlur,
  onChange,
  onFocus,
}) => {
  const classes = useStyles();

  // console.log("element name: ", elementName);
  // console.log("element body: ", elementBody);
  // console.log("element options: ", options);

  return (
    <div className="form-group">
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
        onChange={(e) => onChange(e)}
      />
      {info && elementBody.required ? (
        <BadgeRequired
          variant="dot"
          color={options.valid ? "primary" : "secondary"}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <TextSmallRequired>{info}</TextSmallRequired>
        </BadgeRequired>
      ): null}
      {info && !elementBody.required ? <TextSmall>{info}</TextSmall> : null}
    </div>
  );
};

AuthInputs.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  info: PropTypes.string,
  elementBody: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  elementName: PropTypes.string,
  error: PropTypes.object,
};

export default AuthInputs;

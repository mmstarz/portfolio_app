import React from "react";
// styles
import { makeStyles } from "@material-ui/core/styles";
// mui els
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordTwoToneIcon from "@material-ui/icons/FiberManualRecordTwoTone";

const useStyles = makeStyles((theme) => ({
  sliderDots: {
    position: "absolute",
    bottom: "0%",
    zIndex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .dotContainer": {
      background: "transparent",
      position: "relative",
      "& button:hover": {
        backgroundColor: "#ffeb3b8c",
      },
      "@media (hover: none)": {
        "& button:hover": {
          background: "transparent",
        },
      },
    },
  },
  colorAction: {
    color: "#F5F5F5",
  },
  colorcursor: {
    color: "cyan",
  },
  size: {
    padding: theme.spacing(0.5),
  },
  loading: {
    overflow: "hidden",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      background: "cyan",
      width: "12px",
      height: "12px",
      border: 0,
      borderRadius: "50%",
      animation: `$loading 300ms ${theme.transitions.easing.easeIn} forwards`,
    },
    "& svg": {
      animation: `$loadingColor 300ms ${theme.transitions.easing.easeIn} forwards`,
    },
  },
  "@keyframes loading": {
    "0%": {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(.2)",
    },
    "100%": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(1.2)",
    },
  },
  "@keyframes loadingColor": {
    from: {
      color: "white",
    },
    to: {
      color: "cyan",
    },
  },
}));

const PureDots = ({ num, cursor, handleNavDots }) => {
  const classes = useStyles();

  const renderDots = () => {
    let dots = [];
    for (let i = 0; i < num; i++) {
      dots.push(
        <div key={i} className="dotContainer">
          <IconButton
            id={`dot-${i}`}
            onClick={(e) => handleNavDots(i)}
            classes={{
              label: i === cursor ? classes.loading : null,
              root: classes.size,
            }}
          >
            {i === cursor ? (
              <FiberManualRecordTwoToneIcon fontSize="small" color="action" />
            ) : (
              <FiberManualRecordTwoToneIcon
                fontSize="small"
                color="action"
                classes={{
                  colorAction: classes.colorAction,
                }}
              />
            )}
          </IconButton>
        </div>
      );
    }

    return dots;
  };

  return <div className={classes.sliderDots}>{renderDots()}</div>;
};

export default PureDots;

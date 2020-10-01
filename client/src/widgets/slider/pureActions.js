import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// mui els
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  sliderActions: {
    width: "100%",
    position: "absolute",
    zIndex: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    top: "50%",
    transform: "translateY(-50%)",
    "& .actionContainer": {
      background: "transparent",
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
  hide: {
    display: "none",
  },
  colorAction: {
    color: "cyan", // #F5F5F5
    backgroundColor: "#607d8b4d",
  },
  colorDisabled: {
    color: "#90A4AE",
  },
}));

const SwsActions = ({ handleNext, handlePrev, touched }) => {
  const classes = useStyles();

  return (
    <div className={touched ? classes.hide : classes.sliderActions}>
      {/* left chevron button */}
      <div className="actionContainer">
        <IconButton
          edge="end"
          size="medium"
          color="primary"
          onClick={(e) => handlePrev(e)}
        >
          <ChevronLeftIcon
            fontSize="large"
            color="action"
            classes={{ colorAction: classes.colorAction }}
          />
        </IconButton>
      </div>
      {/* right chevron button */}
      <div className="actionContainer">
        <IconButton
          edge="start"
          size="medium"
          color="primary"
          onClick={(e) => handleNext()}
        >
          <ChevronRightIcon
            fontSize="large"
            color="action"
            classes={{ colorAction: classes.colorAction }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default SwsActions;

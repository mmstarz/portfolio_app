import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import TableCell from "@material-ui/core/TableCell";
import Card from "@material-ui/core/Card";

// @BADGE

export const BadgeRequired = withStyles({
  root: {
    marginLeft: 4,
  },
  anchorOriginTopLeftRectangle: {
    top: 0,
    left: 0,
    transform: "scale(1) translate(-50%, 50%)",
    transformOrigin: "0% 0%",
  },
  colorPrimary: {
    backgroundColor: "#21e91e",
  },
})(Badge);

// @CARD

export const CardProfile = withStyles((theme) => ({
  root: {
    minWidth: 250,
    width: "100%",
    margin: "4px auto",
    display: "block",
    breakInside: "avoid-column",
  },
}))(Card);

// @TYPOGRAPHY

export const TextButton = withStyles({
  root: {
    margin: "auto 8px",
    padding: "6px 8px",
    fontSize: "0.875rem",
    lineHeight: "1.75",
    // color: black,
  },
})(Typography);

export const TextSmall = withStyles({
  root: {
    fontSize: "smaller",
    display: "block",
    marginTop: "0.3rem",
    color: "#888",
  },
})(Typography);

export const TextPrimary = withStyles({
  colorPrimary: {
    color: "#17a2b8",
  },
  subtitle1: {
    marginLeft: 4,
  },
  subtitle2: {
    marginLeft: 4,
  },
})(Typography);

export const TextRequired = withStyles({
  root: {
    marginLeft: 8,
    fontSize: "x-small", // ? smaller
  },
})(Typography);

export const TextSmallRequired = withStyles({
  root: {
    fontSize: "smaller",
    marginLeft: 8,
    display: "block",
    marginTop: "0.3rem",
    color: "#888",
  },
})(Typography);

// @BOXES

export const BoxFormActionsSpace = withStyles({
  root: {
    margin: "1.2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
})(Box);

export const BoxCardsCenter = withStyles({
  root: {
    margin: "1.2rem auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
  },
})(Box);

export const BoxFormActionsLeft = withStyles({
  root: {
    margin: "1.2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
})(Box);

export const BoxMovedLeft = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    margin: "1rem 0",
    marginLeft: 0,
  },
})(Box);

export const BoxAlignLeft = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    margin: "1rem 0",
  },
})(Box);

export const BoxMessageDanger = withStyles({
  root: {
    background: "#dc3545",
    color: "white",
    padding: "0.8rem",
    margin: "1rem 0",
    opacity: "0.9",
  },
})(Box);

export const BoxMessageSuccess = withStyles({
  root: {
    background: "#4caf50",
    color: "white",
    padding: "0.8rem",
    margin: "1rem 0",
    opacity: "0.9",
  },
})(Box);

export const BoxNotificationSuccess = withStyles({
  root: {
    color: "white",
    margin: "1rem 0",
    opacity: 0.9,
    padding: 12,
    background: "#4caf50",
    fontSize: 15,
  },
})(Box);

export const BoxNotificationDanger = withStyles({
  root: {
    color: "white",
    margin: "1rem 0",
    opacity: 0.9,
    padding: 12,
    fontSize: 15,
    background: "#E91E63",
  },
})(Box);

export const BoxCardContent = withStyles({
  root: {
    borderBottom: "1px solid #009688",
    marginTop: "0.35em",
    minHeight: 92,
  },
})(Box);

export const BoxCardContentSkills = withStyles({
  root: {
    marginTop: "0.35em",
  },
})(Box);

// @BUTTONS

// floating action button
export const FAButton = withStyles({
  root: {
    width: 120,
    height: 40,
    marginBottom: 8,
    padding: "0 8px 0 0",
    minWidth: 40,
    minHeight: "auto",
    borderRadius: 2,
    fontSize: "x-small",
  },
  primary: {
    backgroundColor: "#17a2b8",
    color: "white",
    "&:hover": {
      backgroundColor: "#257784",
    },
  },
})(Fab);

export const FABSmall = withStyles({
  root: {
    color: "white",
    margin: 2,
    width: 30,
    height: 30,
    minHeight: "auto",
    borderRadius: "50%",
  },
  primary: {
    backgroundColor: "#17a2b8",
    "&:hover": {
      color: "#3fb7ca",
      backgroundColor: "white", // "#3fb7ca"
    },
  },
})(Fab);

export const ButtonPrimary = withStyles({
  containedPrimary: {
    backgroundColor: "#17a2b8",
    "&:hover": {
      backgroundColor: "#45b4c6",
    },
  },
})(Button);

export const ButtonToggle = withStyles({
  root: {
    backgroundColor: "#2d373c",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "#CFD8DC",
      color: "#004D40",
    },
  },
})(Button);

// notification close button
export const ButtonNTFClose = withStyles({
  root: {
    background: " #673AB7",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#7149b9",
    },
  },
})(IconButton);

// @PAPER

export const PaperContainerSmall = withStyles({
  root: {
    width: "95%",
    maxWidth: 400,
    margin: "16px auto",
    padding: 8,
    filter: "drop-shadow(1px 1px 2px black)",
  },
})(Paper);

export const PaperContainerLarge = withStyles({
  root: {
    width: "95%",
    maxWidth: 700,
    margin: "16px auto",
    padding: 8,
    filter: "drop-shadow(1px 1px 2px black)",
  },
})(Paper);

export const PaperContainerNoLimit = withStyles({
  root: {
    width: "99%",
    margin: "16px auto",
    padding: 4,
    filter: "drop-shadow(1px 1px 2px black)",
    background: "#263238",
  },
})(Paper);

// @TABLE

export const TableCellEnd = withStyles({
  root: {
    borderBottom: 0,
  },
  head: {
    background: "#17a2b8",
    color: "white",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  body: {
    background: "aliceblue",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
})(TableCell);

export const TableCellSM = withStyles({
  root: {
    borderRight: "4px solid white",
    borderBottom: 0,
  },
  head: {
    background: "#17a2b8",
    color: "white",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  body: {
    background: "aliceblue",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
})(TableCell);

export const TableCellFlex = withStyles({
  root: {
    display: "flex",
    alignItems: "center",
    borderBottom: 0,
  },
  head: {
    justifyContent: "center",
    background: "#17a2b8",
    color: "white",
    fontWeight: 600,
    textTransform: "uppercase",
  },
  body: {
    background: "aliceblue",
    justifyContent: "center", // "space-between"
  },
})(TableCell);

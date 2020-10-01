import React from "react";
import PropTypes from "prop-types";
// els
import CommentsItem from "./commentsItem";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// with styles
import { TextPrimary } from "../../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper_root: {
    width: "100%",
    marginTop: 16,
    marginBottom: 8,
    padding: "16px 4px",
    maxWidth: 600,
    filter: "drop-shadow(0px 0px 2px black)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
  },
}));

const PostItem = ({ comments }) => {
  const classes = useStyles();

  const renderComments = () => {
    return comments.map((comm, idx) => {
      return <CommentsItem key={idx} {...comm} />;
    });
  };

  return (
    <Paper classes={{ root: classes.paper_root }}>
      <Box className={classes.toolbar}>
        <TextPrimary variant="h5" color="primary">
          Comments
        </TextPrimary>
      </Box>

      <Divider classes={{ root: classes.divider }} />

      {comments && comments.length > 0 ? (
        renderComments()
      ) : (
        <Typography variant="subtitle1">
          There are no comments so far. Consider to add some.
        </Typography>
      )}
    </Paper>
  );
};

PostItem.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default PostItem;

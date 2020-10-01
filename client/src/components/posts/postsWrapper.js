import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CLEAR_POSTS } from "../../store/actions/types";
import { connect } from "react-redux";
import * as PostActions from "../../store/actions/postActions";
// els
import PostsItem from "./postsItems/postsItem";
import Spinner from "../../widgets/spinner/spinner";
// mui els
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
// icons
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AllInboxIcon from "@material-ui/icons/AllInbox";
// with styles
import {
  TextPrimary,
  BoxMovedLeft,
  FAButton,
} from "../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper_root: {
    width: "99%",
    margin: "16px auto",
    padding: 4,
    filter: "drop-shadow(1px 1px 2px black)",
    background: "#263238",
  },
  page_icon: {
    color: "white",
  },
  box: {
    filter: "drop-shadow(1px 1px 2px black)",
  },
  box_wrapper: {
    width: "100%",
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  extendedIcon: {
    margin: theme.spacing(1),
  },
  addPost: {
    display: "flex",
    justifyContent: "center",
    "& .MuiFab-root.Mui-disabled": {
      color: "#546E7A",
      boxShadow: "none",
      backgroundColor: "#9E9E9E",
      cursor: "not-allowed",
    },
  },
  subtitle: {
    color: "white",
  },
}));

const PostsWrapper = ({
  auth: { isAuth },
  posts: { data, loading },
  getPosts,
  clearPosts,
}) => {
  const classes = useStyles();

  const onMount = useCallback(() => {
    getPosts();
  }, [getPosts]);

  const onUnMount = useCallback(() => {
    clearPosts();
  }, [clearPosts]);

  useEffect(() => {
    let mount = true;

    if (mount && loading) {
      onMount();
    }

    return () => {
      mount = false;

      if (!mount && !loading) {
        onUnMount();
      }
    };
  }, [loading, onMount, onUnMount]);

  const renderPosts = () => {
    return data.map((post) => <PostsItem key={post._id} post={post} />);
  };

  return (
    <Paper classes={{ root: classes.paper_root }} elevation={0}>
      <TextPrimary variant="h4" color="primary" gutterBottom={true}>
        Posts
      </TextPrimary>
      {loading ? (
        <Spinner />
      ) : (
        <BoxMovedLeft>
          <AllInboxIcon className={classes.page_icon} fontSize="large" />
          <TextPrimary variant="subtitle1" className={classes.subtitle}>
            {data.length > 0 ? "All of the posts here" : "No posts found..."}
          </TextPrimary>
        </BoxMovedLeft>
      )}

      {!loading && (
        <Box
          classes={{
            root: classes.addPost,
          }}
        >
          <FAButton
            disabled={!isAuth}
            color="primary"
            to="/add-post"
            component={Link}
          >
            <NoteAddIcon className={classes.extendedIcon} />
            Post
          </FAButton>
        </Box>
      )}

      {!loading && data.length > 0 && (
        <Box classes={{ root: classes.box_wrapper }}>{renderPosts()}</Box>
      )}
    </Paper>
  );
};

PostsWrapper.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.stuff.posts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(PostActions.getPosts());
    },
    clearPosts: () => {
      dispatch({ type: CLEAR_POSTS });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsWrapper);

import React, { useState } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../../store/actions/postActions";
// els
import FrontSide from "./frontSide";
import BackSide from "./backSide";
// mui els
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box_wrapper: {
    margin: 4,
    height: 480,
    transformStyle: "preserve-3d",
    perspective: 600,
    "@media(max-width: 280px)": {
      width: "100%",
    },
    "@media(min-width: 280px)": {
      width: "100%",
    },
    "@media(min-width: 400px)": {
      width: 360,
      margin: "4px auto",
    },
    "@media(min-width: 600px)": {
      width: "calc(50% - 8px)",
    },
    "@media(min-width: 900px)": {
      width: "calc(33% - 8px)",
    },
    "@media(min-width: 1200px)": {
      width: "calc(25% - 8px)",
    },
    "@media(min-width: 1600px)": {
      width: "calc(20% - 8px)",
    },
  },
}));

const PostsItem = ({ post, auth, addLike, remLike, deletePost }) => {
  // text username avatar
  // cardHeader - {avatar username date}
  // cardContent - text
  // expand - comments
  // cardActions - likes remove

  const classes = useStyles();
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const deleteable = auth.isAuth && auth.user._id === post.user;
  const likeable =
    auth.isAuth &&
    auth.user._id &&
    post &&
    post.likes.filter((like) => like.user === auth.user._id).length === 0;

  const handleLikes = (post_id) => {
    // console.log("likeable: ", likeable);
    return likeable ? addLike(post_id) : remLike(post_id);
  };

  return (
    <Box className={classes.box_wrapper}>
      <FrontSide
        flip={flipped}
        handleFlip={handleFlip}
        deleteable={deleteable}
        handleLikes={handleLikes}
        handleDelete={deletePost}
        _id={post._id}
        user={post.user}
        avatar={post.avatar}
        username={post.username}
        date={post.date}
        intro={post.intro}
        title={post.title}
        likes={post.likes}
        comments={post.comments}
      />
      <BackSide
        flip={flipped}
        handleFlip={handleFlip}
        tags={post.tags}
        description={post.description}
      />
    </Box>
  );
};

PostsItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (post_id) => {
      dispatch(PostActions.addLike(post_id));
    },
    remLike: (post_id) => {
      dispatch(PostActions.remLike(post_id));
    },
    deletePost: (post_id) => {
      dispatch(PostActions.deletePost(post_id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsItem);

import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../../store/actions/postActions";
// moment
import Moment from "react-moment";
// mui els
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// icons
import FavoriteIcon from "@material-ui/icons/Favorite";
// els
import TagsLogos from "../tags/tagsLogos";
import TagsCloud from "../tags/tagsCloud";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    width: "100%",
    margin: 4,
    filter: "drop-shadow(0px 0px 2px black)",
  },
  header: {
    overflowX: "overlay",
  },
  avatar: {
    width: "5rem",
    height: "5rem",
  },
  userLink: {
    fontWeight: 600,
    textDecoration: "none",
    color: "#40474a",
  },
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  btn_like: {
    margin: 8,
  },
}));

const PostItem = ({ post, addLike, remLike, auth }) => {
  const classes = useStyles();

  // text username avatar
  // cardHeader - {avatar username date}
  // cardContent - text
  // expand - comments
  // cardActions - likes remove

  const likeable =
    auth.isAuth &&
    auth.user._id &&
    post.likes.filter((like) => like.user === auth.user._id).length === 0;

  const handleLikes = (post_id) => {
    // console.log("likeable: ", likeable);
    return likeable ? addLike(post_id) : remLike(post_id);
  };

  const renderContent = () => {
    return <div dangerouslySetInnerHTML={{ __html: post.content }}></div>;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ root: classes.header }}
        avatar={
          <Avatar
            component={RouterLink}
            to={`/profile/${post.user}`}
            className={classes.avatar}
            aria-label="avatar"
            alt={post.user}
            src={post.avatar}
          />
        }
        action={
          <Button
            className={classes.btn_like}
            variant="contained"
            color="secondary"
            startIcon={<FavoriteIcon fontSize="large" />}
            onClick={() => handleLikes(post._id)}
          >
            {post.likes.length}
          </Button>
        }
        title={
          <RouterLink className={classes.userLink} to={`/profile/${post.user}`}>
            {post.username}
          </RouterLink>
        }
        subheader={<Moment format="YYYY/MM/DD">{post.date}</Moment>}
      />
      <CardContent className={classes.limits}>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>

        {renderContent()}

        <TagsLogos tags={post.tags} />

        <TagsCloud tags={post.tags} />
      </CardContent>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addLike: (post_id) => {
      dispatch(PostActions.addLike(post_id, false));
    },
    remLike: (post_id) => {
      dispatch(PostActions.remLike(post_id, false));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

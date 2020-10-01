import axios from "axios";
import { setAlert } from "./alertActions";

import {
  GOT_POST,
  GOT_POSTS,
  GOT_SLIDES,
  ERR_POST,
  ERR_POSTS,  
  UPD_LIKES,
  UPD_LIKES_FROM_POST,
  ERR_LIKES,
  ADD_POST,
  ADD_COMMENT,
  REM_COMMENT,
  DELETE_POST,
} from "./types";

// @route       GET api/posts
// @access      Public (no auth needed)
// @desc        get all posts
export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/posts");
      dispatch({ type: GOT_POSTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: ERR_POSTS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       GET api/posts/slides/:limit
// @access      Public (no auth needed)
// @desc        get limit amount of posts for slides
export const getSlides = (limit) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/slides/${limit}`);
      dispatch({ type: GOT_SLIDES, payload: res.data });
    } catch (err) {
      dispatch({
        type: ERR_POSTS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       GET api/posts/:post_id
// @access      Public (no auth needed)
// @desc        get post by id
export const getPost = (post_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${post_id}`);
      dispatch({ type: GOT_POST, payload: res.data });
    } catch (err) {
      dispatch({
        type: ERR_POSTS,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       POST api/posts
// @access      Private (auth needed)
// @desc        Create a post
export const createPost = (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return async (dispatch) => {
    try {
      // data - {"text": "..."}
      const res = await axios.post("/api/posts", data, config);
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(setAlert("Post created", "success"));
    } catch (err) {
      dispatch({
        type: ERR_POST,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       PUT api/posts/like/:id
// @access      Private (auth needed)
// @desc        add like to post by id
export const addLike = (post_id, from_posts = true) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/like/${post_id}`);
      if (from_posts) {
        dispatch({
          type: UPD_LIKES,
          payload: { id: post_id, likes: res.data },
        });
      } else {
        dispatch({
          type: UPD_LIKES_FROM_POST,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ERR_LIKES,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       PUT api/posts/unlike/:id
// @access      Private (auth needed)
// @desc        remove like from post by id
export const remLike = (post_id, from_posts = true) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${post_id}`);
      if (from_posts) {
        dispatch({
          type: UPD_LIKES,
          payload: { id: post_id, likes: res.data },
        });
      } else {
        dispatch({
          type: UPD_LIKES_FROM_POST,
          payload: res.data,
        });
      }
    } catch (err) {
      dispatch({
        type: ERR_LIKES,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       POST api/posts/comment/:id
// @access      Private (auth needed)
// @desc        add comment to post by id
export const addComment = (post_id, data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return async (dispatch) => {
    try {
      // data - {"text": "..."}
      const res = await axios.post(
        `/api/posts/comment/${post_id}`,
        data,
        config
      );
      dispatch({ type: ADD_COMMENT, payload: res.data });
      dispatch(setAlert("Commented", "success"));
    } catch (err) {
      dispatch({
        type: ERR_POST,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       DELETE api/posts/comment/:post_id/:comment_id
// @access      Private (auth needed)
// @desc        remove comment from post by id
export const remComment = (post_id, comm_id) => {
  return async (dispatch) => {
    try {
      // data - {"text": "..."}
      await axios.delete(`/api/posts/comment/${post_id}/${comm_id}`);
      dispatch({ type: REM_COMMENT, payload: comm_id });
      dispatch(setAlert("Comment removed", "success"));
    } catch (err) {
      dispatch({
        type: ERR_POST,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       DELETE api/posts/:post_id
// @access      Private (auth needed)
// @desc        delete post by id
export const deletePost = (post_id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${post_id}`);
      dispatch({ type: DELETE_POST, payload: post_id });
      dispatch(setAlert("Post Removed", "success"));
    } catch (err) {
      dispatch({
        type: ERR_POST,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

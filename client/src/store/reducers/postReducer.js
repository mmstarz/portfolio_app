import {
  CLEAR_SLIDES,
  CLEAR_POSTS,
  CLEAR_POST,
  GOT_SLIDES,
  GOT_POSTS,
  GOT_POST,
  ERR_POST,
  ERR_POSTS,
  UPD_LIKES,
  UPD_LIKES_FROM_POST,
  ERR_LIKES,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  REM_COMMENT,
} from "../actions/types";

const initialState = {
  posts: {
    data: [],
    loading: true,
  },
  slides: {
    data: [],
    loading: true,
  },
  post: {
    data: null,
    loading: true,
  },
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GOT_POST:
      return {
        ...state,
        post: { data: payload, loading: false },
        error: null,
      };
    case GOT_SLIDES:
      return {
        ...state,
        slides: { data: payload, loading: false },
        error: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          loading: true,
        },
        error: null,
      };
    case GOT_POSTS:
      return {
        ...state,
        posts: { data: payload, loading: false },
        error: null,
      };
    case CLEAR_SLIDES:
      return {
        ...state,
        slides: { data: [], loading: true },
        error: null,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: { data: [], loading: true },
        error: null,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: { data: null, loading: true },
        error: null,
      };
    case UPD_LIKES:
      return {
        ...state,
        posts: {
          data: state.posts.data.map((post) =>
            post._id === payload.id ? { ...post, likes: payload.likes } : post
          ),
          loading: false,
        },
        error: null,
      };
    case UPD_LIKES_FROM_POST:
      return {
        ...state,
        post: {
          data: {
            ...state.post.data,
            likes: payload
          },
          loading: false
        },
        error: null,
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          data: {
            ...state.post.data,
            comments: payload,
          },
          loading: false,
        },
        error: null,
      };
    case REM_COMMENT:
      return {
        ...state,
        post: {
          data: {
            ...state.post.data,
            comments: state.post.data.comments.filter(
              (comm) => comm._id !== payload
            ),
          },
          loading: false,
        },
        error: null,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: {
          data: state.posts.data.filter((post) => post._id !== payload),
          loading: false,
        },
        error: null,
      };
    case ERR_LIKES:
    case ERR_POSTS:
    case ERR_POST:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;

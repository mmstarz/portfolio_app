import {
  GOT_EXPERIENCE,
  GOT_EDUCATION,
  GOT_PROFILES,
  GOT_PROFILE,
  GOT_REPOS,
  ERR_PROFILE,
  CLEAR_REPOS,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  CLEAR_EDUCATION,
  CLEAR_EXPERIENCE,
  UPDATE_PROFILE,
} from "../actions/types";

// @ ORIGINAL
// const initialState = {
//   profile: null,
//   profiles: [],
//   repos: [],
//   loading: true,
//   error: {},
// };

// @ REWORK ? every piece of data has own loading state
const initialState = {
  profile: {
    data: null,
    loading: true,
  },
  profiles: {
    data: [],
    loading: true,
  },
  repos: {
    data: [],
    loading: true,
  },
  education: {
    data: null,
    loading: true,
  },
  experience: {
    data: null,
    loading: true,
  },
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GOT_PROFILE:
      return {
        ...state,
        profile: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case GOT_EDUCATION:
      return {
        ...state,
        education: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case GOT_EXPERIENCE:
      return {
        ...state,
        experience: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case GOT_REPOS:
      return {
        ...state,
        repos: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case GOT_PROFILES:
      return {
        ...state,
        profiles: {
          data: payload,
          loading: false,
        },
        error: null,
      };
    case ERR_PROFILE:
      return {
        ...state,
        profile: {
          data: null,
          loading: false,
        },
        error: payload,
      };
    case CLEAR_REPOS:
      return {
        ...state,
        repos: {
          data: [],
          loading: true,
        },
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {
          data: null,
          loading: true,
        },
        error: null,
      };
    case CLEAR_PROFILES:
      return {
        ...state,
        profiles: {
          data: [],
          loading: true,
        },
        error: null,
      };
    case CLEAR_EDUCATION:
      return {
        ...state,
        education: {
          data: null,
          loading: true,
        },
        error: null,
      };
    case CLEAR_EXPERIENCE:
      return {
        ...state,
        experience: {
          data: null,
          loading: true,
        },
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;

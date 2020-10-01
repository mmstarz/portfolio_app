import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GOT_EXPERIENCE,
  GOT_EDUCATION,
  GOT_PROFILES,
  GOT_PROFILE,
  GOT_REPOS,
  ERR_PROFILE,
  CLEAR_PROFILE,
  CLEAR_PROFILES,
  CLEAR_EDUCATION,
  CLEAR_EXPERIENCE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
} from "./types";

// @route       GET api/profile
// @access      Public (no auth needed)
// @desc        get all profiles
export const getProfiles = () => {
  return async (dispatch) => {
    // clear current profile state
    // dispatch({ type: CLEAR_PROFILE });
    try {
      const res = await axios.get("api/profile");
      dispatch({ type: GOT_PROFILES, payload: res.data });
    } catch (err) {
      dispatch(setAlert(err.response.statusText, "danger"));
      dispatch({
        type: ERR_PROFILE,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       GET api/profile/user/:id
// @access      Public (no auth needed)
// @desc        get profile by user id
export const getProfileById = (user_id) => {
  return async (dispatch) => {
    // console.log('id: ', id);
    // paths with dynamic params should start with /
    try {
      const res = await axios.get(`/api/profile/user/${user_id}`);

      dispatch({ type: GOT_PROFILE, payload: res.data });
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(setAlert(err.response.data.msg, "danger"));
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.data.msg,
            status: err.response.status,
          },
        });
      } else {
        dispatch(setAlert(err.response.statusText, "danger"));
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       GET api/profile/github/:username
// @access      Public (no auth needed)
// @desc        get user's repos from github
export const getProfileRepos = (username) => {
  return async (dispatch) => {
    try {  
      const res = await axios.get(`/api/profile/github/${username}`);

      dispatch({ type: GOT_REPOS, payload: res.data });
    } catch (err) {
      if (err.response.status === 404) {
        dispatch(setAlert(err.response.data.msg, "danger"));
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.data.msg,
            status: err.response.status,
          },
        });
      } else {
        dispatch(setAlert(err.response.statusText, "danger"));
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       GET api/profile/me
// @access      Private (auth needed)
// @desc        get current user's profile
export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("api/profile/me");

      if (res) {
        dispatch({ type: GOT_PROFILE, payload: res.data });
      }
    } catch (err) {
      //   console.log(err.response);
      if (err.response.status === 400) {
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.data.msg,
            status: err.response.status,
          },
        });
      } else {
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       POST api/profile
// @access      Private (auth needed)
// @desc        Create or update user's profile
export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);
      if (res) {
        dispatch({ type: GOT_PROFILE, payload: res.data });
        dispatch(
          setAlert(edit ? "Profile updated" : "Profile created", "success")
        );
      }

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      } else {
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       PUT api/profile/experience
// @access      Private (auth needed)
// @desc        update profile's experience
export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formData, config);
      if (res) {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        dispatch(setAlert("Experience Added", "success"));
      }

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      } else {
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       PUT api/profile/education
// @access      Private (auth needed)
// @desc        update profile's education
export const addEducation = (formData, history) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formData, config);
      if (res) {
        dispatch({ type: UPDATE_PROFILE, payload: res.data });
        dispatch(setAlert("Education Added", "success"));
      }

      history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      } else {
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       DELETE api/profile/education/:edu_id
// @access      Private (auth needed)
// @desc        remove profile's education
export const deleteEdu = (edu_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/profile/education/${edu_id}`);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      dispatch(setAlert("Education removed", "success"));
    } catch (err) {
      dispatch(setAlert(err.response.statusText, "danger"));
      dispatch({
        type: ERR_PROFILE,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       DELETE api/profile/experience/:exp_id
// @access      Private (auth needed)
// @desc        remove profile's experience
export const deleteExp = (exp_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`api/profile/experience/${exp_id}`);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });
      dispatch(setAlert("Experience removed", "success"));
    } catch (err) {
      dispatch(setAlert(err.response.statusText, "danger"));
      dispatch({
        type: ERR_PROFILE,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// @route       DELETE api/profile
// @access      Private (auth needed)
// @desc        delete current user's profile, user, posts
export const deleteAccount = () => {
  return async (dispatch) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        await axios.delete("api/profile");

        dispatch({ type: ACCOUNT_DELETED });
        // dispatch({ type: CLEAR_PROFILE });

        dispatch(setAlert("Account has been deleted permanently", "success"));
      } catch (err) {
        dispatch(setAlert(err.response.statusText, "danger"));
        dispatch({
          type: ERR_PROFILE,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      }
    }
  };
};

// @route       GET api/profile/exp
// @access      Private (auth needed)
// @desc        set experience data
export const setExperienceData = (data) => {
  return (dispatch) => {
    // console.log('data: ', data);
    dispatch({ type: GOT_EXPERIENCE, payload: data });
  };
};

// @route       GET api/profile/edu
// @access      Private (auth needed)
// @desc        set education data
export const setEducationData = (data) => {
  return (dispatch) => {
    // console.log('data: ', data);
    dispatch({ type: GOT_EDUCATION, payload: data });
  };
};

// @ desc - CLEAR EXPERIENCE STATE in REDUCER
export const clearExp = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_EXPERIENCE });
  };
};

// @ desc - CLEAR EDUCATION STATE in REDUCER
export const clearEdu = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_EDUCATION });
  };
};

// @ desc - CLEAR PROFILE STATE in REDUCER
export const clearProfile = () => {
  return (dispatch) => {
    // clear reducer
    dispatch({ type: CLEAR_PROFILE });
  };
};

// @ desc - CLEAR PROFILES STATE in REDUCER
export const clearProfiles = () => {
  return (dispatch) => {
    // clear reducer
    dispatch({ type: CLEAR_PROFILES });
  };
};

import React from "react";
import { Switch, Route } from "react-router-dom";
// wrappers
import PrivateRoute from "./privateRoute";
import DashPrivateRoute from "./dashPrivateRoute";
// redux
import { connect } from "react-redux";
// common routes
import Landing from "../components/landing/landing";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import ProfileWrapper from "../components/profile/profileWrapper";
import ProfilesWrapper from "../components/profiles/profilesWrapper";
import PostsWrapper from "../components/posts/postsWrapper";
import PostWrapper from "../components/posts/post/postWrapper";
// auth routes
import DashWrapper from "../components/dashboard/dashWrapper";
import DashEditProfile from "../components/dashboard/dashEditProfile";
import DashAddExp from "../components/dashboard/experience/dashAddExp";
import DashAddEdu from "../components/dashboard/education/dashAddEdu";
import DashShowEdu from "../components/dashboard/education/dashShowEdu";
import DashShowExp from "../components/dashboard/experience/dashShowExp";
import AddPost from "../components/posts/addPost";
// pts
import PropTypes from "prop-types";

const Routes = ({ auth: { isAuth, loading } }) => {
  return (
    <Switch>
      {/* auth routes */}
      <PrivateRoute exact path="/add-post" component={AddPost} />
      <DashPrivateRoute exact path="/dashboard" component={DashWrapper} />
      <DashPrivateRoute exact path="/dashboard/edu" component={DashShowEdu} />
      <DashPrivateRoute exact path="/dashboard/exp" component={DashShowExp} />
      <DashPrivateRoute
        exact
        path="/profile-create"
        component={DashEditProfile}
        edit={false}
      />
      <DashPrivateRoute
        exact
        path="/profile-edit"
        component={DashEditProfile}
        edit={true}
      />
      <DashPrivateRoute
        exact
        path="/profile-add-exp"
        edit={false}
        component={DashAddExp}
      />
      <DashPrivateRoute
        exact
        path="/profile-add-edu"
        edit={false}
        component={DashAddEdu}
      />
      {/* common routes */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/posts" component={PostsWrapper} />
      <Route exact path="/post/:id" component={PostWrapper} />
      <Route exact path="/developers" component={ProfilesWrapper} />
      <Route exact path="/profile/:id" component={ProfileWrapper} />
      <Route exact path="/" component={Landing} />
    </Switch>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(Routes);

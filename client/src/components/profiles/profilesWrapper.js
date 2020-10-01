import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { getProfiles, clearProfiles } from "../../store/actions/profileActions";
// mui icons
import GroupIcon from "@material-ui/icons/Group";
// els
import ProfilesItem from "./profilesItem";
import Spinner from "../../widgets/spinner/spinner";
// with styles
import {
  PaperContainerNoLimit,
  TextPrimary,
  BoxMovedLeft,
  BoxCardsCenter,
} from "../../widgets/withStyles/withStyles";

// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  page_icon: {
    color: "white",
  },
  page_subtitle: {
    color: "white"
  }
}));

const ProfilesWrapper = ({
  profiles: { data, loading },
  getProfiles,
  clearProfiles,
}) => {
  const classes = useStyles();

  const onMount = useCallback(() => {
    getProfiles();
  }, [getProfiles]);

  const onUnMount = useCallback(() => {
    clearProfiles();
  }, [clearProfiles]);

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

  // console.log('profiles: ', data);
  // loading ? spinner : profiles
  const renderProfiles = () => {
    return data.map((profile) => (
      <ProfilesItem key={profile._id} profile={profile} />
    ));
  };

  return (
    <PaperContainerNoLimit elevation={0}>
      <TextPrimary variant="h4" color="primary" gutterBottom={true}>
        Profiles
      </TextPrimary>
      {loading ? (
        <Spinner />
      ) : (
        <BoxMovedLeft>
          <GroupIcon className={classes.page_icon} fontSize="large" />
          <TextPrimary className={classes.page_subtitle} variant="subtitle1">
            {data.length > 0
              ? "Browse and connect with developers"
              : "No profiles found..."}
          </TextPrimary>
        </BoxMovedLeft>
      )}

      {!loading && data.length > 0 && (
        <BoxCardsCenter>{renderProfiles()}</BoxCardsCenter>
      )}
    </PaperContainerNoLimit>
  );
};

ProfilesWrapper.propTypes = {
  profiles: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  clearProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.site.profiles,
});

const mapDispatchToProps = {
  getProfiles,
  clearProfiles,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesWrapper);

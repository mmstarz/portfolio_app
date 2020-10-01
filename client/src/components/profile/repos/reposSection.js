import React, { Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileRepos } from "../../../store/actions/profileActions";
// els
import Spinner from "../../../widgets/spinner/spinner";
import ReposItem from "./reposItem";
// mui els
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// icons
import ReplayIcon from "@material-ui/icons/Replay";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textWhite: {
    color: "white",
  },
  cardHeader: {
    background: "#17a2b8",
    textAlign: "center",
  },
  nodata: {
    fontWeight: 600,
  },
  centerFlex: {
    justifyContent: "center",
  },
  colorPrimary: {
    color: "#17a2b8",
  },
}));

const ReposSection = ({
  repos: { data, loading },
  githubusername,
  getRepos,
}) => {
  const classes = useStyles();
  const [amount, setAmount] = useState(1);

  const expandable = amount < data.length;
  const shrinkable = amount > 1;

  const showMore = () => {
    if (expandable) {
      setAmount(amount + 1);
    } else {
      return
    }
  };

  const showLess = () => {
    if(shrinkable) {
      setAmount(1)
    } else {
      return
    }
  }

  const onMount = useCallback(() => {
    getRepos(githubusername);
  }, [githubusername, getRepos]);

  useEffect(() => {
    let mount = true;

    if (mount && loading) {
      onMount();
    }

    return () => {
      mount = false;
    };
  }, [loading, onMount]);

  const renderRepos = () => {
    if (data.length > 0) {
      return data
        .slice(0, amount)
        .map((repo, idx) => <ReposItem key={idx} {...repo} />);
    } else {
      return (
        <CardContent>
          <Typography
            className={classes.nodata}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            There is no repositories data.
          </Typography>
        </CardContent>
      );
    }
  };

  return (
    <Fragment>
      <CardHeader
        classes={{
          root: classes.cardHeader,
        }}
        title={
          <Typography variant="h4" className={classes.textWhite}>
            Repositories
          </Typography>
        }
      />
      {loading ? <Spinner /> : renderRepos()}
      <CardActions
        classes={{
          root: classes.centerFlex,
        }}
        disableSpacing
      >
        <IconButton
          aria-label="more"
          onClick={() => showMore()}
          disabled={!expandable}
        >
          <MoreHorizIcon
            classes={{
              colorPrimary: classes.colorPrimary,
            }}
            fontSize="large"
            color={expandable ? "primary" : "disabled"}
          />
        </IconButton>

        <IconButton
          aria-label="more"
          onClick={() => showLess()}
          disabled={amount === 1}
        >
          <ReplayIcon
            fontSize="large"
            color={amount !== 1 ? "secondary" : "disabled"}
          />
        </IconButton>
      </CardActions>
    </Fragment>
  );
};

ReposSection.propTypes = {
  repos: PropTypes.object.isRequired,
  githubusername: PropTypes.string,
  getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.site.repos,
  githubusername: state.site.profile.data.githubusername,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRepos: (githubusername) => {
      dispatch(getProfileRepos(githubusername));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReposSection);

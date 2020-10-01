import React, { useCallback, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CLEAR_SLIDES } from "../../../store/actions/types";
import * as PostActions from "../../../store/actions/postActions";
// mui els
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// els
import Spinner from "../../../widgets/spinner/spinner";
import PureSlider from "../../../widgets/slider/pureSlider";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  gallery_landing_root: {
    margin: "1rem 8px",
    padding: 8,
    background: "white",
  },
  gallery_page_root: {
    margin: "1rem 8px",
    padding: 8,
    background: "white",
  },
  paper_heading: {
    width: "100%",
    textAlign: "center",
    background: "#263238",
    padding: "1rem",
    marginBottom: 18,
  },
  _h4: {
    color: "white",
  },
  _subtitle1: {
    color: "white",
  },
  box_section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& ._items": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%",
    },
  },
}));

const Gallery = ({ slides, getSlides, clearSlides }) => {
  const classes = useStyles();

  const { loading } = slides;
  const amount = 4;

  const onMount = useCallback(() => {
    getSlides(amount);
  }, [getSlides, amount]);

  const onUnMount = useCallback(() => {
    clearSlides();
  }, [clearSlides]);

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

  return (
    <Paper elevation={2} classes={{ root: classes.gallery_landing_root }}>
      <Box
        id="gallery"
        classes={{
          root: classes.box_section,
        }}
      >
        <Paper elevation={2} classes={{ root: classes.paper_heading }}>
          <Typography variant="h4" classes={{ h4: classes._h4 }}>
            Gallery
          </Typography>
          <Typography
            variant="subtitle1"
            classes={{ subtitle1: classes._subtitle1 }}
          >
            Some of the latest posts
          </Typography>
        </Paper>
        {/* slider here with slides */}
        <Fragment>
          {slides && loading ? <Spinner /> : <PureSlider amount={amount} />}
        </Fragment>
        <div className="_items"></div>
      </Box>
    </Paper>
  );
};

Gallery.propTypes = {
  getSlides: PropTypes.func.isRequired,
  clearSlides: PropTypes.func.isRequired,
  slides: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  slides: state.stuff.slides,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSlides: (limit) => {
      dispatch(PostActions.getSlides(limit));
    },
    clearSlides: () => {
      dispatch({ type: CLEAR_SLIDES });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { CLEAR_EDUCATION } from "../../../store/actions/types";
// moment
import Moment from "react-moment";
// els
import Spinner from "../../../widgets/spinner/spinner";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// quill imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

// with styles
import {
  PaperContainerLarge,
  TextPrimary,
} from "../../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    color: "#17a2b8",
    marginLeft: 8,
  },
  limits: {
    margin: "4px 0",
    padding: "4px 8px",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    boxShadow: "0 2px 0px 0px #009688",
  },
  textField: {
    padding: "4px 8px",
    marginBottom: 4,
    fontSize: "small",
    fontWeight: 600,
    color: "#607D8B",
  },
  textLable: {
    color: "#607D8B",
    textTransform: "capitalize",
    fontWeight: 600,
    marginTop: 8,
  },
}));

const DashShowEdu = ({
  edu: {
    data: { school, degree, fieldofstudy, from, to, description, current },
    loading,
  },
  clearEdu,
}) => {
  const classes = useStyles();

  const showData = [
    { school },
    { degree },
    { fieldofstudy },
    { from },
    { to: to ? to : "-- not finished --" },
    { description: description ? description : "-- no cdescription --" },
  ];

  useEffect(() => {
    let mount = true;

    return () => {
      mount = false;
      if (!mount) {
        clearEdu();
      }
    };
  }, [clearEdu]);

  //   console.log("edu data: ", data);
  const renderContent = () => {
    return showData.map((field, idx) => {
      const [data] = Object.entries(field);

      if (data[0] === "from") {
        data[1] = <Moment format="YYYY/MM/DD">{data[1]}</Moment>;
      }

      if (data[0] === "to" && !current) {
        data[1] = <Moment format="YYYY/MM/DD">{data[1]}</Moment>;
      }

      if (data[0] === "description") {
        return (
          <Box key={idx} className={classes.limits}>
            <Typography
              className={classes.textLable}
              variant="body1"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {data[0]}:
            </Typography>
            <ReactQuill
              name="description"
              value={data[1]}
              readOnly={true}
              theme="bubble"
            />
          </Box>
        );
      }

      return (
        <Box key={idx} className={classes.limits}>
          <Typography
            className={classes.textLable}
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {data[0]}:
          </Typography>
          <Typography
            className={classes.textField}
            variant="body2"
            color="textPrimary"
            component="p"
          >
            {data[1]}
          </Typography>
        </Box>
      );
    });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <PaperContainerLarge elevation={0}>
          <Box className={classes.toolbar}>
            <TextPrimary variant="h4" color="primary">
              Education
            </TextPrimary>
            <IconButton
              aria-label="details"
              component={RouterLink}
              to="/dashboard"
              color="inherit"
              classes={{
                colorInherit: classes.details,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Divider />
          {renderContent()}
        </PaperContainerLarge>
      )}
    </div>
  );
};

DashShowEdu.propTypes = {
  edu: PropTypes.object.isRequired,
  clearEdu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    edu: state.site.education,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearEdu: () => {
      dispatch({ type: CLEAR_EDUCATION });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashShowEdu);

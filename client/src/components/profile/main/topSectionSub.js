import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  limits: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
  },
  textField: {
    padding: "4px 8px",
    marginBottom: 4,
    fontSize: "small",
    fontWeight: 600,
  },
  textLable: {
    textTransform: "capitalize",
  },
}));

const TopSectionSub = ({ status, location, company, website }) => {
  const classes = useStyles();

  const data = [
    { status },
    { location: location ? location : "--no location data--" },
    { company: company ? company : "--no company data--" },
    { website: website ? website: "--no website data--"}
  ];

  const renderFields = () => {
    return data.map((field, idx) => {
      const [data] = Object.entries(field);
      
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

  return <Fragment>{renderFields()}</Fragment>;
};

TopSectionSub.propTypes = {
  status: PropTypes.string.isRequired,
  location: PropTypes.string,
  company: PropTypes.string,
  website: PropTypes.string,
};

const mapStateTopProps = (state) => ({
  status: state.site.profile.data.status,
  location: state.site.profile.data.location,
  company: state.site.profile.data.company,
  website: state.site.profile.data.website
});

export default connect(mapStateTopProps, null)(TopSectionSub);

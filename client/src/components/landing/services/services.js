import React from "react";
import PropTypes from "prop-types";
// mui els
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// els
import ServItem from "./servItem";
import Footer from "../../layout/footer";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  services_landing_root: {
    margin: "1rem 8px",
    padding: 8,
    background: "white",
  },
  services_page_root: {
    margin: "1rem 8px",
    padding: 8,
    background: "white",
  },
  paper_heading: {
    width: "100%",
    textAlign: "center",
    background: "#263238",
    padding: "1rem",
    marginBottom: 8,
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
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

const Services = ({ landing }) => {
  const classes = useStyles();

  const servs = [
    {
      heading: "Responsive Design",
      description: `Responsive web design is about creating web pages that look good on all devices.
                    A responsive web design will automatically adjust (resize, hide, shrink, or enlarge)
                    for different screen sizes and viewports (desktops, tablets, and phones).`,
      icon: "design",
    },
    {
      heading: "NoSQL Database",
      description: `NoSQL databases (aka "not only SQL") are non tabular,
                      and store data differently than relational tables.
                      NoSQL databases come in a variety of types based on their data model.
                      The main types are document, key-value, wide-column, and graph.
                      They provide flexible schemas and scale easily with large amounts
                      of data and high user loads.`,
      icon: "data",
    },
    {
      heading: "Open Source",
      description: `Every product has source code.
                      However, commercial software comes in a compiled (ready-to-run) version.
                      Usually, you work through an interface that communicates with
                      the source code, and you never have direct access to it.
                      You can't see it and you can't alter it. Open source, on the other hand,
                      includes the source code in the compiled version.
                      You can access it and modify it. (eliminate bugs and make improvements).`,
      icon: "libs",
    },    
  ];

  return (
    <Paper
      elevation={2}
      classes={{
        root: landing
          ? classes.services_landing_root
          : classes.services_page_root,
      }}
    >
      <Box
        id="services"
        classes={{
          root: classes.box_section,
        }}
      >
        <Paper elevation={2} classes={{ root: classes.paper_heading }}>
          <Typography variant="h4" classes={{ h4: classes._h4 }}>
            Services
          </Typography>
          <Typography
            variant="subtitle1"
            classes={{ subtitle1: classes._subtitle1 }}
          >
            List of main providing services
          </Typography>
        </Paper>
        <div className="_items">
          {servs.map((item) => {
            return <ServItem key={item.heading} {...item} />;
          })}
        </div>
      </Box>
      {!landing && <Footer />}
    </Paper>
  );
};

Services.propTypes = {
  landing: PropTypes.bool.isRequired,
};

export default Services;

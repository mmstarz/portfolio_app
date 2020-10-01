import React from "react";
import PropTypes from "prop-types";
// mui els
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// els
import TechItem from "./techItem";
import Footer from "../../layout/footer";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  technologies_landing_root: {
    margin: "1rem 8px",
    padding: 8,
    background: "white",
  },
  technologies_page_root: {
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
      maxWidth: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      // temp solution
      "@media(max-width: 880px)": {
        height: "auto",
      },
      "@media(min-width: 880px)": {
        height: 438,
      },
      "@media(min-width: 960px)": {
        height: 390,
      },
      "@media(min-width: 1040px)": {
        height: 342,
      },
      "@media(min-width: 1160px)": {
        height: 318,
      },
      "@media(min-width: 1180px)": {
        height: 294,
      },
      "@media(min-width: 1304px)": {
        height: 280,
      },
      "@media(min-width: 1320px)": {
        height: 278,
      },
      "@media(min-width: 1400px)": {
        height: 256,
      }        
    },
  },
}));

const Technologies = ({ landing }) => {
  const classes = useStyles();

  const techs = [
    {
      name: "Apollo",
      iconsrc: "/images/apollo/Apollo-GraphQL-01.png",
    },
    {
      name: "CSS",
      iconsrc: "/images/css/CSS-3-01.png",
    },
    {
      name: "Firebase",
      iconsrc: "/images/firebase/Firebase-02.png",
    },
    {
      name: "GraphQL",
      iconsrc: "/images/graphql/GraphQL-01.png",
    },
    {
      name: "Heroku",
      iconsrc: "/images/heroku/Heroku-01.png",
    },
    {
      name: "HTML",
      iconsrc: "/images/html/HTML-5-01.png",
    },
    {
      name: "JavaScript",
      iconsrc: "/images/javascript/JavaScript-01.png",
    },
    {
      name: "Material-UI",
      iconsrc: "/images/material/Material-UI-01.png",
    },
    {
      name: "MongoDB",
      iconsrc: "/images/mongo/mongo-144.png",
    },
    {
      name: "NodeJS",
      iconsrc: "/images/node/Node-JS-02.png",
    },
    {
      name: "ReactJS",
      iconsrc: "/images/react/React-01.svg",
    },
    {
      name: "Redux",
      iconsrc: "/images/redux/Redux-01.png",
    },
  ];

  return (
    <Paper
      elevation={2}
      classes={{
        root: landing
          ? classes.technologies_landing_root
          : classes.technologies_page_root,
      }}
    >
      <Box
        id="technologies"
        classes={{
          root: classes.box_section,
        }}
      >
        <Paper elevation={2} classes={{ root: classes.paper_heading }}>
          <Typography variant="h4" classes={{ h4: classes._h4 }}>
            Technologies
          </Typography>
          <Typography
            variant="subtitle1"
            classes={{ subtitle1: classes._subtitle1 }}
          >
            List of techs and libs commonly used.
          </Typography>
        </Paper>
        <div className="_items">
          {techs.map((item) => {
            return <TechItem key={item.name} {...item} />;
          })}
        </div>
      </Box>
      {!landing && <Footer />}
    </Paper>
  );
};

Technologies.propTypes = {
  landing: PropTypes.bool.isRequired,
};

export default Technologies;

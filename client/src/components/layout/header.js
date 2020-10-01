import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 58,  
  },
}));

const Header = () => {
    const classes = useStyles()

    return (
        <header className={classes.root} >
            
        </header>
    )
}

export default Header;


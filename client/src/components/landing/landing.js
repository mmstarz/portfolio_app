import React, { Fragment } from "react";
// els
import Intro from "./intro/intro";
import Gallery from "./gallery/gallery";
import Services from "./services/services";
import Technologies from "./tech/techWrapper";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	landing_content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	landing_content_wrapper: {
		width: "100%",
		"@media (max-width: 880px)": {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
		},
		"@media (min-width: 880px)": {
			display: "flex",
			flexDirection: "row",
			alignItems: "baseline",
			justifyContent: "center",
		},
	},
	landing_content_subwrapper1: {
		"@media (max-width: 880px)": {
			width: "100%",
		},
		"@media (min-width: 880px)": {
			width: "50%",
		},	
	},
	landing_content_subwrapper2: {
		"@media (max-width: 880px)": {
			width: "100%",
		},
		"@media (min-width: 880px)": {
			width: "50%",
		},
	},
}));

const Landing = () => {
	const classes = useStyles();
	return (
		<Fragment>
			<Intro				
				title="Welcome to MM studio!"
				subtitle={`It's nice to meet you here.`}
				showbtn={false}
				link="/contact"
			/>
			<div className={classes.landing_content_wrapper}>
				<div className={classes.landing_content_subwrapper1}>
					<Services landing={true} />					
				</div>
				<div className={classes.landing_content_subwrapper2}>
					<Gallery />
					<Technologies landing={true} />					
				</div>
			</div>
		</Fragment>
	);
};

// Array: PropTypes.array,
// Bool: PropTypes.bool,
// Func: PropTypes.func,
// Number: PropTypes.number,
// Object: PropTypes.object,
// String: PropTypes.string,
// Symbol: PropTypes.symbol,

export default Landing;

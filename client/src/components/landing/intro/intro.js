import React from "react";
import { Link } from "react-router-dom";
// styles
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	intro_root: {
		position: "relative",
		width: "100%",
		height: 300,
		backgroundImage: `url("/images/landing/coding-bg.jpg")`,		
		backgroundSize: "100% 100%",
		backgroundRepeat: "no-repeat",
		"@media(max-width: 280px)": {
			height: 240
		},
		"@media(min-width: 280px)": {
			height: 240,
		},
		"@media(min-width: 560px)": {
			height: 310,
		},
		"@media(min-width: 840px)": {
			height: 380,
		},
		"@media(min-width: 1120px)": {
			height: 450,
		},
		"& ._text": {
			position: "absolute",
			width: "100%",
			top: "50%",
			transform: "translateY(-50%)",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			"& ._intro": {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				"& ._title": {
					fontSize: "1.7rem",
					fontStyle: "italic",
					lineHeight: "40px",
					marginBottom: "25px",
					fontFamily:
						"Droid Serif, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
					textShadow: "2px 2px 2px #000000bf",
					color: "aqua",
				},
				"& ._subtitle": {
					fontSize: "1.3rem",
					fontWeight: "700",
					lineHeight: "30px",
					marginBottom: "30px",
					fontFamily:
						"Droid Serif, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
					color: "white",
				},
				"& ._link": {
					padding: "8px 16px",
    			background: "#FFEB3B",
    			borderRadius: 4,
    			color: "white",
    			textShadow: "1px 1px 4px #263238",
    			fontSize: "1.5rem",
    			fontWeight: 600,
				}
			},
		},
	},
}));

const Intro = ({ title, subtitle, btnText, showbtn, link }) => {
	const classes = useStyles();

	return (
		<div className={classes.intro_root}>
			<div className="_text">
				<div id="myHeaderContainer" className="_intro">
					<div className="_title">{title}</div>
					<div className="_subtitle">{subtitle}</div>
					{showbtn && (
						<Link
							className="_link"
							to={link}
						>
							{btnText}
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Intro;

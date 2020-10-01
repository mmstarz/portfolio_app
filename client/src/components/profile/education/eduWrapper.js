import React from "react";
// els
import EduSection from "./eduSection";
// mui els
import Card from "@material-ui/core/Card";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 250,
		width: "100%",
		margin: "0px auto",
		display: "block",
		breakInside: "avoid-column",
	},
}));

const EduWrapper = () => {
	const classes = useStyles();
	return (
		<Card classes={{ root: classes.root }}>
			<EduSection />
		</Card>
	);
};

export default EduWrapper;

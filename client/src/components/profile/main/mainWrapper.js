import React from "react";
// els
import TopSection from "./topSection";
import SkillsSection from "./skillsSection";
import BioSection from "./bioSection";
// mui els
import Card from "@material-ui/core/Card";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		minWidth: 250,
	},
}));

const MainWrapper = () => {
	const classes = useStyles();

	return (
		<Card classes={{ root: classes.root }}>
			<TopSection />
			<SkillsSection />
			<BioSection />
		</Card>
	);
};

export default MainWrapper;

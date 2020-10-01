import React from "react";
import PropTypes from "prop-types";
// els
import TagsLogos from "../tags/tagsLogos";
// mui els
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	card_root: {
		height: "100%",
		width: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
		"backface-visibility": "hidden",
		transform: "rotateY(180deg)",
		"-webkit-transition": "transform .5s cubic-bezier(.5,1,.5,1)",
		transition: "transform .5s cubic-bezier(.5,1.3,.5,1.3)",
	},
	card_flip: {
		transform: "rotateY(0deg)",
	},
	limits: {
		wordBreak: "break-word",
		overflowWrap: "break-word",
	},	
}));

const BackSide = ({ description, tags, flip, handleFlip }) => {
	const classes = useStyles();

	return (
		<Card
			className={clsx(classes.card_root, {
				[classes.card_flip]: flip,
			})}
		>
			<CardContent className={classes.limits}>
				<Typography variant="h4" paragraph> Description: </Typography>
				<Typography paragraph>{description}</Typography>
				<TagsLogos tags={tags} />
			</CardContent>
			<CardActions disableSpacing>
				<Box>
					<Fab						
						onClick={handleFlip}
						color="primary"
						aria-label="more"						
					>
						<ChevronLeftIcon />
					</Fab>
				</Box>
			</CardActions>
		</Card>
	);
};

BackSide.propTypes = {
	flip: PropTypes.bool.isRequired,
	handleFlip: PropTypes.func.isRequired,
	description: PropTypes.string.isRequired,
	tags: PropTypes.array.isRequired,
};

export default BackSide;

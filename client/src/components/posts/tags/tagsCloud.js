import React from "react";
import PropTypes from "prop-types";
// mui els
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(0.5),
		},
	},
	chip: {
		margin: theme.spacing(0.5),
		"& .MuiChip-avatarColorPrimary": {
			fontSize: "1.1rem",
			fontWeight: 600,
			color: "#fff",
    		backgroundColor: "#303f9f",
		},
		"& .MuiChip-label": {
			fontSize: "1rem",
		},
		"& .MuiChip-outlinedPrimary": {
			color: "#3f51b5",
    		border: "1px solid #3f51b5",
		}
	},
}));

const TagsCloud = ({ tags }) => {
	const classes = useStyles();

	const renderTags = () => {
		return tags.map((tag) => {
			let data = tag.split('#');
			return (
				<Chip
					className={classes.chip}
					key={tag}
					avatar={<Avatar>#</Avatar>}
					label={data[1]}
					color="primary"
					variant="outlined"
				/>
			);
		});
	};

	return <div className={classes.root}>{renderTags()}</div>;
};

TagsCloud.propTypes = {
	tags: PropTypes.array.isRequired,
};

export default TagsCloud;

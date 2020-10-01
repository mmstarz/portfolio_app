import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
// mui els
import AvatarGroup from "@material-ui/lab/AvatarGroup";
// els
import TagItem from "./tagItem";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	avatar_group: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		filter: "drop-shadow(1px 1px 2px black)",
	},
}));

const TagsLogos = ({ tags }) => {
	const classes = useStyles();
	const [amount, setAmount] = useState(3);

	useEffect(() => {
		const logos = document.getElementById("tags_logos");
		setAmount(Math.trunc(logos.offsetWidth / 50));
	}, []);

	useLayoutEffect(() => {
		function resize() {
			const logos = document.getElementById("tags_logos");
			setAmount(Math.trunc(logos.offsetWidth / 50));
		}

		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
		};
	}, []);

	const renderTagsLogos = () => {
		return tags.map((tag) => <TagItem key={tag} tag={tag} />);
	};

	return (
		<AvatarGroup id="tags_logos" max={amount} className={classes.avatar_group}>
			{renderTagsLogos()}
		</AvatarGroup>
	);
};

TagsLogos.propTypes = {
	tags: PropTypes.array.isRequired,
};

export default TagsLogos;

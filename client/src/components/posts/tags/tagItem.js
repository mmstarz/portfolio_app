import React, { Fragment } from "react";
import PropTypes from "prop-types";
// mui els
import Avatar from "@material-ui/core/Avatar";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	avatar_group__item: {
		background: "#263238",
		width: "3rem",
		height: "3rem",
	},
}));

const TagItem = ({ tag }) => {
	const classes = useStyles();

	const renderItem = () => {
		switch (tag) {
			case "#nodejs":
			case "#node":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="nodejs-logo"
						src="/images/node/Node-JS-02.png"
					/>
				);
			case "#reactjs":
			case "#react":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="reactjs-logo"
						src="/images/react/React-01.png"
					/>
				);
			case "#redux":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="redux-logo"
						src="/images/redux/Redux-01.png"
					/>
				);
			case "#graphql":
			case "#graph":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="graphql-logo"
						src="/images/graphql/GraphQL-01.png"
					/>
				);
			case "#apollographql":
			case "#apollograph":
			case "#apollo":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="apollo-logo"
						src="/images/apollo/Apollo-GraphQL-01.png"
					/>
				);
			case "#mongodb":
			case "#mongo":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="mongodb-logo"
						src="/images/mongo/mongo.png"
					/>
				);
			case "#material-ui":
			case "#material":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="material-ui-logo"
						src="/images/material/Material-UI-01.png"
					/>
				);
			case "#firebase":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="firebase-logo"
						src="/images/firebase/Firebase-02.png"
					/>
				);
			case "#heroku":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="heroku-logo"
						src="/images/heroku/Heroku-01.png"
					/>
				);
			case "#JavaScript":			
			case "#javascript":
			case "#js":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="JavaScript-logo"
						src="/images/javascript/JavaScript-01.png"
					/>
				);
			case "#css3":
			case "#css":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="css3-logo"
						src="/images/css/CSS-3-01.png"
					/>
				);
			case "#html5":
			case "#html":
				return (
					<Avatar
						className={classes.avatar_group__item}
						alt="html5-logo"
						src="/images/html/HTML-5-01.png"
					/>
				);
			default:
				return <Avatar className={classes.avatar_group__item} >?</Avatar>
		}
	};

	return <Fragment>{renderItem()}</Fragment>;
};

// Array: PropTypes.array,
// Bool: PropTypes.bool,
// Func: PropTypes.func,
// Number: PropTypes.number,
// Object: PropTypes.object,
// String: PropTypes.string,
// Symbol: PropTypes.symbol,

TagItem.propTypes = {
	tag: PropTypes.string.isRequired,
};

export default TagItem;

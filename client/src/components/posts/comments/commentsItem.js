import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { remComment } from "../../../store/actions/postActions";
// redux
import Moment from "react-moment";
// mui els
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
// icons
import DeleteIcon from "@material-ui/icons/Delete";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		margin: 4,
		padding: 4,
		maxWidth: 580,
		background: "#263238",
	},
	cord_header: {
		overflowX: "overlay",
	},
	avatar: {
		width: "3rem",
		height: "3rem",
		filter: "drop-shadow(0px 0px 2px white)",
	},
	userLink: {
		fontWeight: 600,
		textDecoration: "none",
		color: "#0ad3ec",
	},
	limits: {
		wordBreak: "break-word",
		overflowWrap: "break-word",
		color: "white",
	},
	text_white: {
		color: "white",
	},
	quill_filter: {
		filter: "invert(1)",
	},
}));

const CommentsItem = ({
	_id,
	text,
	username,
	avatar,
	date,
	user,
	auth,
	remComment,
	post,
}) => {
	const classes = useStyles();

	const deleteable = auth.isAuth && auth.user._id === user;

	return (
		<Card className={classes.root}>
			<CardHeader
				classes={{ root: classes.cord_header }}
				avatar={
					<Avatar
						component={RouterLink}
						to={`/profile/${user}`}
						className={classes.avatar}
						aria-label="avatar"
						alt={user._id}
						src={avatar}
					/>
				}
				action={
					<IconButton
						disabled={!deleteable}
						color="secondary"
						aria-label="delete post"
						onClick={() => remComment(post._id, _id)}
					>
						<DeleteIcon />
					</IconButton>
				}
				title={
					<RouterLink
						className={classes.userLink}
						to={`/profile/${user}`}
					>
						{username}
					</RouterLink>
				}
				subheader={
					<Moment className={classes.text_white} format="YYYY/MM/DD">
						{date}
					</Moment>
				}
			/>
			<CardContent className={classes.limits}>{text}</CardContent>
		</Card>
	);
};

CommentsItem.propTypes = {
	_id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	remComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		post: state.stuff.post.data,
	};
};

export default connect(mapStateToProps, { remComment })(CommentsItem);

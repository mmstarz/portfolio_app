import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { CLEAR_POST } from "../../../store/actions/types";
import { connect } from "react-redux";
import * as PostActions from "../../../store/actions/postActions";
// els
import CommentsWrapper from "../comments/commentsWrapper";
import AddComment from "./addComment";
import PostItem from "./postItem";
import Spinner from "../../../widgets/spinner/spinner";
// mui els
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
// icons
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// with styles
import { TextPrimary } from "../../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	paper_root: {
		width: "95%",
		maxWidth: 700,
		minHeight: "calc(100vh - 100px)",
		margin: "16px auto",
		padding: 8,
		filter: "drop-shadow(1px 1px 2px black)",
		background: "#263238",
	},
	divider: {
		background: "white",
		marginBottom: 8,
		marginTop: 8,
	},
	box_root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	heading: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
	formIcon: {
		fontSize: 50,
		fill: "var(--primary-color)",
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	details: {
		color: "white",
		marginLeft: 8,
	},
	comments: {
		padding: 8,
	},
}));

const PostWrapper = ({
	post: { data, loading },
	auth,
	getPost,
	clearPost,
	match,
}) => {	

	const classes = useStyles();

	const onMount = useCallback(() => {
		getPost(match.params.id);
	}, [getPost, match]);

	const onUnMount = useCallback(() => {
		clearPost();
	}, [clearPost]);

	useEffect(() => {
		let mount = true;

		if (mount && loading) {
			onMount();
		}

		return () => {
			mount = false;

			if (!mount && !loading) {
				onUnMount();
			}
		};
	}, [loading, onMount, onUnMount]);

	return (
		<Paper classes={{ root: classes.paper_root }}>
			<Box className={classes.toolbar}>
				<Box classes={{ root: classes.heading }}>
					<InfoIcon
						classes={{
							root: classes.formIcon,
						}}
					/>
					<TextPrimary variant="h4" color="primary">
						Details
					</TextPrimary>
				</Box>

				<IconButton
					aria-label="details"
					component={RouterLink}
					to="/posts"
					color="inherit"
					classes={{
						colorInherit: classes.details,
					}}
				>
					<ArrowBackIcon />
				</IconButton>
			</Box>
			<Divider classes={{ root: classes.divider }} />

			{!loading && data ? (
				<Box classes={{ root: classes.box_root }}>
					<PostItem post={data} />

					<AddComment post_id={match.params.id} />

					<CommentsWrapper comments={data.comments} />
				</Box>
			) : (
				<Spinner />
			)}
		</Paper>
	);
};

PostWrapper.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired,
	clearPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	post: state.stuff.post,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getPost: (post_id) => {
			dispatch(PostActions.getPost(post_id));
		},
		clearPost: () => {
			dispatch({ type: CLEAR_POST });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PostWrapper);

import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// moment
import Moment from "react-moment";
// mui els
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
// icons
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
		transform: "rotateY(0deg)",
		"-webkit-transition": "transform .5s cubic-bezier(.5,1,.5,1)",
		transition: "transform .5s cubic-bezier(.5,1.3,.5,1.3)",
	},
	card_flip: {
		transform: "rotateY(-180deg)",
	},
	avatar: {
		width: "5rem",
		height: "5rem",
	},
	userLink: {
		fontWeight: 600,
		textDecoration: "none",
		color: "#40474a",
	},
	media: {
		height: 210,
		backgroundSize: "100% 100%",
	},
	card_title: {
		margin: "auto",		
	},
	_card_actions: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 0,
		"& ._item": {
			margin: 8,
			"& button": {
				borderRadius: 0,
				background: "transparent",
				boxShadow: "none",
				filter: "drop-shadow(1px 1px 2px black)",				
				"& svg": {
					width: "4rem",
					height: "4rem",
				},
			},
		},		
	},
	_fab_fav: {
		color: "#f31707",
	},
	_fab_disabled: {
		"&.Mui-disabled": {
			color: "#4CAF50",
		},
	},
	_fab_more: {
		margin: 8,
	},
	_badge_fav: {
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		background: "transparent",
		color: "white",
	},
	_badge_comm: {
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(0%, -10%)",
		background: "transparent",
		color: "white",
	},
}));

const FrontSide = ({
	flip,
	handleFlip,
	deleteable,
	handleLikes,
	handleDelete,
	_id,
	user,
	avatar,
	username,
	date,
	intro,
	title,
	likes,
	comments,
}) => {
	const classes = useStyles();

	return (
		<Card
			className={clsx(classes.card_root, {
				[classes.card_flip]: flip,
			})}
		>
			<CardHeader
				avatar={
					<Avatar
						component={RouterLink}
						to={`/profile/${user}`}
						className={classes.avatar}
						aria-label="avatar"
						alt={user}
						src={avatar}
					/>
				}
				action={
					<IconButton
						disabled={!deleteable}
						color="secondary"
						aria-label="delete post"
						onClick={() => handleDelete(_id)}
					>
						<DeleteIcon />
					</IconButton>
				}
				title={
					<RouterLink className={classes.userLink} to={`/profile/${user}`}>
						{username}
					</RouterLink>
				}
				subheader={<Moment format="YYYY/MM/DD">{date}</Moment>}
			/>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					component={RouterLink}
					to={`/post/${_id}`}
					image={intro}
					title={title}
				/>
			</CardActionArea>
			<Typography className={classes.card_title} variant="h5">
				{title}
			</Typography>
			<CardActions disableSpacing className={classes._card_actions}>
				<Box className="_item">
					<Fab						
						classes={{ primary: classes._fab_fav }}
						color="primary"
						aria-label="likes"
						onClick={() => handleLikes(_id)}
					>
						<Badge
							classes={{
								anchorOriginTopRightRectangle: classes._badge_fav,
							}}
							badgeContent={likes.length}
							showZero
						>
							<FavoriteIcon />
						</Badge>
					</Fab>
				</Box>
				<Box className="_item">
					<Fab
						classes={{ root: classes._fab_disabled }}						
						aria-label="comments"
						disabled={true}
					>
						<Badge
							classes={{
								anchorOriginTopRightRectangle: classes._badge_comm,
							}}
							badgeContent={comments.length}
							showZero
						>
							<ChatIcon />
						</Badge>
					</Fab>
				</Box>
				<Box >
					<Fab
						classes={{ root: classes._fab_more }}				
						onClick={handleFlip}
						color="primary"
						aria-label="more"						
					>
						<ChevronRightIcon />
					</Fab>
				</Box>
			</CardActions>
		</Card>
	);
};

FrontSide.propTypes = {
	flip: PropTypes.bool.isRequired,
	handleFlip: PropTypes.func.isRequired,
	deleteable: PropTypes.bool.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleLikes: PropTypes.func.isRequired,
	_id: PropTypes.string.isRequired,
	user: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	intro: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	likes: PropTypes.array.isRequired,
	comments: PropTypes.array.isRequired,
};

export default FrontSide;

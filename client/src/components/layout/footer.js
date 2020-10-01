import React from "react";
// styles
import { makeStyles } from "@material-ui/core";
// mui els
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
// icons
import IconButton from "@material-ui/core/IconButton";
// socila icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
	footer_root: {
		width: "100%",
		marginTop: "auto",
		background: "transparent",
		"& ._main": {
			padding: "1rem 8px",
			background: "#263238",
			"& ._items": {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				"& ._socials": {
					display: "flex",
					alignItems: "center",
					padding: 4,
					margin: 4,
				},
				"& ._copyright": {
					padding: 4,
					margin: 4,
					"& span": {
						color: "white",
						fontSize: "small",
					},
				},
				"& ._pp_tou": {
					display: "flex",
					alignItems: "center",
					"& ._link": {
						color: "#FFEB3B",
						padding: "8px 12px",
						fontSize: "small",
						fontWeight: 600,
					},
				},
			},
		},
	},
	_socialBtn: {
		padding: 8,
		"& ._tw": {
			fill: "#00BCD4",
		},
		"& ._fb": {
			fill: "#2196F3",
		},
		"& ._in": {
			fill: "#03A9F4",
		},
	},
	_socials_avatar_group: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
		filter: "drop-shadow(1px 1px 2px black)",
		"& .MuiAvatarGroup-avatar:first-child": {
			margin: "4px 8px",
		},
	},
	avatar_group__item: {
		background: "#263238",
		width: "3rem",
		height: "3rem",
		margin: "4px 8px",
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer_root}>
			<div className="_main">
				<div className="_items">
					<AvatarGroup
						max={5}
						className={classes._socials_avatar_group}
					>
						<Avatar
							className={classes.avatar_group__item}
							children={
								<IconButton
									target="_blank"
									rel="noopener noreferrer"
									className={classes._socialBtn}
									aria-label="twitter-link"
									component="a"
									href="https://twitter.com/mmstar_the_one"
								>
									<TwitterIcon className="_tw" />
								</IconButton>
							}
						/>
						<Avatar
							className={classes.avatar_group__item}
							children={
								<IconButton
									target="_blank"
									rel="noopener noreferrer"
									className={classes._socialBtn}
									aria-label="facebook-link"
									component="a"
									href="https://www.facebook.com/vadim.gorelov.3"
								>
									<FacebookIcon className="_fb" />
								</IconButton>
							}
						/>
						<Avatar
							className={classes.avatar_group__item}
							children={
								<IconButton
									target="_blank"
									rel="noopener noreferrer"
									className={classes._socialBtn}
									aria-label="linkedin-link"
									component="a"
									href="https://www.linkedin.com/in/vadim-gorelov-ba7684165/"
								>
									<LinkedInIcon className="_in" />
								</IconButton>
							}
						/>
						<Avatar
							className={classes.avatar_group__item}
							children={
								<IconButton
									target="_blank"
									rel="noopener noreferrer"
									className={classes._socialBtn}
									aria-label="telegram-link"
									component="a"
									href="https://t.me/mmstarz"
								>
									<img
										alt="test tg"
										style={{
											width: "2em",
											height: "2em",
										}}
										src="/images/telegram/Telegram-01.png"
									/>
								</IconButton>
							}
						/>
					</AvatarGroup>
					<div className="_copyright">
						<span className="copyright">
							Copyright &copy; MMFactory 2020
						</span>
					</div>
					<div className="_pp_tou">
						<a className="_link" href="/">
							Privacy Policy
						</a>
						<a className="_link" href="/">
							Terms of Use
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

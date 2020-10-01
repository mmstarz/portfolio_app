import React, { useRef } from "react";
import Resizer from "react-image-file-resizer";
import PropTypes from "prop-types";
// mui els
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// icons
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
// with styles
import { BadgeRequired, TextSmallRequired } from "../withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	_titleContainer: {
		display: "flex",
		alignItems: "center",
	},
	_typography: {
		marginLeft: 4,
		color: "black",
		margin: 0,
		fontSize: "medium",
		fontWeight: 600,
	},
	_previewContainer: {
		position: "relative",
		margin: "4px 0",
		border: "2px dashed yellowgreen",
		"& button": {
			position: "absolute",
			top: 0,
			right: 0,
		},
	},
	_actionsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	_containedPrimary: {
		width: "120px",
		color: "#fff",
		backgroundColor: "#4CAF50",
		"&:hover": {
			backgroundColor: "#388E3C",
		},
	},
}));

const UploderWrapper = ({ onChange, imageSrc }) => {
	const classes = useStyles();
	const { value } = imageSrc;

	// const [imageSrc, setImageSrc] = useState("");

	const pickup = useRef();
	let deleteable = value.length > 0;

	const handleInput = (e) => {
		e.preventDefault();
		pickup.current.click();
	};

	const handleClear = () => {
		onChange({ touched: true, value: "" });
	};

	const resizeFile = (file) =>
		new Promise((resolve) => {
			// file, // Is the file of the image which will resized.
			// maxWidth, // Is the maxWidth of the resized new image.
			// maxHeight, // Is the maxHeight of the resized new image.
			// compressFormat, // Is the compressFormat of the resized new image.
			// quality, // Is the quality of the resized new image.
			// rotation, // Is the degree of clockwise rotation to apply to uploaded image.
			// responseUriFunc,  // Is the callBack function of the resized new image URI.
			// outputType,  // Is the output type of the resized new image.
			// minWidth, // Is the minWidth of the resized new image.
			// minHeight, // Is the minHeight of the resized new image.

			Resizer.imageFileResizer(
				file,
				300,
				300,
				"JPEG",
				100,
				0,
				(uri) => {
					resolve(uri);
				},
				"base64",
				200,
				200
			);
		});

	const handleChange = async (event) => {
		const file = event.target.files[0];
		const source = await resizeFile(file);
		// console.log(image);
		onChange({ touched: true, value: source });
	};

	// console.log("imagesrc: ", imageSrc);
	return (
		<Box>
			<Box className={classes._titleContainer}>
				<Button
					classes={{ containedPrimary: classes._containedPrimary }}
					variant="contained"
					color="primary"
					size="large"
					startIcon={<ImageIcon />}
					onClick={(e) => handleInput(e)}
				>
					pickup
				</Button>
				<Typography className={classes._typography} gutterBottom>
					Intro image
				</Typography>
			</Box>

			<input
				id="imageFile"
				name="imageFile"
				ref={pickup}
				type="file"
				style={{ display: "none" }}
				onChange={(event) => handleChange(event)}
			/>
			<Divider />
			{imageSrc && value.length > 0 && (
				<Box id="preview" classes={{ root: classes._previewContainer }}>
					<IconButton
						classes={{ colorSecondary: classes._colorSecondary }}
						disabled={!deleteable}
						color="secondary"
						aria-label="delete image"
						onClick={() => handleClear()}
					>
						<DeleteIcon />
					</IconButton>
					<img src={value} height="300" alt="preview..." />
				</Box>
			)}
			<BadgeRequired
				variant="dot"
				color={deleteable ? "primary" : "secondary"}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<TextSmallRequired>Post intro image</TextSmallRequired>
			</BadgeRequired>
		</Box>
	);
};

UploderWrapper.propTypes = {
	onChange: PropTypes.func.isRequired,
	imageSrc: PropTypes.object.isRequired,
};

export default UploderWrapper;

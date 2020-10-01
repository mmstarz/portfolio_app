import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../store/actions/postActions";
// els
import UploaderWrapper from "../../widgets/imageUploader/uploaderWrapper";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// icons
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// with styles
import {
	PaperContainerLarge,
	TextPrimary,
	BoxMovedLeft,
	ButtonPrimary,
	BoxFormActionsSpace,
	BoxMessageDanger,
} from "../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";
// formData
import PostInputs from "./post-inputs/postInputs";
import { postForm, clearPostForm } from "./post-forms/createPost";
// tags
import AddTags from "./tags/addTags";

const useStyles = makeStyles((theme) => ({
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
		color: "#17a2b8",
		marginLeft: 8,
	},
}));

const AddPost = ({ createPost }) => {
	const classes = useStyles();
	const [formStatus, setFormStatus] = useState(false);
	const [formSchema, setFormSchema] = useState({ ...postForm });

	const [tagsData, setTagsData] = useState([]);
	const [imageSrc, setImageSrc] = useState({
		touched: false,
		value: "",
	});

	const handleIntro = ({ touched, value }) => {
		setImageSrc({ touched, value });

		if (value.length === 0) {
			setFormStatus(false);
		} else {
			formValidation(formSchema, true);
		}
	};

	const cleanFormState = () => {
		setFormStatus(false);
		setFormSchema({ ...postForm });
		setTagsData([]);
		setImageSrc({ touched: false, value: "" });
	};

	const cleanTagInput = () => {
		let updatedSchema = {
			...formSchema,
			tags: {
				...formSchema.tags,
				elementBody: {
					...formSchema.tags.elementBody,
					value: "",
				},
				options: {
					valid: false,
					touched: false,
					typed: false,
				},
				error: {
					msg: "",
				},
			},
		};

		setFormSchema(updatedSchema);
	};

	const formValidation = (schema, intro) => {
		// test object
		let test = {};
		// intro image checkup
		if (!intro) {
			test["intro"] = false;
		} else {
			delete test.intro;
		}
		// form test object

		Object.entries(schema).forEach(([key, value]) => {
			if (!value.options.valid) {
				// console.log([key, value]);
				test[key] = false;
			} else {
				delete test.key;
			}
		});

		// console.log("test: ", test);

		// check test length
		if (Object.keys(test).length > 0) {
			setFormStatus(false);
		} else {
			setFormStatus(true);
		}
	};

	const handleChange = (e) => {
		console.log("onchange e: ", e);
		let updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				elementBody: {
					...formSchema[e.target.name].elementBody,
					value: e.target.value,
				},
				options: {
					...formSchema[e.target.name].options,
					typed: true,
					valid: e.target.valid,
				},
				error: {
					msg: !e.target.error
						? e.target.valid
							? ""
							: `Fill up the ${
									formSchema[e.target.name].info
							  } field please`
						: e.target.error,
				},
			},
		};
		// tags extra
		if (e.target.added) {
			updatedSchema[e.target.name].options.added = true;
		}
		// intro extra
		let intro = false;
		if (imageSrc.value.length > 0) {
			intro = true;
		}
		// !!! important to save changed schema state first
		// !!! if funcs order changed the quill addRange() warning issue occurs
		setFormSchema(updatedSchema);
		formValidation(updatedSchema, intro);
	};

	const handleTouch = (e) => {
		// console.log("handle touch");
		let updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				options: {
					...formSchema[e.target.name].options,
					touched: true,
				},
			},
		};

		setFormSchema(updatedSchema);
	};

	const handleBlur = (e) => {
		let updatedSchema = {
			...formSchema,
			[e.target.name]: {
				...formSchema[e.target.name],
				options: {
					...formSchema[e.target.name].options,
					touched: false,
				},
			},
		};

		setFormSchema(updatedSchema);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		e.persist();

		let dataToSend = { intro: imageSrc.value };
		// form dataToSend
		Object.entries(formSchema).forEach(([key, value]) => {
			if (key === "tags") {
				dataToSend[key] = tagsData.map((tag) => tag.label);
			} else {
				dataToSend[key] = value.elementBody.value;
			}
		});

		// @create post action
		// {title: "", description: "", content: ""}
		createPost(dataToSend);

		cleanFormState();
		e.target.reset();
		// alert("Sumitted successufully: " + JSON.stringify(dataToSend));
	};

	useEffect(() => {
		let mount = true;

		return () => {
			mount = false;

			if (!mount) {
				clearPostForm();
			}
		};
	}, []);

	const renderErrorsMessage = () => {
		// find first field with error msg
		let el = {};
		el = Object.entries(formSchema).find(
			([key, value]) => value.error.msg.length > 0
		);

		// console.log("error el: ", el);
		if (imageSrc.touched && imageSrc.value === "") {
			return (
				<React.Fragment>
					<BoxMessageDanger>
						Pick up intro image please
					</BoxMessageDanger>
				</React.Fragment>
			);
		}

		if (el && el[1].elementBody.name !== "tags") {
			return (
				<React.Fragment>
					{!el[1].options.touched && (
						<BoxMessageDanger>{el[1].error.msg}</BoxMessageDanger>
					)}
				</React.Fragment>
			);
		} else if (el && el[1].elementBody.name === "tags") {
			return (
				<React.Fragment>
					{el[1].error.msg.length > 0 && el[1].options.added && (
						<BoxMessageDanger>{el[1].error.msg}</BoxMessageDanger>
					)}
				</React.Fragment>
			);
		}
	};

	const renderFormFields = () => {
		// [{},...] // main form fields
		return Object.entries(formSchema).map(([key, value]) => {
			if (key !== "tags") {
				return (
					<PostInputs
						key={key}
						{...value}
						onChange={(e) => handleChange(e)}
						onFocus={(e) => handleTouch(e)}
						onBlur={(e) => handleBlur(e)}
					/>
				);
			} else {
				return (
					<AddTags
						key={key}
						{...value}
						tags={[...tagsData]}
						setTags={setTagsData}
						onChange={(e) => handleChange(e)}
						onFocus={(e) => handleTouch(e)}
						onBlur={(e) => handleBlur(e)}
						clean={cleanTagInput}
					/>
				);
			}
		});
	};

	return (
		<PaperContainerLarge elevation={0}>
			<Box className={classes.toolbar}>
				<TextPrimary variant="h4" color="primary">
					New Post
				</TextPrimary>
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
			<Divider />

			<BoxMovedLeft>
				<PostAddIcon
					classes={{
						root: classes.formIcon,
					}}
				/>
				<TextPrimary variant="subtitle2">
					Feel free to add your new post
				</TextPrimary>
			</BoxMovedLeft>
			<UploaderWrapper onChange={handleIntro} imageSrc={imageSrc} />
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				{renderErrorsMessage()}
				{renderFormFields()}

				<BoxFormActionsSpace>
					<ButtonPrimary
						type="submit"
						variant="contained"
						size="medium"
						color="primary"
						startIcon={<SaveIcon />}
						disabled={!formStatus}
					>
						Submit
					</ButtonPrimary>
					<Button
						variant="contained"
						color="secondary"
						size="medium"
						startIcon={<CancelIcon />}
						onClick={() => cleanFormState()}
					>
						Clear
					</Button>
				</BoxFormActionsSpace>
			</form>
		</PaperContainerLarge>
	);
};

AddPost.propTypes = {
	createPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		createPost: (data) => {
			dispatch(PostActions.createPost(data));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddPost);

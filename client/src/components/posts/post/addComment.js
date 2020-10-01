import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import * as PostActions from "../../../store/actions/postActions";
// mui els
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// icons
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
// with styles
import {
	ButtonPrimary,
	BoxMessageDanger,
} from "../../../widgets/withStyles/withStyles";
// styles
import { makeStyles } from "@material-ui/core/styles";
// formData
import PostInputs from "../post-inputs/postInputs";
import { commentForm, clearCommentForm } from "../post-forms/addComment";

const useStyles = makeStyles((theme) => ({
	paper_root: {
		width: "100%",
		margin: "4px 0",
		padding: 12,
		maxWidth: 600,
		filter: "drop-shadow(0px 0px 2px black)",
	},
	from_actions: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
}));

const AddComment = ({ addComment, post_id }) => {
	const classes = useStyles();
	const [formSchema, setFormSchema] = useState({ ...commentForm });

	// console.log("formSchema: ", formSchema)

	const cleanFormState = () => {
		clearCommentForm();
		setFormSchema({ ...commentForm });
	};

	const handleChange = (e) => {
		let updatedSchema = { ...formSchema };

		updatedSchema = {
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
					msg: e.target.valid
						? ""
						: `Fill up the ${
								updatedSchema[e.target.name].info
						  } field please`,
				},
			},
		};

		setFormSchema(updatedSchema);
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
		// console.log("handle blur");
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

		let dataToSend = { text: formSchema["comment"].elementBody.value };

		// @create post action
		addComment(post_id, dataToSend);

		cleanFormState();
		e.target.reset();
		// alert("Sumitted successufully: " + JSON.stringify(dataToSend));
	};

	useEffect(() => {
		let mount = true;

		return () => {
			mount = false;

			if (!mount) {
				clearCommentForm();
			}
		};
	}, []);

	const renderErrorsMessage = () => {
		// find first field with error msg
		const { touched, typed } = formSchema["comment"].options;
		let conditions = typed && !touched;

		if (conditions) {
			return (
				<BoxMessageDanger>
					{formSchema["comment"].error.msg}
				</BoxMessageDanger>
			);
		}
	};

	const renderFormFields = () => {
		// [{},...] // main form fields
		return Object.entries(formSchema).map(([key, value]) => {
			return (
				<PostInputs
					key={key}
					{...value}
					onChange={(e) => handleChange(e)}
					onFocus={(e) => handleTouch(e)}
					onBlur={(e) => handleBlur(e)}
				/>
			);
		});
	};

	return (
		<Paper classes={{ root: classes.paper_root }}>
			<form className="form" onSubmit={(e) => handleSubmit(e)}>
				{renderErrorsMessage()}
				{renderFormFields()}

				<Box classes={{ root: classes.from_actions }}>
					<ButtonPrimary
						type="submit"
						variant="contained"
						size="medium"
						color="primary"
						startIcon={<SaveIcon />}
						// disabled={!formStatus}
						disabled={!formSchema["comment"].options.valid}
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
				</Box>
			</form>
		</Paper>
	);
};

AddComment.propTypes = {
	addComment: PropTypes.func.isRequired,
	post_id: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		addComment: (post_id, data) => {
			dispatch(PostActions.addComment(post_id, data));
		},
	};
};

export default connect(null, mapDispatchToProps)(AddComment);

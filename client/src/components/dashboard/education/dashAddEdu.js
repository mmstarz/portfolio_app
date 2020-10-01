import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, withRouter } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../../store/actions/profileActions";
// els
import ProfileInputs from "../profile-inputs/profileInputs";
// styles
import { makeStyles } from "@material-ui/core/styles";
// icons
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// with styles
import {
  TextPrimary,
  BoxFormActionsSpace,
  BoxMessageDanger,
  BoxAlignLeft,
  BoxMovedLeft,
  PaperContainerLarge,
  BadgeRequired,
  TextRequired,
  ButtonPrimary,
} from "../../../widgets/withStyles/withStyles";
// form data
import { eduForm, clearEduForm } from "../profile-forms/addEdu";

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

const DashAddEdu = ({ addEducation, history }) => {
  const classes = useStyles();
  const [formStatus, setFormStatus] = useState(false);
  const [formSchema, setFormSchema] = useState({ ...eduForm });

  const cleanFormState = () => {
    clearEduForm();
    setFormStatus(false);
    setFormSchema({ ...eduForm });
  };

  const formValidation = (schema) => {
    // console.log("schema to validate: ", schema);
    // test object
    let test = {};
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

  const handleTouch = (e) => {
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

  const handleChange = (e) => {
    let updatedSchema = { ...formSchema };

    if (e.target.name !== "current") {
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
          },
        },
      };
    } else {
      updatedSchema = {
        ...formSchema,
        [e.target.name]: {
          ...formSchema[e.target.name],
          elementBody: {
            ...formSchema[e.target.name].elementBody,
            checked: e.target.checked,
          },
          options: {
            ...formSchema[e.target.name].options,
            typed: true,
          },
        },
        to: {
          ...formSchema["to"],
          elementBody: {
            ...formSchema["to"].elementBody,
            disabled: e.target.checked ? "disabled" : "",
          },
        },
      };
    }

    function extraCheck(name) {
      if (updatedSchema[name].elementBody.required) {
        let val = updatedSchema[name].elementBody.value;

        // quill content clean
        val = val.replace(/<(.|\n)*?>/g, '').trim();

        if (val.length > 0) {
          updatedSchema[name].options.valid = true;
          updatedSchema[name].error = {
            msg: "",
          };
        } else {
          updatedSchema[name].options.valid = false;
          updatedSchema[name].error = {
            msg: `Fill up the ${updatedSchema[name].info} field please`,
          };
        }
      }
    }

    extraCheck(e.target.name);

    formValidation(updatedSchema);
    setFormSchema(updatedSchema);
  };

  // console.log("form: ", formSchema);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let dataToSend = {};
    // form dataToSend
    Object.entries(formSchema).forEach(([key, value]) => {
      // ? transform skills into array of strings
      if (key !== "current") {
        dataToSend[key] = value.elementBody.value;
      } else {
        dataToSend[key] = value.elementBody.checked;
      }
    });

    // @create profile action
    addEducation(dataToSend, history);
    // clean form DOM & form state
    cleanFormState(); // ? neccessary
    e.target.reset(); // ? neccessary

    // alert("Sumitted successufully: " + JSON.stringify(dataToSend));
  };

  const renderErrorsMessage = () => {
    // find first field with error msg
    let el = {};

    el = Object.entries(formSchema).find(
      ([key, value]) => value.error.msg.length > 0
    );

    // console.log("error el: ", el);

    if (el) {
      return (
        <React.Fragment>
          {!el[1].options.touched && (
            <BoxMessageDanger>{el[1].error.msg}</BoxMessageDanger>
          )}
        </React.Fragment>
      );
    }
  };

  const renderFormFields = () => {
    // [{},...] // main form fields
    return Object.entries(formSchema).map(([key, value]) => {
      return (
        <ProfileInputs
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
    <PaperContainerLarge elevation={0}>
      <Box className={classes.toolbar}>
        <TextPrimary variant="h4" color="primary">
          Add Education
        </TextPrimary>
        <IconButton
          aria-label="details"
          component={RouterLink}
          to="/dashboard"
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
        <CastForEducationIcon
          classes={{
            root: classes.formIcon,
          }}
        />
        <TextPrimary variant="subtitle2">
          Add any school, bootcamp, etc that you have attended
        </TextPrimary>
      </BoxMovedLeft>

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

      <BoxAlignLeft>
        <BadgeRequired
          variant="dot"
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <TextRequired variant="subtitle2">- required field</TextRequired>
        </BadgeRequired>
      </BoxAlignLeft>
    </PaperContainerLarge>
  );
};

DashAddEdu.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addEducation: (formData, history) => {
      dispatch(ProfileActions.addEducation(formData, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(DashAddEdu));

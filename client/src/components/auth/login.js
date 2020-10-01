import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as AuthActions from "../../store/actions/authActions";
// els
import AuthInput from "./auth-inputs/authInput";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// icons
import PersonIcon from "@material-ui/icons/Person";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
// withStyles
import {
  BoxMessageDanger,
  BoxAlignLeft,
  BoxMovedLeft,
  TextPrimary,
  TextRequired,
  BadgeRequired,
  ButtonPrimary,
  PaperContainerSmall,
} from "../../widgets/withStyles/withStyles";
// prop types
import PropTypes from "prop-types";
// form data
import formData from "./auth-forms/loginForm";

const useStyles = makeStyles((theme) => ({
  linkText: {
    marginLeft: 4,
  },
  formIcon: {
    fill: "var(--primary-color)",    
  }, 
}));

const Login = ({ login, loading }) => {
  const classes = useStyles();
  const [formStatus, setFormStatus] = useState(false);
  const [formSchema, setFormSchema] = useState(formData);

  const cleanFormState = () => {
    let updatedSchema = formData;

    setFormSchema(updatedSchema);
    setFormStatus(false);
  };

  const formValidation = (schema) => {
    // test object
    let test = {};
    // form test object
    Object.entries(schema).forEach(([key, value]) => {
      // console.log("check value:", value);
      if (!value.options.valid) {
        test[key] = false;
      } else {
        delete test.key;
      }
    });

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
    // console.log("event value: ", e.target.value);

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
          valid:
            formSchema[e.target.name].elementBody.minLength <=
            e.target.value.length,
          typed: true,
        },
        error: {
          msg:
            formSchema[e.target.name].elementBody.minLength <=
            e.target.value.length
              ? ""
              : `${e.target.name} needs to be at least ${
                  formSchema[e.target.name].elementBody.minLength
                } characters long`,
        },
      },
    };

    formValidation(updatedSchema);
    setFormSchema(updatedSchema);
  };

  // console.log("formShchema: ", formSchema);
  // console.log("formStatus: ", formStatus);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    login(
      formSchema.email.elementBody.value,
      formSchema.password.elementBody.value
    );

    // clean form DOM & form state
    cleanFormState();
    e.target.reset();

    // checkup
    // alert("Sumitted successufully: " + JSON.stringify(dataToSend));
  };

  const renderErrorsMessage = () => {
    // find first field with error msg
    // obvious could use just Object.values()
    // but .values() not supported by some browsers
    const el = Object.entries(formSchema).find(
      ([key, value]) => value.error.msg.length > 0
    );

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
    return Object.entries(formSchema).map(([key, value]) => {
      return (
        <AuthInput
          key={key}
          {...value}
          onChange={handleChange}
          onFocus={handleTouch}
          onBlur={handleBlur}
        />
      );
    });
  };

  // @AFTER GOT_USER
  if (!loading) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <PaperContainerSmall elevation={0}>
      <TextPrimary variant="h4" color="primary" gutterBottom={true}>
        Sign In
      </TextPrimary>
      <BoxMovedLeft>
        <PersonIcon classes={{
          root: classes.formIcon
        }} />
        <TextPrimary variant="subtitle1">Sign into Your Account</TextPrimary>
      </BoxMovedLeft>    

      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {renderErrorsMessage()}
        {renderFormFields()}
        <ButtonPrimary
          type="submit"
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<PlaylistAddCheckIcon />}
          disabled={!formStatus}
        >
          Login
        </ButtonPrimary>
      </form>

      <BoxAlignLeft>
        <TextPrimary variant="subtitle1">Don't have an account?</TextPrimary>
        <TextPrimary
          className={classes.linkText}
          variant="subtitle1"
          color="primary"
          component={Link}
          to="/register"
        >
          Sign Up
        </TextPrimary>
      </BoxAlignLeft>

      <BoxAlignLeft>
        <BadgeRequired
          variant="dot"
          color="secondary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <TextRequired variant="subtitle2">
            - required field
          </TextRequired>
        </BadgeRequired>
      </BoxAlignLeft>
    </PaperContainerSmall>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(AuthActions.login(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, withRouter } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../store/actions/profileActions";
// els
import Spinner from "../../widgets/spinner/spinner";
import ProfileInputs from "./profile-inputs/profileInputs";
// styles
import { makeStyles } from "@material-ui/core/styles";
// icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import LinkIcon from "@material-ui/icons/Link";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// mui els
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
// with styles
import {
  TextPrimary,
  TextButton,
  BoxFormActionsLeft,
  BoxFormActionsSpace,
  BoxMessageDanger,
  BoxAlignLeft,
  BoxMovedLeft,
  PaperContainerLarge,
  BadgeRequired,
  TextRequired,
  ButtonPrimary,
  ButtonToggle,
} from "../../widgets/withStyles/withStyles";
// form data
import {
  mainFormData,
  clearMainFormData,
} from "./profile-forms/createProfileMain";
import {
  socialsFormData,
  clearSocialsFormData,
} from "./profile-forms/createProfileSocials";

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

const DashEditProfile = ({
  profile: { loading, data },
  getProfile,
  updateProfile,
  clearProfile,
  history,
  edit,
}) => {
  const classes = useStyles();
  const [schemaLoading, setSchemaLoading] = useState(true);
  const [showSocials, setShowSocials] = useState(false);
  const [formStatus, setFormStatus] = useState(true);
  // @COPY - Splice - Update
  const [formSchema, setFormSchema] = useState([
    { ...mainFormData },
    { ...socialsFormData },
  ]);

  const cleanFormState = () => {
    clearMainFormData();
    clearSocialsFormData();
    setFormStatus(false);
    setFormSchema([{ ...mainFormData }, { ...socialsFormData }]);
  };

  const formValidation = (schema) => {
    // test object
    let test = {};
    // form test object
    schema.forEach((part) => {
      Object.entries(part).forEach(([key, value]) => {
        if (!value.options.valid) {
          // console.log([key, value]);
          test[key] = false;
        } else {
          delete test.key;
        }
      });
    });
    // check test length
    if (Object.keys(test).length > 0) {
      setFormStatus(false);
    } else {
      setFormStatus(true);
    }
  };

  const handleTouch = (e, part) => {
    let updatedSchemaPart = {
      ...formSchema[part],
      [e.target.name]: {
        ...formSchema[part][e.target.name],
        options: {
          ...formSchema[part][e.target.name].options,
          touched: true,
        },
      },
    };

    let updatedSchemaFull = [...formSchema];
    updatedSchemaFull.splice(part, 1, updatedSchemaPart);
    setFormSchema(updatedSchemaFull);
  };

  const handleBlur = (e, part) => {
    let updatedSchemaPart = {
      ...formSchema[part],
      [e.target.name]: {
        ...formSchema[part][e.target.name],
        options: {
          ...formSchema[part][e.target.name].options,
          touched: false,
        },
      },
    };

    let updatedSchemaFull = [...formSchema];
    updatedSchemaFull.splice(part, 1, updatedSchemaPart);
    setFormSchema(updatedSchemaFull);
  };

  const handleChange = (e, part) => {
    let updatedSchemaPart = {
      ...formSchema[part],
      [e.target.name]: {
        ...formSchema[part][e.target.name],
        elementBody: {
          ...formSchema[part][e.target.name].elementBody,
          value: e.target.value,
        },
        options: {
          ...formSchema[part][e.target.name].options,
          typed: true,
        },
      },
    };

    function checkLength(minLength, valLength) {
      return minLength <= valLength;
    }

    // extra skills check
    if (e.target.name === "skills") {
      let minLength = updatedSchemaPart[e.target.name].elementBody.minLength;
      let valLength = e.target.value.length;

      if (checkLength(minLength, valLength)) {
        // console.log("valid success");
        updatedSchemaPart[e.target.name].options.valid = true;
        updatedSchemaPart[e.target.name].error = {
          msg: "",
        };
      } else {
        updatedSchemaPart[e.target.name].options.valid = false;
        updatedSchemaPart[e.target.name].error = {
          msg: `${e.target.name} needs to be at least ${
            updatedSchemaPart[e.target.name].elementBody.minLength
          } characters long`,
        };
      }
    }

    // extra status check
    if (e.target.name === "status") {
      let val = updatedSchemaPart[e.target.name].elementBody.value;
      if (val.length > 0) {
        updatedSchemaPart[e.target.name].options.valid = true;
        updatedSchemaPart[e.target.name].error = {
          msg: "",
        };
      } else {
        updatedSchemaPart[e.target.name].options.valid = false;
        updatedSchemaPart[e.target.name].error = {
          msg: "Please select your current status",
        };
      }
    }

    let updatedSchemaFull = [...formSchema];
    updatedSchemaFull.splice(part, 1, updatedSchemaPart);
    formValidation(updatedSchemaFull);
    setFormSchema(updatedSchemaFull);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    let dataToSend = {};
    // form dataToSend
    formSchema.forEach((part) => {
      Object.entries(part).forEach(([key, value]) => {
        // ? transform skills into array of strings
        dataToSend[key] = value.elementBody.value;
      });
    });

    // @clear current redux profile state
    clearProfile();
    // @clean form DOM & form state
    cleanFormState(); 
    e.target.reset(); // ? do i realy need this
    // @update_profile action
    updateProfile(dataToSend, history, edit);
    // @launch preload component
    setSchemaLoading(true);

    // alert("Sumitted successufully: " + JSON.stringify(dataToSend));
  };

  const renderErrorsMessage = () => {
    let el = {};
    let checkSchema = [...formSchema];

    el = Object.entries(checkSchema[0]).find(
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

  const renderFormFields = (part) => {
    return Object.entries(formSchema[part]).map(([key, value]) => {
      return (
        <ProfileInputs
          key={key}
          {...value}
          onChange={(e) => handleChange(e, part)}
          onFocus={(e) => handleTouch(e, part)}
          onBlur={(e) => handleBlur(e, part)}
        />
      );
    });
  };

  const loadSchema = useCallback(() => {
    // console.log("@loadSchema: starts");
    // console.log("profile data: ", profile);
    // separate profile to parts
    let main = {};
    let social = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === "social") {
        social = value;
      } else if (key === "skills") {
        // from array to string
        main[key] = value.join(",");
      } else if (
        key !== "user" &&
        key !== "_id" &&
        key !== "education" &&
        key !== "experience"
      ) {
        main[key] = value;
      }
    });

    // console.log("data main: ", main);
    // console.log("data social: ", social);

    // update form data
    let updatedSchema = [...formSchema];

    updatedSchema.map((part, idx) => {
      return Object.entries(part).forEach(([key, value]) => {
        if (main[key]) {
          // main part
          // console.log("main ", key, ": " ,value);
          value.elementBody.value = main[key];
          value.options.valid = true;
        } else if (social[key]) {
          // social part
          // console.log("social ", key, ": " ,value);
          value.elementBody.value = social[key];
        }
      });
    });

    // console.log("updated schema: ", updatedSchema);
    setFormSchema(updatedSchema);
    setSchemaLoading(false);
  }, [data, formSchema]);

  const onMount = useCallback(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    let mount = true;
    // ? FORMSCHEMA NOT UPDATES IN PLACE
    // for correct formSchema updating
    // need to have 2 triggers:
    // 1 - redux state update trigger // profile.loading
    // 2 - local component state trigger // schemaLoading
    // loadSchema() - function that get redux updated state
    // and updates local formSchema state with new values
    if (mount && loading && edit) {
      onMount();
    }

    if (mount && !loading && edit && schemaLoading) {
      loadSchema();
    }

    return () => {
      mount = false;
    };
  }, [loadSchema, loading, schemaLoading, edit, onMount]);

  return (
    <PaperContainerLarge elevation={0}>
      <Box className={classes.toolbar}>
        <TextPrimary variant="h4" color="primary">
          {edit ? "Edit Profile" : "Create Profile"}
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
        <AccountBoxIcon
          classes={{
            root: classes.formIcon,
          }}
        />
        <TextPrimary variant="subtitle2">
          {edit
            ? "Feel free to edit your profile"
            : "Let's get some information to make your profile stand out"}
        </TextPrimary>
      </BoxMovedLeft>

      {edit && schemaLoading ? (
        <Spinner />
      ) : (
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          {renderErrorsMessage()}
          {renderFormFields(0)}

          <BoxFormActionsLeft>
            <ButtonToggle
              size="medium"
              startIcon={<LinkIcon />}
              onClick={() => setShowSocials(!showSocials)}
            >
              {showSocials ? "Hide" : "Add"} Social Network Links
            </ButtonToggle>

            <TextButton variant="button">Optional</TextButton>
          </BoxFormActionsLeft>

          {showSocials && renderFormFields(1)}

          <BoxFormActionsSpace>
            <ButtonPrimary
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={!formStatus}
            >
              {edit ? "Update" : "Submit"}
            </ButtonPrimary>

            {edit ? (
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="contained"
                color="secondary"
                size="medium"
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                startIcon={<CancelIcon />}
                onClick={() => cleanFormState()}
              >
                Clear
              </Button>
            )}
          </BoxFormActionsSpace>
        </form>
      )}

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

DashEditProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearProfile: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.site.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(ProfileActions.getCurrentProfile());
    },
    updateProfile: (formData, history, edit) => {
      // @create profile action
      dispatch(ProfileActions.createProfile(formData, history, edit));
    },
    clearProfile: () => {
      dispatch(ProfileActions.clearProfile());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DashEditProfile));

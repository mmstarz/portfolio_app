import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// redux
import { connect } from "react-redux";
import * as ProfileActions from "../../store/actions/profileActions";
// els
import ProfileInputs from "./profile-inputs/profileInputs";
// styles
import { makeStyles } from "@material-ui/core/styles";
// icons
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SaveIcon from "@material-ui/icons/Save";
import LinkIcon from "@material-ui/icons/Link";
import CancelIcon from '@material-ui/icons/Cancel';
// mui els
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
}));

const DashAddProfile = ({ createProfile, history }) => {
  const classes = useStyles();
  const [showSocials, setShowSocials] = useState(false);
  const [formStatus, setFormStatus] = useState(false);
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
    // console.log("schema to validate: ", schema);
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

    // console.log("test: ", test);

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
    // console.log("after touch: ", updatedSchemaFull);

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
    // console.log("after blur: ", updatedSchemaFull);

    setFormSchema(updatedSchemaFull);
  };

  const handleChange = (e, part) => {
    // console.log("part: ", part);
    // console.log("schema to update1: ", formSchema);
    // upd = formSchema[0] / formSchema[1]
    // console.log("event value: ", e.target.value);

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
      // console.log("min: ", minLength);
      // console.log("val: ", valLength);
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
    // console.log("full upd: ", updatedSchemaFull);

    setFormSchema(updatedSchemaFull);
    formValidation(updatedSchemaFull);
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

    // @create profile action
    createProfile(dataToSend, history);
    // clean form DOM & form state
    cleanFormState(); // ? neccessary
    e.target.reset(); // ? neccessary

    // alert("Sumitted successufully: " + JSON.stringify(dataToSend));
  };

  const renderErrorsMessage = () => {
    // find first field with error msg
    // obvious could use just Object.values()
    // but .values() not supported by some browsers
    let el = {};
    let checkSchema = [...formSchema];

    el = Object.entries(checkSchema[0]).find(
      ([key, value]) => value.error.msg.length > 0
    );

    // if no errors in part one
    // part two has no required fields so check is unneccessary
    // if(!el) {
    //   el = Object.entries(checkSchema[1]).find(
    //     ([key, value]) => {
    //       // console.log(key, value);
    //       if(value.error.msg.length > 0) {
    //         // console.log('found: ', key)
    //         return {...value}
    //       }
    //     }
    //   );
    // }

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

  const renderFormFields = (part) => {
    // [{},...] // main form fields
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

  // console.log("form state: ", formSchema);

  return (
    <PaperContainerLarge elevation={0}>
      <TextPrimary variant="h4" color="primary" gutterBottom={true}>
        Create Profile
      </TextPrimary>

      <BoxMovedLeft>
        <AccountBoxIcon
          classes={{
            root: classes.formIcon,
          }}
        />
        <TextPrimary variant="subtitle2">
          Let's get some information to make your profile stand out
        </TextPrimary>
      </BoxMovedLeft>

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

DashAddProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (formData, history) => {
      // @create profile action
      dispatch(ProfileActions.createProfile(formData, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(withRouter(DashAddProfile));

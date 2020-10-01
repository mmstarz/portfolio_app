import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
// rich text editor
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// with styles
import clsx from "clsx";
import {
  BadgeRequired,
  TextSmall,
  TextSmallRequired,
} from "../../../widgets/withStyles/withStyles";

const useStyles = makeStyles((theme) => ({
  editor: {
    "& .ql-container": {
      minHeight: "200px !important",
    },
  },
  valid: {
    boxShadow: "0px 2px 0px 0px #21e91e",
  },
  invalid: {
    boxShadow: "0px 2px 0px 0px #f50057",
  },
  untouched: {
    boxShadow: "0px 2px 0px 0px currentColor",
  },
}));

const PostInputs = ({
  elementName,
  elementBody,
  options,
  info,
  error,
  onBlur,
  onChange,
  onFocus,
}) => {
  const classes = useStyles();

  // console.log("element name: ", elementName);
  // console.log("element body: ", elementBody);
  // console.log("element options: ", options);

  // quill options
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "script",
    "list",
    "indent",
    "size",
    "background",
    "font",
    "align",
    "link",
    "image",
    "color",
    "code-block",
  ];

  // quill modules
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "+1" }, { indent: "-1" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["image"],
        ["clean"],
      ],
    }),
    []
  );

  const handleChange = (e) => {
    let valid = e.target.value.length > 0;

    let result = {
      target: {
        name: e.target.name,
        value: e.target.value,
        valid: valid,
      },
    };
    onChange(result);
  };

  const handleQuillChange = (content, name, value) => {
    // console.log("quill onChange value: ", value);
    let valid = value.length > 0 && content !== "<p><br></p>";
    let result = { target: { name: name, value: content, valid } };
    // console.log("quill onChange content: ", content);
    // console.log("quill onChange result: ", result);
    onChange(result);
  };

  const handleQuillFocus = (range, name) => {
    let result = { target: { name: name } };
    // console.log("quill onFocus range: ", range);
    onFocus(result);
  };

  const handleQuillBlur = (html, name) => {
    let result = { target: { name: name } };
    // console.log("quill onBlur html: ", html);
    onBlur(result);
  };

  const renderField = () => {
    switch (elementBody.name) {
      case "title":
        return (
          <div className="form-group">
            <input
              className={
                options.typed
                  ? options.valid
                    ? classes.valid
                    : classes.invalid
                  : classes.untouched
              }
              {...elementBody}
              onFocus={(e) => onFocus(e)}
              onBlur={(e) => onBlur(e)}
              onChange={(e) => handleChange(e)}
            />
            {info && elementBody.required ? (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            ) : null}
            {info && !elementBody.required ? (
              <TextSmall>{info}</TextSmall>
            ) : null}
          </div>
        );
      case "description":
      case "comment":
        return (
          <div className="form-group">
            <textarea
              className={
                options.typed
                  ? options.valid
                    ? classes.valid
                    : classes.invalid
                  : classes.untouched
              }
              {...elementBody}
              onFocus={(e) => onFocus(e)}
              onBlur={(e) => onBlur(e)}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {info && elementBody.required ? (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            ) : null}
            {info && !elementBody.required ? (
              <TextSmall>{info}</TextSmall>
            ) : null}
          </div>
        );
      case "content":
        return (
          <div className="form-group">
            {/* rich editor here */}
            <ReactQuill
              className={clsx(
                classes.editor,
                options.typed
                  ? options.valid
                    ? classes.valid
                    : classes.invalid
                  : classes.untouched
              )}
              formats={formats}
              modules={modules}
              name={elementBody.name}
              value={elementBody.value}
              placeholder={elementBody.placeholder}
              onChange={(content, delta, source, editor) => {
                if (source === "user") {
                  let val = editor.getText(content);
                  handleQuillChange(content, elementBody.name, val);
                }
              }}
              onBlur={(range, source, quill) => {
                if (source === "user") {
                  handleQuillBlur(quill.getHTML(), elementBody.name);
                }
              }}
              onFocus={(range) => handleQuillFocus(range, elementBody.name)}
              theme="snow"
            />
            {info && (
              <BadgeRequired
                variant="dot"
                color={options.valid ? "primary" : "secondary"}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <TextSmallRequired>{info}</TextSmallRequired>
              </BadgeRequired>
            )}
          </div>
        );
      default:
        return;
    }
  };

  return <Fragment>{renderField()}</Fragment>;
};

PostInputs.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  info: PropTypes.string,
  elementName: PropTypes.string.isRequired,
  elementBody: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default PostInputs;

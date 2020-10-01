export let eduForm = {
  school: {
    elementName: "input",
    elementBody: {
      name: "school",
      type: "text",
      value: "",
      placeholder: "* School or Bootcamp",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "School or Bootcamp",
    error: {
      msg: "",
    },
  },
  degree: {
    elementName: "input",
    elementBody: {
      name: "degree",
      type: "text",
      value: "",
      placeholder: "* Degree or Certificate",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Degree or Certificate",
    error: {
      msg: "",
    },
  },
  fieldofstudy: {
    elementName: "input",
    elementBody: {
      name: "fieldofstudy",
      type: "text",
      value: "",
      placeholder: "Field Of Study",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Field Of Study",
    error: {
      msg: "",
    },
  },
  current: {
    elementName: "checkbox",
    elementBody: {
      name: "current",
      type: "checkbox",
      value: true,
      required: false,
      checked: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Current education ?",
    error: {
      msg: "",
    },
  },
  from: {
    elementName: "input",
    elementBody: {
      name: "from",
      type: "date",
      value: "",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Education started",
    error: {
      msg: "",
    },
  },
  to: {
    elementName: "input",
    elementBody: {
      name: "to",
      type: "date",
      value: "",
      required: false,
      disabled: "",
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Education ended",
    error: {
      msg: "",
    },
  },
  description: {
    elementName: "textarea",
    elementBody: {
      name: "description",
      type: "text",
      value: "",
      placeholder: "Education description",
      required: false,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Program Description",
    error: {
      msg: "",
    },
  },
};

export const clearEduForm = () => {
  // { key: value, key: value, ...} -> [[key, value], [key, vlaue]...]
  let entries = Object.entries(eduForm).map(([key, value]) => {
    if (key === "curent") {
      value = {
        ...value,
        elementBody: {
          ...value.elementBody,
          checked: false,
        },
        options: {
          valid: true,
          touched: false,
          typed: false,
        },
        error: {
          msg: "",
        },
      };
    } else if (key === "to") {
      value = {
        ...value,
        elementBody: {
          ...value.elementBody,
          value: "",
          disabled: "",
        },
        options: {
          valid: true,
          touched: false,
          typed: false,
        },
        error: {
          msg: "",
        },
      };
    } else {
      value = {
        ...value,
        elementBody: {
          ...value.elementBody,
          value: "",
        },
        options: {
          valid:
            key !== "school" &&
            key !== "degree" &&
            key !== "fieldofstudy" &&
            key !== "from",
          touched: false,
          typed: false,
        },
        error: {
          msg: "",
        },
      };
    }

    return [key, value];
  });

  // console.log("main entries: ", entries);
  // [[key, value], [key, vlaue]...] -> { key: value, key: value, ...}
  eduForm = Object.fromEntries(entries);
};
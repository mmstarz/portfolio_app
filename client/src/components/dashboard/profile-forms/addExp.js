export let expForm = {
  title: {
    elementName: "input",
    elementBody: {
      name: "title",
      type: "text",
      value: "",
      placeholder: "* Job Title",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Experience title",
    error: {
      msg: "",
    },
  },
  company: {
    elementName: "input",
    elementBody: {
      name: "company",
      type: "text",
      value: "",
      placeholder: "* Company",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Company name",
    error: {
      msg: "",
    },
  },
  location: {
    elementName: "input",
    elementBody: {
      name: "location",
      type: "text",
      value: "",
      placeholder: "Location",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Location",
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
    info: "Current experience ?",
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
    info: "Experience started",
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
    info: "Experience ended",
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
      placeholder: "Experience description",
      required: false,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Add something about this experience, if you wish.",
    error: {
      msg: "",
    },
  },
};

export const clearExpForm = () => {
  // { key: value, key: value, ...} -> [[key, value], [key, vlaue]...]
  let entries = Object.entries(expForm).map(([key, value]) => {
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
          disabled: ""
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
          valid: key !== "from" && key !== "company" && key !== "title",
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
  expForm = Object.fromEntries(entries);
};

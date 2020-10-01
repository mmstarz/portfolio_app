// status - required, skills - required
export let mainFormData = {
  status: {
    elementName: "select",
    elementBody: {
      name: "status",
      value: "",
      required: true,
      options: [
        { name: "--Select Status--", value: "", disabled: true },
        { name: "Developer", value: "Developer" },
        { name: "Junior Developer", value: "Junior Developer" },
        { name: "Middle Developer", value: "Middle Developer" },
        { name: "Senior Developer", value: "Senior Developer" },
        { name: "Manager", value: "Manager" },
        { name: "Student or Learning", value: "Student or Learning" },
        { name: "Instructor or Teacher", value: "Instructor or Teacher" },
        { name: "Intern", value: "Intern" },
        { name: "Other", value: "Other" },
      ],
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Give us an idea of where you are at in your career",
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
      placeholder: "Company",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Company name, if you work in any",
    error: {
      msg: "",
    },
  },
  website: {
    elementName: "input",
    elementBody: {
      name: "website",
      type: "text",
      value: "",
      placeholder: "Website",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Website address, if you have any",
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
    info: "Your current location",
    error: {
      msg: "",
    },
  },
  skills: {
    elementName: "input",
    elementBody: {
      name: "skills",
      type: "text",
      value: "",
      placeholder: "Skills",
      required: true,
      minLength: 6,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Your programming skills. Exmpl: 'JavaScript, CSS, HTML'",
    error: {
      msg: "",
    },
  },
  githubusername: {
    elementName: "input",
    elementBody: {
      name: "githubusername",
      type: "text",
      value: "",
      placeholder: "Github username",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Github username, if you have an any",
    error: {
      msg: "",
    },
  },
  bio: {
    elementName: "textarea",
    elementBody: {
      name: "bio",
      type: "text",
      value: "",
      placeholder: "Biography",
      required: false,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    info: "Add something about yourself, if you wish.",
    error: {
      msg: "",
    },
  },
};

export const clearMainFormData = () => {
  // { key: value, key: value, ...} -> [[key, value], [key, vlaue]...]
  let entries = Object.entries(mainFormData).map(([key, value]) => {
    value = {
      ...value,
      elementBody: {
        ...value.elementBody,
        value: "",
      },
      options: {
        valid: key !== "skills" && key !== "status",
        touched: false,
        typed: false,
      },
      error: {
        msg: "",
      },
    };

    return [key, value];
  });

  // console.log("main entries: ", entries);
  // [[key, value], [key, vlaue]...] -> { key: value, key: value, ...}
  mainFormData = Object.fromEntries(entries);
};

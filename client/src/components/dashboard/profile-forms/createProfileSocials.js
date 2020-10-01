export let socialsFormData = {
  twitter: {
    elementName: "input",
    elementBody: {
      name: "twitter",
      type: "text",
      value: "",
      placeholder: "Twitter",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    social: "twitter",
    info: "Your Twitter account link, if you have any.",
    error: {
      msg: "",
    },
  },
  facebook: {
    elementName: "input",
    elementBody: {
      element: "input",
      name: "facebook",
      type: "text",
      value: "",
      placeholder: "Facebook",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    social: "facebook",
    info: "Your Facebook account link, if you have any.",
    error: {
      msg: "",
    },
  },
  linkedin: {
    elementName: "input",
    elementBody: {
      name: "linkedin",
      type: "text",
      value: "",
      placeholder: "Linkedin",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    social: "linkedin",
    info: "Your Linkedin account link, if you have any.",
    error: {
      msg: "",
    },
  },
  youtube: {
    elementName: "input",
    elementBody: {
      name: "youtube",
      type: "text",
      value: "",
      placeholder: "YouTube",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    social: "youtube",
    info: "Your YouTube account link, if you have any.",
    error: {
      msg: "",
    },
  },
  instagram: {
    elementName: "input",
    elementBody: {
      name: "instagram",
      type: "text",
      value: "",
      placeholder: "Instagram",
      required: false,
    },
    options: {
      valid: true,
      touched: false,
      typed: false,
    },
    social: "instagram",
    info: "Your Instagram account link, if you have any.",
    error: {
      msg: "",
    },
  },
};

export const clearSocialsFormData = () => {
  // { key: value, key: value, ...} -> [[key, value], [key, vlaue]...]
  let entries = Object.entries(socialsFormData).map(([key, value]) => {
    value = {
      ...value,
      elementBody: {
        ...value.elementBody,
        value: "",
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

    return [key, value]
  });

  // console.log("socials entries: ", entries);
  // [[key, value], [key, vlaue]...] -> { key: value, key: value, ...}
  socialsFormData = Object.fromEntries(entries);
};

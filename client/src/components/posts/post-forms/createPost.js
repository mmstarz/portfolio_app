export let postForm = {
  title: {
    elementName: "input",
    elementBody: {
      name: "title",
      type: "text",
      value: "",
      placeholder: "Post title",
      required: true,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Post title",
    error: {
      msg: "",
    },
  },
  description: {
    elementName: "input",
    elementBody: {
      name: "description",
      type: "text",
      value: "",
      placeholder: "Add description please",
      required: true,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Short description",
    error: {
      msg: "",
    },
  },
  tags: {
    elementName: "input",
    elementBody: {
      name: "tags",
      type: "text",
      value: "",
      placeholder: "Example: nodejs",
      required: false,
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
      added: false,
    },
    info: "Add tag",
    error: {
      msg: "",
    },
  },
  content: {
    elementName: "textarea",
    elementBody: {
      name: "content",
      type: "text",
      value: "<p><br></p>",
      placeholder: "Your post content",
      required: true,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "Post content",
    error: {
      msg: "",
    },
  },
};

export const clearPostForm = () => {
  // { key: value, key: value, ...} -> [[key, value], [key, vlaue]...]
  let entries = Object.entries(postForm).map(([key, value]) => {
    value = {
      ...value,
      elementBody: {
        ...value.elementBody,
        value: "",
      },
      options: {
        valid: false,
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
  postForm = Object.fromEntries(entries);
};

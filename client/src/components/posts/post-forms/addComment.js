export let commentForm = {
  comment: {
    elementName: "textarea",
    elementBody: {
      name: "comment",
      type: "text",
      value: "",
      placeholder: "Leave your comment please",
      required: true,
      cols: "33",
      rows: "5",
    },
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    info: "comment",
    error: {
      msg: "",
    },
  },
};

export const clearCommentForm = () => {
  commentForm = {
    comment: {
      elementName: "textarea",
      elementBody: {
        name: "comment",
        type: "text",
        value: "",
        placeholder: "Leave your comment please",
        required: true,
        cols: "33",
        rows: "5",
      },
      options: {
        valid: false,
        touched: false,
        typed: false,
      },
      info: "comment",
      error: {
        msg: "",
      },
    },
  };  
};

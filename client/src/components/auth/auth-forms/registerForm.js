const formData = {
  username: {
    elementName: "input",
    elementBody: {
      name: "username",
      type: "text",
      value: "",
      placeholder: "Username",
      required: true,
      minLength: 4,
    },
    info: "Account username",
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    error: {
      msg: "",
    },
  },
  email: {
    elementName: "input",
    elementBody: {
      name: "email",
      type: "email",
      value: "",
      placeholder: "Email Address",
      required: true,
      minLength: 6,
    },
    info:
      "This site uses Gravatar so if you want a profile image, use a Gravatar email",
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    error: {
      msg: "",
    },
  },
  password: {
    elementName: "input",
    elementBody: {
      name: "password",
      type: "password",
      value: "",
      placeholder: "Enter your password",
      required: true,
      minLength: 6,
    },
    info: "Account password",
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    error: {
      msg: "",
    },
  },
  password2: {
    elementName: "input",
    elementBody: {
      name: "password2",
      type: "password",
      value: "",
      placeholder: "Confirm password",
      required: true,
      minLength: 6,
    },
    info: "Password confirmation",
    options: {
      valid: false,
      touched: false,
      typed: false,
    },
    error: {
      msg: "",
    },
  },
};

export default formData;
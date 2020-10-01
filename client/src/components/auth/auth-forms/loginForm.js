const formData = {  
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
    options: {
      touched: false,
      valid: false,
      typed: false,
    },
    info: "Enter your account email",
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
      placeholder: "Password",
      required: true,
      minLength: 6,
    },
    options: {
      touched: false,
      valid: false,
      typed: false,
    },
    info: "Enter your account password",
    error: {
      msg: "",
    },
  },
};

export default formData;

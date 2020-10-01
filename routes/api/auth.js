const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// jsonwebtoken
const jwt = require("jsonwebtoken");
// local settings
const keys = require("../../config/keys");
const jwtSecret = keys.jwtSecret;
// mw
const auth = require("../../utils/auth");
// model
const User = require("../../models/User");
// define router
const router = express.Router();

// @route       GET api/auth
// @access      Public (no auth needed)
// @desc        get User data if auth
router.get("/", auth, async (req, res, next) => {
  try {
    // find user document and return data except the user password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route       POST api/auth
// @access      Public (no auth needed)
// @desc        Authenticate user & get token
router.post(
  "/",
  [
    // email must be an email
    body("email", "Provide a valid email please").isEmail().normalizeEmail(),
    // password not empty
    body("password", "Password is required").exists(),
  ],
  async (req, res, next) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 - bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email: email });
      if (!user) {
        // already exists
        // return same error structure as express-validator have
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // password match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      // assign payload for jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      // return JWT
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

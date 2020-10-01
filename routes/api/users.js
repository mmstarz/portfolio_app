const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// jsonwebtoken
const jwt = require("jsonwebtoken");
// local settings
const keys = require("../../config/keys");
const jwtSecret = keys.jwtSecret;
// validation
// body('<body.param>', '<validator error message>').<sanitization functions>
const { body, validationResult } = require("express-validator");
// get mongoose model
const User = require("../../models/User");
// define router
const router = express.Router();

// @route       POST api/users
// @access      Public (no auth needed)
// @desc        Register user
router.post(
  "/",
  [
    // username required
    body("username", "Username is required").not().isEmpty(),
    // email must be an email
    body("email", "Provide a valid email please").isEmail().normalizeEmail(),
    // password must be at least 4 chars long
    body(
      "password",
      "Please enter a password with 4 or more characters"
    ).isLength({ min: 4 }),
  ],
  async (req, res, next) => {
    // console.log(req.body);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // 400 - bad request
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email: email });
      if (user) {
        // already exists
        // return same error structure as express-validator have
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200", // default size 200px
        r: "pg", // rating
        d: "mm", // default image
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new instance for user
      user = new User({
        username,
        email,
        password: hashedPassword,
        avatar,
      });
      // store new user in database
      await user.save();
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

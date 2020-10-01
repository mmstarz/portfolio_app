const express = require("express");
// validator
const { body, validationResult } = require("express-validator");
// request
const request = require("request");
// local settings
const keys = require("../../config/keys");
const gh_client_id = keys.githubClientId;
const gh_client_secret = keys.githubClientSecret;
// models
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
// auth mw
const auth = require("../../utils/auth");
// define router
const router = express.Router();

// @route       GET api/profile
// @access      Public (no auth needed)
// @desc        get all profiles
router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "username",
      "avatar",
    ]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/profile/user/:user_id
// @access      Public (no auth needed)
// @desc        get profile by id
router.get("/user/:user_id", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["username", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route       GET api/profile/me
// @access      Private (auth needed)
// @desc        get current user's profile
router.get("/me", auth, async (req, res, next) => {
  try {
    // find profile document by user(which is user.id)
    // and add "username", "avatar" fields from User model
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["username", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route       GET api/profile/github/:username
// @access      Public (no auth needed)
// @desc        get user's repos from github
router.get("/github/:username", (req, res, next) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${gh_client_id}&client_secret=${gh_client_secret}`,
    method: "GET",
    headers: { "user-agent": "node.js" },
  };
  try {
    request(options, (error, response, body) => {
      if (error) {
        console.error(error);
        throw new Error(error);
      }

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }

      // reuest returns body as an array
      // console.log('body :', body);
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route       POST api/profile
// @access      Private (auth needed)
// @desc        Create or updated user's profile
router.post(
  "/",
  auth,
  [
    body("status", "Status is required").not().isEmpty(),
    body("skills", "Skills are required").not().isEmpty(),
  ],
  async (req, res, next) => {
    // get validator result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if any erorrs res bad request with errrors
      return res.status(400).json({ errors: errors.array() });
    }

    // input data fields
    const { status, skills } = req.body;

    // build profile object
    const profileFields = {
      status: status,
      skills: skills.split(",").map((skill) => skill.trim()),
      social: {},
    };
    profileFields.user = req.user.id;
    // add other fields if exist
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // add socials
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    // console.log(profileFields); // test

    try {
      // find profile if exists
      let profile = await Profile.findOne({ user: req.user.id });
      // Update
      if (profile) {
        // find {}, update {}
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/profile/experience
// @access      Private (auth needed)
// @desc        update profile's experience
router.put(
  "/experience",
  auth,
  [
    body("title", "Title is required").not().isEmpty(),
    body("company", "Company is required").not().isEmpty(),
    body("from", "From date is required").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get input data
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    // create new experince object
    const newExp = { title, company, from };
    if (location) newExp.location = location;
    if (to) newExp.to = to;
    if (current) newExp.current = current;
    if (description) newExp.description = description;

    // update database
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/profile/education
// @access      Private (auth needed)
// @desc        update profile's education
router.put(
  "/education",
  auth,
  [
    body("school", "School is required").not().isEmpty(),
    body("degree", "Degree is required").not().isEmpty(),
    body("fieldofstudy", "Field of study is required").not().isEmpty(),
    body("from", "From date is required").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get input data
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    // create new experince object
    const newEdu = { school, degree, fieldofstudy, from };

    if (to) newEdu.to = to;
    if (current) newEdu.current = current;
    if (description) newEdu.description = description;

    // update database
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route       DELETE api/profile/education/:edu_id
// @access      Private (auth needed)
// @desc        remove profile's education
router.delete("/education/:edu_id", auth, async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // get index of removing element
    const removeIndex = profile.education
      .map((edu) => edu.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/profile/experience/:exp_id
// @access      Private (auth needed)
// @desc        remove profile's experience
router.delete("/experience/:exp_id", auth, async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // get index of removing element
    const removeIndex = profile.experience
      .map((exp) => exp.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/profile
// @access      Private (auth needed)
// @desc        delete current user's profile, user, posts
router.delete("/", auth, async (req, res, next) => {
  try {
    // remove posts
    await Post.deleteMany({ user: req.user.id });
    // remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "successfully removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

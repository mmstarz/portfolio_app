const express = require("express");
const { body, validationResult } = require("express-validator");
// auth mw
const auth = require("../../utils/auth");
// define router
const router = express.Router();
// models
const User = require("../../models/User");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route       GET api/posts
// @access      Public (no auth needed)
// @desc        get all posts
router.get("/", async (req, res, next) => {
  try {
    // get newest posts first
    const posts = await Post.find().sort({ date: -1 }).select("-content");
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/posts/slides/:limit
// @access      Public (no auth needed)
// @desc        get limit amount of posts for slides
router.get("/slides/:limit", async (req, res, next) => {
  try {
    // get newest posts first
    const posts = await Post.find()
      .limit(+req.params.limit)
      .sort({ date: -1 })
      .select("-tags -description -content -username -avatar -user -likes -comments");

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route       GET api/posts/:post_id
// @access      Public (no auth needed)
// @desc        get post by id
router.get("/:post_id", async (req, res, next) => {
  try {
    // get post
    const post = await Post.findById(req.params.post_id).select("-intro");

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server Error");
  }
});

// @route       POST api/posts
// @access      Private (auth needed)
// @desc        Create a post
router.post(
  "/",
  auth,
  [
    body("intro", "Intro is required").not().isEmpty(),
    body("title", "Title is required").not().isEmpty(),
    body("description", "Description is required").not().isEmpty(),
    body("tags", "Tags are required").not().isEmpty(),
    body("content", "Content is required").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // get user doc
      const user = await User.findById(req.user.id).select("-password");

      // create new document instance
      const newPost = new Post({
        intro: req.body.intro,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        content: req.body.content,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id,
      });

      // save
      const post = await newPost.save();
      // return
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route       PUT api/posts/like/:id
// @access      Private (auth needed)
// @desc        add like to post by id
router.put("/like/:id", auth, async (req, res, next) => {
  try {
    // get post
    let post = await Post.findById(req.params.id);
    // post check
    if (!post) return res.status(404).json({ msg: "Post not found" });
    // already liked check
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // add user to likes
    post.likes.unshift({ user: req.user.id });
    // save
    await post.save();
    // return
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server Error");
  }
});

// @route       PUT api/posts/unlike/:id
// @access      Private (auth needed)
// @desc        remove like from post by id
router.put("/unlike/:id", auth, async (req, res, next) => {
  try {
    // get post
    let post = await Post.findById(req.params.id);
    // post check
    if (!post) return res.status(404).json({ msg: "Post not found" });
    // not liked check
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }

    // get removing index
    const removingIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removingIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server Error");
  }
});

// @route       POST api/posts/comment/:id
// @access      Private (auth needed)
// @desc        add comment to post by id
router.post(
  "/comment/:id",
  auth,
  [body("text", "Text is required").not().isEmpty()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // get post
      let post = await Post.findById(req.params.id);
      // post check
      if (!post) return res.status(404).json({ msg: "Post not found" });
      // get user data
      const user = await User.findById(req.user.id).select("-password");
      // form new comment
      const newComment = {
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id,
      };
      // add new comment to post comments array
      post.comments.unshift(newComment);
      // save
      await post.save();
      // return
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Post not found" });

      res.status(500).send("Server Error");
    }
  }
);

// @route       DELETE api/posts/comment/:post_id/:comment_id
// @access      Private (auth needed)
// @desc        remove comment from post by id
router.delete("/comment/:post_id/:comment_id", auth, async (req, res, next) => {
  try {
    // get post
    let post = await Post.findById(req.params.post_id);
    // post check
    if (!post) return res.status(404).json({ msg: "Post not found" });
    // get comment
    const comment = post.comments.find(
      (com) => com.id === req.params.comment_id
    );
    // check comment
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }
    // check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const removingIndex = post.comments
      .map((com) => com.id)
      .indexOf(req.params.comment_id);

    // console.log("index: ", removingIndex);

    // remove comment
    post.comments.splice(removingIndex, 1);
    // save
    await post.save();
    // return
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/posts/:post_id
// @access      Private (auth needed)
// @desc        delete post by id
router.delete("/:post_id", auth, async (req, res, next) => {
  try {
    // get post
    const post = await Post.findById(req.params.post_id);
    // post check
    if (!post) return res.status(404).json({ msg: "Post not found" });
    // owner check ObjectId.toString() !== String ?
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not auhtorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Post not found" });

    res.status(500).send("Server Error");
  }
});

module.exports = router;

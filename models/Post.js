const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user", // users?
  },
  intro: {
    type: String,
    required: true
  },
  title: {
    type: String,
    retuired: true,
  },
  description: {
    type: String,
    retuired: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    reqired: true
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user", // users?
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user", // users?
      },
      text: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);

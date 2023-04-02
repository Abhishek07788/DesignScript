const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  blog_id: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  blogs: { type: mongoose.Schema.Types.ObjectId, ref: "blogs", required: true },
  title: { type: String, required: true },
  time: { type: String, required: true },
});

const Comments = mongoose.model("comment", commentSchema);
module.exports = Comments;

const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: Array, required: true },
});

const Blogs = mongoose.model("blogs", blogsSchema);
module.exports = Blogs;

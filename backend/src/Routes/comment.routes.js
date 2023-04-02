const express = require("express");
const Comments = require("../Schema/comment.schema");
const app = express.Router();

//------------- post comment ---------
app.post("/", async (req, res) => {
  try {
    await Comments.create(req.body);
    res.send("Comment Added");
  } catch (e) {
    res.status(404).send(e.massage);
  }
});

//--------- get comments --------
app.get("/", async (req, res) => {
  try {
    const comment = await Comments.find();
    res.send(comment);
  } catch (e) {
    res.status(404).send(e.massage);
  }
});

//--------- get by blog id --------
app.get("/blog/:blog_id", async (req, res) => {
  const { blog_id } = req.params;
  try {
    const comment = await Comments.find({ blog_id: blog_id }).populate([
      "user",
      "blogs",
    ]);
    res.send(comment);
  } catch (e) {
    res.status(404).send(e.massage);
  }
});

//--------- delete comment --------
app.delete("/:id", async (req, res) => {
  try {
    await Comments.deleteOne({ _id: req.params });
    res.send("Comment Deleted");
  } catch (e) {
    res.status(404).send(e.massage);
  }
});

module.exports = app;

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

//--------- get by user id --------
app.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  try {
    const comment = await Comments.find({ user_id: user_id }).populate([
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
  const { id } = req.params;
  try {
    await Comments.deleteOne({ _id: id });
    res.send("Comment Deleted");
  } catch (e) {
    res.status(404).send(e.massage);
  }
});

module.exports = app;

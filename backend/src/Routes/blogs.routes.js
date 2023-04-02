const express = require("express");
const Blogs = require("../Schema/blogs.schema");
const app = express.Router();

// ---------- (post Blogs) -------------
app.post("/", async (req, res) => {
  try {
    await Blogs.create(req.body);
    res.send("Blogs Added!!");
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (Get Blogs) -------------
app.get("/", async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ date: -1 }).populate(["user"]);
    res.send(blogs);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (Get Blogs by id) -------------
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await Blogs.findOne({ _id: id }).populate(["user"]);
    res.send(blogs);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (Get Blogs by title) -------------
app.get("/title/:findTitle", async (req, res) => {
  const { findTitle } = req.params;
  try {
    const blogs = await Blogs.find({
      title: { $regex: ".*" + findTitle + ".*" },
    }).populate(["user"]);
    res.send(blogs);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (Get Blogs by user_id) -------------
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await Blogs.find({ userid: id })
      .sort({ date: -1 })
      .populate(["user"]);
    res.send(blogs);
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (delete Blogs) -------------
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blogs.deleteOne({ _id: id });
    res.send("Blogs Deleted");
  } catch (e) {
    res.status(404).send(e);
  }
});

// ---------- (Update Blogs) -------------
app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blogs.updateOne({ _id: id }, { $set: req.body });
    res.send("blog updated!!");
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = app;

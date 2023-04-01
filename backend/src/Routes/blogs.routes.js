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
    const blogs = await Blogs.find().populate(["user"]);
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
    const blogs = await Blogs.find({ user_id: id }).populate(["user"]);
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
app.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { image, title, description } = req.body;

  try {
    // -------------- (Thumbnail) ---------
    if (image) {
      await Blogs.updateOne({ _id: id }, { $set: { image: image } });
      return res.send("newThumbnail updated");
    }

    // -------------- (Thumbnail) ---------
    if (title) {
      await Blogs.updateOne({ _id: id }, { $set: { title: title } });
      return res.send("newTitle updated");
    }

    // -------------- (description) ---------
    if (description) {
      await Blogs.updateOne(
        { _id: id },
        { $set: { description: description } }
      );
      return res.send("newDescription updated");
    }
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = app;

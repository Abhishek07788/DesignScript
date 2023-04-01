const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const UserRouter = require("./Routes/user.routes");
const blogsRouter = require("./Routes/blogs.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", UserRouter);
app.use("/blogs", blogsRouter);

app.use("/", (req, res) => {
  res.send("Hello Design Script This the backend");
});

app.listen(8080, async () => {
  await dbConnect();
  console.log("Stared at http://localhost:8080");
});

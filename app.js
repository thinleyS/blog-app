const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

const port = process.env.PORT || 3000;

// connect to mongodb database
const URI =
  "mongodb+srv://madao:password@nodeblogs.kleqr.mongodb.net/node-blogs?retryWrites=true&w=majority"; // enter your valid password
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs"); // redirects to blogs page, you may add seperate home page
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 - should always be at bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

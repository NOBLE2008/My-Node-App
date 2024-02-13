import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const hostname = '0.0.0.0';

app.use(express.static("./public"))
app.use(bodyParser.urlencoded({ extended: true}))
var posts = [];
app.get("/", (req, res) => {
    res.render("home.ejs", {posts: posts});
  });
  app.post("/viewpost", (req, res) => {
    res.render("viewpost.ejs", {
        posts: posts[req.body["postinput"]],
        postIndex: req.body["postinput"]
});
  });
  app.post("/deletedpost", (req, res) => {
        posts.splice(req.body["postValue"], 1)
        res.redirect("/")
  });
  app.get("/newpost", (req, res) => {
    res.render("newpost.ejs")
  });
  app.get("/postview", (req, res) => {
    res.render("home.ejs", {posts: posts})
  });
  app.get("/deleteallpost", (req, res) => {
    res.render("deleteallpost.ejs")
  });
  app.post("/deleteallpost", (req, res) => {
    posts = [];
    res.redirect("/")
  });
  app.post("/created", (req, res) => {
    var postDetails = {
        "title": req.body["title"],
        "content": req.body["content"]
    };
    posts.push(postDetails);
    res.redirect("/");
  });
  app.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}/`);
  });
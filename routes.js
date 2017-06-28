const express = require("express");
const router = express.Router();
const models = require("./models");

router.get("/", function(req, res) {
  res.redirect("/list");
  console.log("connected");
});

router.get("/list", function(req, res) {
  models.todo.findAll().then(function(todos) {
    console.log(todos[0].dataValues);
    res.render("index", {todos: todos});
  });
});
module.exports = router;

const express = require("express");
const router = express.Router();
const models = require("./models");

const getTodo = function (req,res,next) {
  models.todo.findById(req.params.todoid).then(function (todoItem) {
    if (todoItem){
      req.todo = todoItem;
      next();
    } else {
      res.status(404).send("Not Found.");
    }
  });
};

router.get("/", function(req, res) {
  res.redirect("/list");
});

router.get("/list", function(req, res) {
  models.todo.findAll().then(function(todos) {
    res.render("index", {
      todo: todos
    });
  });
});

router.post("/list", function(req, res) {
  // req.checkBody("todo", "You must include a todo.").notEmpty();

  const newTodo = {
    name: req.body.todo,
    completed: false
  };

  // req.getValidationResult().then(function (result) {
    // if (result.isEmpty()){
      models.todo.create(newTodo).then(function () {
        res.redirect("/");
      });
    // }
  // })
});

router.post("/list/:todoid/complete", getTodo, function(req, res) {
  req.todo.update({
    completed: true
  }, {
    where: {
      id: req.params.todoid
    }
  }).then(function () {
    res.redirect("/");
  });
});

router.post("/list/:todoid/delete", getTodo, function(req, res) {
  req.todo.destroy({
    where:{
      id: req.params.todoid
    }
  }).then(function () {
    res.redirect("/");
  });
});

router.post("/deleteComplete", function (req,res) {
  models.todo.destroy({where:{completed:true}})
  .then(function () {
    res.redirect("/");
  });
});


router.get("/*",function (req,res) {
  res.redirect("/");
});

module.exports = router;

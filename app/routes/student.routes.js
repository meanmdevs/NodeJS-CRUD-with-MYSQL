module.exports = app => {
  const students = require("../controllers/student.controller.js");

  var router = require("express").Router();

  router.post("/", students.create);
  router.get("/", students.findAll);
  router.get("/published", students.findAllPublished); 
  router.get("/:iStudentId", students.findOne); 
  router.put("/:iStudentId", students.update); 
  router.delete("/:iStudentId", students.delete); 
  router.delete("/", students.deleteAll); 
  app.use('/api/students', router);
};

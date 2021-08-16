const router = require("express").Router();
const studentController = require("../controllers/studentController");

// const {
//   signUpValidation,
//   loginValidation
// } = require("../middleWares/userValidation");

module.exports = function() {
  var stdCtl = new studentController();

  router.post("/register", stdCtl.register);
  router.get("/getall", stdCtl.getAll);

  return router;
};

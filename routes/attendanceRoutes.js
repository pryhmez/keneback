const router = require("express").Router();
const attendanceController = require("../controllers/attendanceController");
// const auth = require("../middleWares/checkAuth");
const {
  signUpValidation,
  loginValidation
} = require("../middleWares/userValidation");

module.exports = function() {
  var attendanceCtl = new attendanceController();

  router.get("/clockin", attendanceCtl.clockin);
  router.get("/getrecord", attendanceCtl.getRecord);
//   router.post("/signup", signUpValidation, authCtl.signUp);
 
  return router;
};

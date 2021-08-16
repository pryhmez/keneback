const { register, getAll } = require("../services/studentServices");

module.exports = function dataController() {

  //registers a student
  this.register = (req, res, next) => {


    register(req.body).then(result => {

      res.send({
        success: true,
        entry: req.body,
        data: result
      })
    }).catch(err => {
      console.log(err);
      res.status(400).send({
        success: false,
        data: err
      })
    })

  }

  this.getAll = (req, res, next) => {
    getAll().then(result => {

      res.status(200).send({
        success: true,
        data: result
      })
    }).catch(err => {
      res.status(400).send({
        success: false,
        data: err
      })
    })

  }


  //get the users profie details and then returns the value
  this.getUserProfile = (req, res, next) => {

    getUserProfile(req.body).then(result => {
      res.send({
        success: true,
        entry: req.body,
        data: result
      })
    }).catch(err => {
      res.send({
        success: false,
        data: err
      })
    })
  }



};

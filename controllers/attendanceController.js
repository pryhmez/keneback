const { clockin, getRecord } = require("../services/attendanceServices");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const checkAuth = require("../middleWares/checkAuth");

module.exports = function attendanceController() {


    this.clockin = function (req, res, next) {

        clockin(req.query).then(result => {
            global.io.sockets.emit(
                "data",
                {
                    pix: result.pix,
                    name: result.firstName + " " + result.lastName,
                    regno: result.regNo,
                    email: result.email
                }
            );
            // console.log(result);
            let obj = result;
            obj.pix = '';
            if (result == "card is not registered to any student") {
                res.status(401).send({
                    failed: true,
                    entry: req.query,
                    // data: obj
                })
            }
            console.log(obj);
            res.status(200).send({
                success: true,
                entry: req.query,
                data: obj
            })
        }).catch(err => {
            res.status(400).send({
                success: false,
                data: err
            })
        })

    }



    this.getRecord = function (req, res, next) {

        getRecord(req.query).then(result => {
    
            res.status(200).send({
                success: true,
                data: result
            })
        }).catch(err => {
            res.status(401).send({
                success: false,
                data: err
            })
        });
    }


};

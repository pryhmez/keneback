const studentRoutes = require("./studentRoutes");
const attendanceRoutes = require("./attendanceRoutes");

const {mySocket} = require('../sockets');


module.exports = function (router) {
    router.use("/student", studentRoutes());
    router.use("/attendance", attendanceRoutes());

    return router;
}
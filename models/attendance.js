var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var d = new Date();
var day = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();

// var date = new Date(miliseconds));
// var d = Date.parse("mm dd yyyy");

var AttendanceSchema = new Schema({

    recordDate: { type: String, default: month + " " + day + " " + year },

	record: [
        {
            cardNo: {type: String, unique: true, required: true},
            time: {type: Date, default: new Date().getTime()}
        }
    ]
		

});

module.exports = mongoose.model('Attendance', AttendanceSchema);

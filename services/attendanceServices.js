var mongoose = require('mongoose');

const studentModel = require("../models/students");
const attendanceModel = require('../models/attendance');
const students = require('../models/students');

const ObjectId = mongoose.Types.ObjectId;


var d = new Date();
var day = d.getDate();
var month = d.getMonth();
var year = d.getFullYear();

//saves any message that is being handled to the database
const clockin = async (data) => {

    console.log(data.cardno);

    const student = await studentModel.findOne({ cardNo: data.cardno });

    if (student) {

        console.log("the student exists");

        const record = await attendanceModel.findOne({ recordDate: month + " " + day + " " + year });

        if (record) {

            const attendance = await attendanceModel.updateOne({
                recordDate: month + " " + day + " " + year
            }, {
                $push: {
                    record: {
                        cardNo: data.cardno
                    }
                }
            });

            // console.log(student);
            return student;

        } else {

            const attendance = await new attendanceModel(
                {
                    record: [
                        { cardNo: data.cardno }
                    ]
                });

            // console.log(student);

            await attendance.save();

            return student;
        }

    } else {

        return "card is not registered to any student"

    }


}



const getRecord = async (data) => {

    if (data.date) {
        console.log("there is date");
        const record = await attendanceModel.findOne({ recordDate: data.date });


        // let id = await record.record[].cardNo;

        return await record;

    } else {
        console.log("there is no date");


        const record = await attendanceModel.findOne({ recordDate: month + " " + day + " " + year });


        // try(

        // )catch(e){}

        // console.log(out);
        let result = await Promise.all(record.record.map(async (item, i) => {

            let container = {};

          
            let student = await studentModel.findOne({ cardNo: item.cardNo });
                // stud => {

                    if (student == null) {
                        
                        // console.log(student);
                    }
                    else {

                        let obj = student;
                        obj.pix = '';
                        // console.log(obj);

                        container = {
                            ...item._doc,
                            // ...student._doc,
                            ...obj._doc
                            
                        }
                    }


                // }
        


            // console.log(container);
            return await container;
        }


        ));


        // console.log(result);
        return await result;
    }
}



module.exports = {
    clockin,
    getRecord
}



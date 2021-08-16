var mongoose = require('mongoose');
const studentModel = require("../models/students");

const bcrypt = require("bcrypt");

//searches and finds users with name
const register = async function (data) {

  console.log(data)
  const newStudent = await new studentModel(
    {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        cardNo: data.cardno,
        gender: data.gender,
        age: data.age,
        regNo: data.regno
    });


    return newStudent.save();


}

const getAll = async function () {

  let students = studentModel.find({})
  return students;
}


//gets the users profil details for th profile page
const getUserProfile = async function (data) {

  //gets the number of friends
  const friends = await contactsModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId), "contacts.requestStatus": "pending" }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$contacts" } }
        }
      }
    ]
  );

  //gets the number of crushes
  const crushes = await crushModel.aggregate(
    [
      {
        $match: { userId: ObjectId(data.userId) }
      },
      {
        $group: {
          _id: "$userId",
          total: { $sum: { $size: "$crushs" } }
        }
      }
    ]
  );

  //gets the user details
  // const user = await userModel.findOne({ _id: data.userId });


  return await { user, crushes, friends }
}


//gets all my pending and unaccepted friend requests
const recievedRequests = async function (userId) {

}







module.exports = {
  register,
  getUserProfile,
  getAll,
  // findUserWithId,
  // loginUser,
  // findUserWithEmail,
  // saveChangesToUser,
  // editUser,
  // dashboard
}
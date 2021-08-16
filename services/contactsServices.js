var mongoose = require('mongoose');
const contactsModel = require('../models/contacts');
const userModel = require('../models/users');
const ObjectId = mongoose.Types.ObjectId;

//<--------------------------------------functions------------------------------------------>


const addup = async (userId, friendsId, type, status) => {
    const user = await contactsModel.findOne({ userId: userId });
    //check if user already exists in contact page
    if (user) {
        console.log(userId + 'exists')

        //if he exists get friends data
        const friendsRetrievedData = await userModel.findOne({ _id: friendsId });
        //check if friend has already been added
        const gut = await contactsModel.findOne({ userId, "contacts.friendsId": friendsId });
        if (gut) {
            return "friend has been added already"
        }

        //if not add the new user object
        const users = await contactsModel.updateOne({
            userId: userId
        }, {
            $push: {
                 contacts: {
                    friendsId,
                    friendsFirstName: friendsRetrievedData.firstName,
                    friendsLastName: friendsRetrievedData.lastName,
                    friendsNickName: friendsRetrievedData.nickName,
                    friendsAge: friendsRetrievedData.age,
                    friendsGender: friendsRetrievedData.gender,
                    requestType: type,
                    requestStatus: status
                }
            }
        })
        // .exec(cb);
        // console.log(user);
        return user;
    } else {
        // console.log(userId + 'does not exist')
        const userRetrievedData = await userModel.findOne({ _id: userId });
        const friendsRetrievedData = await userModel.findOne({ _id: friendsId });
        // console.log("------------------------------------------------------")
        // console.log(friendsId)
        // await console.log(userId, friendsId);

        const newRequest = await new contactsModel({
            userId,
            firstName: userRetrievedData.firstName,
            lastName: userRetrievedData.lastName,
            contacts: [
                {
                    friendsId,
                    friendsFirstName: friendsRetrievedData.firstName,
                    friendsLastName: friendsRetrievedData.lastName,
                    friendsNickName: friendsRetrievedData.nickName,
                    friendsAge: friendsRetrievedData.age,
                    friendsGender: friendsRetrievedData.gender,
                    requestType: type,
                    requestStatus: status
                }
            ]
        })
        return await newRequest.save();
    }
}

const accept = async (userId, friendsId, type) => {
    const check = await contactsModel.findOne({ userId, "contacts.friendsId": friendsId, "contacts.requestType": type })
    // await console.log(check)

    const users = await contactsModel.findOneAndUpdate({
        userId, "contacts.friendsId": friendsId, "contacts.requestType": type
    }, {
        $set: {
            "contacts.$.requestStatus": "accepted"
        }
    }, { new: true })
    return await users
}


//<--------------------------------------functions------------------------------------------>

const addFriend = async function (data) {
    // console.log(data)
    let userId = data.userid;
    let friendsId = data.friendsid;
    await addup(friendsId, userId, "recieved", "pending");
    return await addup(userId, friendsId, "sent", "pending");

}

const acceptFriend = function (data) {

    let friendsId = data.friendsid;
    let userId = data.userid;

    accept(userId, friendsId, "recieved");
    return accept(friendsId, userId, "sent");


}

const getAllRecievedFriendRequest = async function (data) {
    let userId = data.userid;

    const requests = await contactsModel.aggregate(
        [
            {
                $match: { userId: ObjectId(userId) }
            },
            {
                $project: {
                    _id: 0,
                    contacts: {
                        $filter: {
                            input: "$contacts",
                            as: "contact",
                            cond: { $in: ["$$contact.requestType", ["recieved"]] }
                        }
                    }
                }
            }
        ]
    );

    return await requests;
}

const getAllFriends = async function (data) {
    let userId = data.userid;
    console.log(userId)
    const requests = await contactsModel.aggregate(
        [
            {
                $match: { userId: ObjectId(userId) }
            },
            {
                $project: {
                    _id: 0,
                    contacts: {
                        $filter: {
                            input: "$contacts",
                            as: "contact",
                            // cond: { $in: ["$$contact.requestStatus", ["pending"]] }
                            cond: { $in: ["$$contact.requestStatus", ["accepted"]] }
                        }
                    }
                }
            }
        ]
    );

    return await requests;
}

const getAllSentFriendRequest = async function (data) {
    let userId = data.userid;

    const requests = await contactsModel.aggregate(
        [
            {
                $match: { userId: ObjectId(userId) }
            },
            {
                $project: {
                    _id: 0,
                    contacts: {
                        $filter: {
                            input: "$contacts",
                            as: "contact",
                            cond: { $in: ["$$contact.requestType", ["sent"]] }
                        }
                    }
                }
            }
        ]
    );

    return await requests;
}


module.exports = {
    addFriend,
    acceptFriend,
    getAllFriends,
    getAllRecievedFriendRequest,
    getAllSentFriendRequest
}
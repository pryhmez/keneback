const crushModel = require('../models/crushes');
const userModel = require('../models/users');


//<-------------------functions--------------------------------------->
const accept = async (userId, crushesId, crushing) => {
    // const check = await crushModel.findOne({
    //     userId, "crushes.crushesId": crushesId, "crushes.requestType": type})
    // await console.log(check)

    const users = await crushModel.findOneAndUpdate({
        // grades: { $elemMatch: { grade: { $lte: 90 }, mean: { $gt: 80 } } }
        userId, crushs: {$elemMatch: { crushesId, crushing}}
        // userId, "crushs.crushesId": crushesId, "crushs.crushing": crushing
    }, {
        $set: {
            "crushs.$.reverseCrushing": true,
            "crushs.$.crushing": true
        }
    }, { new: true }, (err) => {console.log(err)})
    return await users
}


const crushup = async (userId, crushesId, crushing, reverseCrushing) => {
    const user = await crushModel.findOne({ userId: userId });

    if (user) {
        //if user exists already
        const friendsRetrievedData = await userModel.findOne({ _id: crushesId });

        //check it there has been any crushing between the two previously
        const gut = await crushModel.findOne({
            userId, "crushs.crushesId": crushesId
        });
        if (gut) {
            const check = await crushModel.findOne({
                userId, "crushs.crushesId": crushesId, "crushs.crushing": false
            });
            if (check) {
                await accept(userId, crushesId, false);
                return await accept(crushesId, userId, true);
            } else {

                return "crush has been added already"
            }
        }

        const users = await crushModel.updateOne({
            userId: userId
        }, {
            $push: {
                crushs: {
                    crushesId: crushesId,
                    crushesName: friendsRetrievedData.firstName + friendsRetrievedData.lastName,
                    // crushesLastName: friendsRetrievedData.lastName,
                    crushesNickName: friendsRetrievedData.nickName,
                    crushesAge: friendsRetrievedData.age,
                    crushesGender: friendsRetrievedData.gender,
                    crushing,
                    reverseCrushing
                }
            }
        })
        // .exec(cb);
        // console.log(user);
        return user;
    } else {
        const userRetrievedData = await userModel.findOne({ _id: userId });
        const friendsRetrievedData = await userModel.findOne({ _id: crushesId });
        // console.log("------------------------------------------------------")
        // console.log(friendsId)
        // await console.log(friendsRetrievedData, userRetrievedData);

        const newRequest = await new crushModel({
            userId,
            firstName: userRetrievedData.firstName,
            lastName: userRetrievedData.lastName,
            crushs: [
                {
                    crushesId: crushesId,
                    crushesName: friendsRetrievedData.firstName + friendsRetrievedData.lastName,
                    // crushesLastName: friendsRetrievedData.lastName,
                    crushesNickName: friendsRetrievedData.nickName,
                    crushesAge: friendsRetrievedData.age,
                    crushesGender: friendsRetrievedData.gender,
                    crushing,
                    reverseCrushing
                }
            ]
        })
        return await newRequest.save();
    }
}
//---------------------------------functions-------------------------------------------->


const crush = function (data) {
    let userId = data.userid;
    let crushesId = data.friendsid;
    crushup(crushesId, userId, false, true);
    return crushup(userId, crushesId, true, false);
}

const unCrush = async function (data) {

    let userId = data.userid;
    let crushesId = data.friendsid;

    const uncrusher = await crushModel.findOneAndUpdate({
        userId, crushs: {$elemMatch: {crushesId}}
    }, {
        $set: {
            "crushs.$.crushing": false
        }
    });

    const uncrusher_crush = await crushModel.findOneAndUpdate({
        userId: crushesId, crushs: {$elemMatch: {crushesId: userId}}
    }, {
        $set: {
            "crushs.$.reverseCrushing": false
        }
    });

    return {uncrusher, uncrusher_crush}
}

const getAllMatches = function (data) {

}


module.exports = {
    crush,
    getAllMatches,
    unCrush
}
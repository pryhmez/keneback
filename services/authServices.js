const userModel = require('../models/users')


const signUpUser = async function(userData, hash) {
    // let user  =  await userModel.findOne({ email: userData.email });
    // if (user) {
    //     console.log(user)
    //     return null
    // };
    const newUser = await new userModel(
        {
            firstName: userData.firstname,
            lastName: userData.lastname,
            email: userData.email,
            phone: userData.phone,
            password: hash,
            gender: userData.gender,
            age: userData.age
        });
        return newUser.save();
}

const loginUser =  function (userData) {
    const user =  userModel.findOne({email: userData.email});
    return user
}



















const verifyUserAccountToken = async function(_userId, token){
   const oldTokenCollection  = await tokenModel.findOne({ _userId })
        if(oldTokenCollection) {
            const { token: oldToken } = oldTokenCollection;
            await tokenModel.deleteOne({ token : oldToken })
        }

    const userToken = new tokenModel({
        _userId,
        token
    })
    const res = await userToken.save();
    return res
}
const confirmSignUp = function( token ) {
    return tokenModel.findOne({ token })
}

module.exports = {
    signUpUser,
    loginUser,
    verifyUserAccountToken,
    confirmSignUp,
}
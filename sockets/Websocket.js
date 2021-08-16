// const { saveMessage } = require('../services/messageServices');

let users = [];

// function findValue(arr, key) {
//   return arr.find(function (o) { return o.userId === key });
// }


const connection = function (client) {
  console.log('new user connected')

  client.emit('data', "20005");

  client.on("data", (data, cb) => {
    console.data(data);
  })


  // event fired when the chat room is disconnected
  client.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== client.id);
    console.log('user disconnected')
  });

  //private message messenger for sending private messages
//   client.on("privatemessage", (data, cb) => {
//     console.log(data);

//     //saves message to database
//     saveMessage(data).then(result => {
//       if(result.nModified){

//         cb("message saved successfully");
//       }
//     })

//     let foundUser = findValue(users, data.recieverId);
//     // console.log(foundUser)
    
//     //sends message only when user is online
//     if(foundUser){
      
//       io.to(foundUser.socketId)
//         .emit('privatemessage', data, (error) => {
//           if(error) {
            
//           }
//         })
//     }

//   })

//   // add identity of user mapped to the socket id
//   client.on("identity", ({ userId }) => {
//     users.push({
//       socketId: client.id,
//       userId: userId,
//     });
//     console.log(users)
//   });

//   // subscribe person to chat & other user as well
//   client.on("subscribe", (room, otherUserId = "") => {
//     subscribeOtherUser(room, otherUserId);
//     client.join(room);
//   });
//   // mute a chat room
//   client.on("unsubscribe", (room) => {
//     client.leave(room);
//   });
// }

// const subscribeOtherUser = function (room, otherUserId) {
//   const userSockets = this.users.filter(
//     (user) => user.userId === otherUserId
//   );
//   userSockets.map((userInfo) => {
//     const socketConn = global.io.sockets.connected(userInfo.socketId);
//     if (socketConn) {
//       socketConn.join(room);
//     }
//   });
}


// export default new WebSockets();

module.exports = {
  connection,
  // subscribeOtherUser
}
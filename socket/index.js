const io = require('socket.io')(8010, {
  cors: {
    origin: '*',
  },
});

let users = [];
let groups = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// const addUserToGroup = (userId, groupId) => {
//   groups.map((group) => {
//     if (group.id === groupId && !group.users.include(userId)) {
//       group.users.push(userId);
//     }
//   });
// };

// const removeUserFromGroup = (userId, groupId) => {
//   groups = groups.filter((group) => user.socketId !== socketId);
// };

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('connected to socket:', socket.id);
  // Obtain User and socket ID

  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
    console.log(users);
    io.emit('getUsers', users);
  });

  socket.on('joinGroup', (data) => {
    // addUserToGroup(data.user, socket.id);
    socket.join(data.group);
    console.log(`${data.user} joined ${data.group}`);
  });

  socket.on('sendChat', ({ senderId, receiverId, text, isGroup }) => {
    console.log('Chat Sent: ', senderId, receiverId, text, isGroup);
    console.log(users);
    if (isGroup) {
      return io.to(receiverId).emit('getChat', {
        senderId,
        text,
      });
    } else {
      const user = getUser(receiverId);
      console.log(user);
      if (user) {
        return io.to(user.socketId).emit('getChat', {
          senderId,
          text,
        });
      }
    }
  });

  //CONNECT TWO USERS
  socket.on('CONNECT_USERS',(senderID,receiverId)=>{
    const receiver_user = getUser(receiverId);
    const sender_user = getUser(senderID);

    if (receiver_user === undefined) {
      return io.to(sender_user.socketId).emit('Send_mail_message', {
        isActive: false,
        eventType: 'CONNECT_USERS',
        receiverId,
      });
    }
    
    io.to(receiver_user.socketId).emit('Send_mail_message', {
      isActive: true,
      senderID,
      eventType: 'CONNECT_USERS',
    });

  })
  //MESSAGE REQUEST
  socket.on('MESSAGE_REQUEST', (senderID, receiverId) => {
    const receiver_user = getUser(receiverId);
    const sender_user = getUser(senderID);

    if (receiver_user === undefined) {
      return io.to(sender_user.socketId).emit('Send_mail_message', {
        isActive: false,
        eventType: 'MESSAGE_REQUEST',
        receiverId,
      });
    }
  });

  //   //PROFILE LOOK UP
  socket.on('PROFILE_NOTIFICATION', (senderID, receiverId) => {
    const receiver_user = getUser(receiverId);
    const sender_user = getUser(senderID);
    if (receiver_user === undefined) {
      return io.to(sender_user.socketId).emit('Send_mail_message', {
        isActive: false,
        eventType: 'PROFILE_NOTIFICATION',
        receiverId,
      });
    }
    io.to(receiver_user.socketId).emit('Send_mail_message', {
      isActive: true,
      senderID,
      eventType: 'PROFILE_NOTIFICATION',
    });
  });

  //EVENT INVITE
  socket.on('EVENT_INVITATION', (senderID, eventID,receiverId)=>{
    const receiver_user = getUser(receiverId);
    const sender_user = getUser(senderID);

    if (receiver_user === undefined) {
      return io.to(sender_user.socketId).emit('getInvite', {
        isActive: false,
        eventType: 'EVENT_INVITATION',
        eventID: eventID,
        receiverId
      });
    }
    io.to(receiver_user.socketId).emit('getInvite', {
      isActive: true,
      senderID,
      eventID: eventID,
      eventType: 'EVENT_INVITATION',
    });
    io.to(sender_user.socketId).emit('send_inivte','your invitation was successfuly shared to your network.')
  });

  //JOIN EVENT
  socket.on('JOIN_EVENT',(user,eventid) =>{
    const receiver_user = getUser(user);
    if(receiver_user !== undefined){
      io.to(receiver_user.socketId).emit('join_event', {
        isActive: true,
        eventType: 'JOIN_EVENT',
        eventID:eventid,
      });
    }
  })
  //END JOIN EVENT
  socket.on('ClearNotification', (userId) => {
    const user = getUser(userId);
    if (user === undefined) {
      return null;
    }
    io.to(user.socketId).emit('ClearAll');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
import { Socket } from 'socket.io';

const userHandshake = (socket: Socket, next: any) => {
  // check if user logged in
  const userID = socket.handshake.auth.userID;
  if (!userID) {
    return next(new Error('invalid user id - user needs to login'));
  }
  socket.data.userID = userID;
  next();
};

export default userHandshake;

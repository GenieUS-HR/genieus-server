import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

const userHandshake = (socket: Socket, next: (err?: ExtendedError) => void) => {
  // check if user logged in
  const userID = socket.handshake.auth.userID;
  if (!userID) {
    return next(new Error('invalid user id - user needs to login'));
  }
  socket.data.userID = userID;
  next();
};

export default userHandshake;

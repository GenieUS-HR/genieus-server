import { Server, Socket } from 'socket.io';
import InMemorySessionStore from './session-store';

const sessionStore = new InMemorySessionStore();

const userHandler = (io: Server, socket: Socket) => {
  const userID = socket.data.userID;
  // join user's room
  socket.join(userID);
  // save connected status
  sessionStore.saveSession(userID, { userID, connected: true });

  // send already connected users
  // socket.emit('connected users', users);

  socket.broadcast.emit('user connected', userID);

  socket.on('request status', () => {
    const users = sessionStore.findAllSessions();
    socket.emit('users', users);
  });

  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify clients and save disconnected status
      socket.broadcast.emit('user disconnected', userID);
      sessionStore.saveSession(userID, { userID, connected: false });
    }
  });
};

export default userHandler;

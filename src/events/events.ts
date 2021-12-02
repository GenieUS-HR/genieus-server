import { Server, Socket } from 'socket.io';
import InMemorySessionStore from './session-store.js';

const sessionStore = new InMemorySessionStore();

const userHandler = (io: Server, socket: Socket) => {
  // PERSIST SESSION
  sessionStore.saveSession(socket.data.sessionID, {
    userID: socket.data.userID,
    sessionID: socket.data.sessionID,
    connected: true,
  });

  socket.emit('session', {
    sessionID: socket.data.sessionID,
    userID: socket.data.userID,
  });
};

export default userHandler;

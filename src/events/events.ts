import { Server, Socket } from 'socket.io';
import InMemorySessionStore from './session-store.js';
import InMemoryMessageStore from './message-store.js';
import { Message } from './message-store.js';

const sessionStore = new InMemorySessionStore();
const messageStore = new InMemoryMessageStore();

const userHandler = (io: Server, socket: Socket) => {
  const userID = socket.data.userID;
  // join user's room
  socket.join(userID);
  // save connected status
  sessionStore.saveSession(userID, { userID, connected: true });

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

  socket.on('join help request', (helpRequestID) => {
    // add new user to chat room
    socket.join(helpRequestID);
    const messages = messageStore.getMessages(helpRequestID);
    // send messages already posted to new user joining chat
    socket.emit('existing messages', messages);
    socket.to(helpRequestID).emit('user joined chat', socket.data.userID);
  });

  socket.on('post message', (helpRequestID: string, message: Message) => {
    messageStore.saveMessage(helpRequestID, message);
    // send messages to others in chat room
    socket.to(helpRequestID).emit('get message', message);
  });

  socket.on('end session', (helpRequestID: string) => {
    socket.to(helpRequestID).emit('chat closed', helpRequestID);
  });

  socket.on('leave help request', (helpRequestID) => {
    socket.leave(helpRequestID);
    socket.to(helpRequestID).emit('user left chat', socket.data.userID);
  });
};

export default userHandler;

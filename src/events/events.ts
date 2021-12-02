import { Server, Socket } from 'socket.io';

const userHandler = (io: Server, socket: Socket) => {
  // join user's room
  socket.join(socket.data.userID);

  socket.emit('user logged on', socket.data.userID);

  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.data.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit('user disconnected', socket.data.userID);
    }
  });
};

export default userHandler;

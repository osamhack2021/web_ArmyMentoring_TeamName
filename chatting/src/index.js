const path = require('path');
const express = require('express');
const {createServer} = require('http');
const {Server} = require('socket.io');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket)=>{
    socket.on('joinRoom', (roomName, user)=>{
        socket.join(roomName, () => {})
        io.to(roomName).emit('joinRoom', roomName, user);
    })

    socket.on('chatMessage', (message, roomName, user) => {
        socket.broadcast.to(roomName).emit('chatMessage', message, user);
    });
})

server.listen(PORT, () => {
    console.log(`server on port ${PORT}!`);
});
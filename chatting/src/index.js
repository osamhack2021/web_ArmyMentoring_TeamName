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
        console.log(`${socket.id} joinRoom`);
        socket.join(roomName, () => {
            console.log(`${user} joined to ${roomName}.`);
        })
        io.to(roomName).emit('joinRoom', roomName, socket.id);
    })

    socket.on('chatMessage', (message, roomName, user) => {
        console.log(`${user} send "${message}"`);
        socket.broadcast.to(roomName).emit('chatMessage', message, socket.id);
    });
})

server.listen(PORT, () => {
    console.log(`server on port ${PORT}!`);
});
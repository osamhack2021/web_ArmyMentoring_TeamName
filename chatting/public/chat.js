// const socket = io({query:'roomName=myRoom'});
const socket = io();

socket.on('connect', () => {
    console.log(socket.connected ,socket.id);
});

socket.on('disconnect', () => {
    console.log(socket.connected, socket.id);
});

socket.on('joinRoom', (roomName, user) => {
    console.log(`'${user}' joined ${roomName}.`);
});

socket.on('chatMessage', (message, user)=>{
    console.log(`${user} : ${message}`);
})
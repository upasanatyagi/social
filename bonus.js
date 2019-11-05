const onlineUsers = {};
io.on("connection", socket => {
    console.log();
});

socket.on("aisconnect", () => {
    delete onlineUsers[socket.id];
    //loop through different sockets with object.value
    console.log(`a socket with the id ${socket.id} just disconnected`);
});

console.log(Object.entries({}));
//bonus wall post
//threading messages
//cheerio

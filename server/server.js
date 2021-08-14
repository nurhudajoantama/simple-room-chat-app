const express = require("express");
const app = express();
const path = require("path");
const httpServer = require("http").createServer(app);

require("dotenv").config({
  path: "../.env",
});
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

const io = require("socket.io")(httpServer);

const { userJoin, userLeave, getRoomUsers } = require("./utils/users");

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

io.on("connection", (socket) => {
  socket.emit("user-id", { id: socket.id });
  const nickname = socket.handshake.query.nickname;
  const room = socket.handshake.query.room;
  socket.join(room);

  userJoin({ id: socket.id, nickname, room });

  io.to(room).emit("room-users", {
    roomUsers: getRoomUsers(room),
  });
  socket.broadcast.to(room).emit("recieve-message", {
    fromBot: true,
    message: `${nickname} has joined the chat`,
  });

  socket.on("send-message", ({ message }) => {
    socket.broadcast.to(room).emit("recieve-message", { from: nickname, message });
  });

  socket.on("disconnect", () => {
    userLeave(socket.id);
    io.to(room).emit("room-users", {
      roomUsers: getRoomUsers(room),
    });
    socket.broadcast.to(room).emit("recieve-message", {
      fromBot: true,
      message: `${nickname} has left the chat`,
    });
  });
});

httpServer.listen(PORT, HOSTNAME, () => {
  console.log(`listenign on ${HOSTNAME + ":" + PORT}`);
});

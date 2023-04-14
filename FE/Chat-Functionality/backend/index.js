const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
var cors = require("cors");

const app = express();
app.use(cors());
const httpServer = http.createServer(app);

app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/about", (req, res) => {
  res.send("aboutpage");
});

httpServer.listen(4400, () => {
  console.log("Listening on 4400");
});

// Combining http server using express with web socket.io server
const io = new Server(httpServer);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    // console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send_message", (message) => {
    socket.broadcast.emit("receive_message", {
      message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left_message", users[socket.id]);
    delete users[socket.id];
  });
});

app.get("/users", (req, res) => {
  let arr = [];
  for (let i in users) {
    arr.push(users[i]);
  }
  res.send(arr.join("\n"));
});

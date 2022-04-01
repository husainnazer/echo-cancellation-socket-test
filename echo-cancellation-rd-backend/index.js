var express = require("express");
var app = express();
var server = require("http").createServer(app);
const port = process.env.PORT || 3001;
var io = require("socket.io")(server);

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  socket.on("startTalking", (data) => {
    const data1 = {
      user: data.user,
      talking: data.talking,
      volume: 10,
    };
    if (data) socket.emit("reduceVolume", data1);
    console.log(data);
  });

  socket.on("radio", function (blob) {
    // can choose to broadcast it to whoever you want
    socket.broadcast.emit("voice", blob);
    console.log(blob);
  });

  socket.emit("changeState", "gello");
});

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("<h1>Hello World</h1>");
});

server.listen(port, () => {
  console.log("Server listening at port", port);
});

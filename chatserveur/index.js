"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpserveur = (0, http_1.createServer)();
const socket = new socket_io_1.Server(httpserveur, {
    cors: {
        origin: "*"
    }
});
socket.on("connection", (data) => {
    data.on("message", data2 => {
        socket.emit("send-message", data2);
    });
});
httpserveur.listen(3001);
console.log("serveur running");
/*
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
  console.log(socket)
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`>http://${hostname}:${port}`);
    });
});
}*/ 

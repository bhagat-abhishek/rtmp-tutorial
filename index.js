import http from "http";
import express from "express";
import path from "path";
import { Server as SocketIO } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

app.use(express.static(path.resolve("./public")));

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  //   Listening for event binarystream from frontend
  socket.on("binarystream", (stream) => {
    console.log("Binary Stream:", stream);
  });
});

server.listen(3000, () => console.log("Server Listining at PORT: 3000"));

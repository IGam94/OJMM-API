import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    port: 8005,
  },
});
io.on("connection", (socket) => {
  //웹 소켓 연결 시
  const req = socket.request;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("새로운 클라이언트 접속 !!", ip, socket.id);

  socket.on("disconnect", () => {
    //연결 종료 시
    console.log("클라이언트 접속 해제", ip, socket.id);
    clearInterval(socket.interval);
  });
  socket.on("error", (error) => {
    //에러 시
    console.error("socket.io Error : ", error);
  });
  socket.on("reply", (data) => {
    //클라이언트로부터 메시지 수신 시
    console.log("클라이언트로부터 받은 메시지 : ", data);
  });
  socket.on("nuxt", (data) => {
    console.log("nuxt 웹에서 받은 메세지 : ", data);
  });
  socket.interval = setInterval(() => {
    //3초마다 클라이언트로 메시지 전송
    socket.emit("news", "Hello Socket.IO!!");
  }, 4000);
});

app.listen(process.env.PORT || 8005);

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var rooms = [];
var usernames = [];

// Serve the login page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chat Login</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .login-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        input[type="text"] {
          width: 80%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #218838;
        }
      </style>
    </head>
    <body>
      <div class="login-container">
        <h1>Login to Chat</h1>
        <input type="text" id="room" placeholder="Room" required>
        <input type="text" id="username" placeholder="Username" required>
        <button onclick="joinChat()">Join</button>
      </div>
      <script>
        function joinChat() {
          const room = document.getElementById("room").value;
          const username = document.getElementById("username").value;
          if (room && username) {
            localStorage.setItem("room", room);
            localStorage.setItem("username", username);
            window.location.href = "/chat";
          } else {
            alert("Please enter both room and username.");
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.get("/chat", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Chat Room</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          flex-direction: column;
          height: 100vh;
          margin: 0;
        }
        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        #messages {
          flex: 1;
          overflow-y: scroll;
          padding: 20px;
          background-color: #fff;
          border-bottom: 1px solid #ccc;
        }
        #input-container {
          display: flex;
          padding: 10px;
          background-color: #fff;
        }
        input[type="text"] {
          flex: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          background-color: #28a745;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #218838;
        }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <div id="messages"></div>
        <div id="input-container">
          <input type="text" id="message" placeholder="Type a message">
          <button onclick="sendMessage()">Send</button>
        </div>
      </div>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
        const room = localStorage.getItem("room");
        const username = localStorage.getItem("username");

        socket.emit("join", room, username);

        socket.on("recieve", function(message){
          const messagesDiv = document.getElementById("messages");
          const newMessage = document.createElement("div");
          newMessage.textContent = message;
          messagesDiv.appendChild(newMessage);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });

        function sendMessage() {
          const message = document.getElementById("message").value;
          socket.emit("send", message);
          document.getElementById("message").value = "";
        }
      </script>
    </body>
    </html>
  `);
});

io.on('connection', function(socket){
  socket.on("join", function(room, username){
    if (username != ""){
      rooms[socket.id] = room;
      usernames[socket.id] = username;
      socket.leaveAll();
      socket.join(room);
      io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
      socket.emit("join", room);
    }
  });

  socket.on("send", function(message){
    io.in(rooms[socket.id]).emit("recieve", usernames[socket.id] +" : " + message);
  });

  socket.on("recieve", function(message){
    socket.emit("recieve", message);
  });
});

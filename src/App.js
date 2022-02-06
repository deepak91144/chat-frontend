import React, { useState } from "react";
import io from "socket.io-client";
import "./App.css";

import { Container, Row, Col, Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Chat from "./Chat";
const socket = io.connect("https://chatbackenddee.herokuapp.com/");
const App = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [joinedUser, setJoinedUser] = useState("");

  const [showChat, setShowChat] = useState(false);
  const createRoom = () => {
    if (userName !== "" && room !== "") {
      const data = { userName: userName, room: room };
      socket.emit("joinRoom", data);
      setShowChat(true);
      socket.on("informOFJoin", (data) => {
        setJoinedUser(data.userName);
        console.log(`${data.userName} joined the chat`);
      });
    }
  };
  return (
    <>
      {showChat ? (
        <Chat
          socket={socket}
          userName={userName}
          joinedUser={joinedUser}
          room={room}
        />
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="enter name"
          />

          <input
            type="text"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
            placeholder="room id"
          />
          <Button onClick={createRoom} className="float-center">
            craete room
          </Button>
        </>
      )}
    </>
  );
};

export default App;

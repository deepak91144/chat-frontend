import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
const Chat = ({ socket, userName, room, joinedUser }) => {
  const [currentMsg, setcurrentMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessageData = async () => {
    if (room === "") {
      return alert("Please enter room name");
    }
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("sendMessage", messageData);
      setcurrentMsg("");
    }
  };
  useEffect(() => {
    socket.on("recieveMsg", (data) => {
      console.log(data);
      setMessages((preData) => {
        return [...preData, data];
      });
    });
  }, [socket]);
  return (
    <div className="mainCon">
      <div className="chatCon">
        <div className="chatBody">
          {messages.map((data) => {
            return (
              <>
                {/* {joinedUser !== "" && <p>{joinedUser} joined the chat</p>} */}
                <div id={userName === data.author ? "you" : "other"}>
                  {userName === data.author ? (
                    ""
                  ) : (
                    <span className="text-dark">{data.author}: </span>
                  )}

                  {data.message}

                  <span className="time">{data.time}</span>
                </div>
              </>
            );
          })}
        </div>
        <div className="chatFooter">
          <input
            onChange={(e) => {
              setcurrentMsg(e.target.value);
            }}
            value={currentMsg}
            style={{ width: "70%", height: "" }}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessageData();
            }}
          />
          <Button onClick={sendMessageData} className="m-2">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

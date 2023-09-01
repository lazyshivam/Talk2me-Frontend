import React, { useState, useEffect, useContext } from "react";
import ChatContext from "./ChatContext";
import userContext from "../userContext/UserContext";
import videoContext from "../videoContext/VideoContext";

const ChatState = (props) => {
  const [messageList, setMessageList] = useState([]);
  const { socket } = useContext(videoContext);
  const { userProfile } = useContext(userContext);
  const [participants,setParticipants] = useState([]);

  useEffect(() => {
    // Define the event listener for receiving messages
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
    };

    // Define the event listener for user joined
    const handleUserJoined = (data) => {
      
      setMessageList((list) => [...list, data]);
    };

     // Define the event listener for user left
    const handleLeftJoined = (data) => {
      
      setMessageList((list) => [...list, data]);
    };

    // Add the event listener for receiving messages
    socket.on("receive_message", handleReceiveMessage);

    // Add the event listener for user joined
    socket.on("user_joined", handleUserJoined);
    socket.on("user_left", handleLeftJoined);


    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user_joined", handleUserJoined);
      socket.off("user_left", handleLeftJoined);
    };
  }, [socket]);

  const sendMessage = (messageData) => {
    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
  };
  
  
   
  return (
    <ChatContext.Provider value={{ sendMessage, messageList, participants }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;

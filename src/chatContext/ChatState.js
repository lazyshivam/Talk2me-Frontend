import React, { useState, useEffect, useContext} from "react";
import ChatContext from "./ChatContext";
import { messages } from "../data/message";
import userContext from "../userContext/UserContext";
const { io } = require("socket.io-client");

const ChatState = (props) => {
 
 
   const [socket,setSocket]=useState(null);
  const [messageList, setMessageList] = useState([]);
  const [participants,setParticipants]=useState([]);
  

//// eslint-disable-next-line

const {user}=useContext(userContext);


useEffect(() => {  
  const newSocket = io('http://localhost:8080');
  setSocket(newSocket);
  newSocket.emit("new-user-joined", {name: user.name, email: user.email});
  newSocket.on("user-joined",(data)=>{
      console.log(data);
      for (const key in data) {
        setParticipants((list) => [...list, data[key]]);
      }
      
    // }
 }) 
 newSocket.on('receive_message', (data)=>{
   setMessageList((list) => [...list, data]);
  });
  
  setMessageList(messages);
  
  return () => newSocket.disconnect();
}, [user]);

// eslint-disable-next-line

   

    const sendMessage = (messageData) => {
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);

    };

  

  return (
    <ChatContext.Provider value={{ sendMessage, messageList,participants}}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;

import React, { useState, useContext, useEffect } from "react";
import { useSocket } from "./SocketProvider";
import moment from "moment";

const ChatAppContext = React.createContext();

export function useChatApp() {
  return useContext(ChatAppContext);
}

export default function ChatAppProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();

  function sendMessage({ message }) {
    socket.emit("send-message", { message });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        fromMe: true,
        message,
        time: moment().format("HH:mm"),
      },
    ]);
  }

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on("recieve-message", ({ from, message, fromBot }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          fromBot,
          from,
          message,
          time: moment().format("HH:mm"),
        },
      ]);
    });
    return () => socket.off("recieve-message");
  }, [socket]);

  const value = {
    messages,
    sendMessage,
  };
  return <ChatAppContext.Provider value={value}>{children}</ChatAppContext.Provider>;
}

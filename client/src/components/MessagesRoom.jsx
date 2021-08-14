import React from "react";
import Message from "./Message";
import { useChatApp } from "../context/ChatAppProvider";

export default function MessagesRoom() {
  const { messages } = useChatApp();
  return (
    <div className="messages-room">
      {messages.map(({ from, fromBot, fromMe, message, time }, index) => (
        <Message key={index} from={from} fromMe={fromMe} fromBot={fromBot} message={message} time={time} />
      ))}
    </div>
  );
}

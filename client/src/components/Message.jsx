import React from "react";

export default function Message({ from, fromBot, fromMe, message, time }) {
  return (
    <div className={"message-place" + (fromMe ? " from-me" : "") + (fromBot ? " from-bot" : "")}>
      <div className="message-box">
        <div className="sender">{from}</div>
        <p className="message">{message}</p>
        {!fromBot && <span className="time">{time}</span>}
      </div>
    </div>
  );
}

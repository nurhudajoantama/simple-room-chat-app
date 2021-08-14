import React, { useState, useRef } from "react";
import { useChatApp } from "../context/ChatAppProvider";

export default function FormMessage() {
  const { sendMessage } = useChatApp();

  const [inputMessage, setInputMessage] = useState("");
  const inputText = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    if (inputMessage === "") {
      return;
    }
    sendMessage({ message: inputMessage });
    setInputMessage("");
    inputText.current.focus();
  }
  return (
    <div className="form-message">
      <form onSubmit={handleSubmit}>
        <input ref={inputText} value={inputMessage} onChange={(event) => setInputMessage(event.target.value)} type="text" autoComplete="off" required />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

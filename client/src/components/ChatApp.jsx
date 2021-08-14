import React from "react";
import { useUser } from "../context/UserProvider";
import ChatAppProvider from "../context/ChatAppProvider";
import Dashboard from "./Dashboard";

export default function ChatApp() {
  const { userId } = useUser();
  return (
    userId !== "" && (
      <ChatAppProvider>
        <Dashboard />
      </ChatAppProvider>
    )
  );
}

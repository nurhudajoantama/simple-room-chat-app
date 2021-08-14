import React from "react";
import { useUser } from "../context/UserProvider";
import SocketProvider from "../context/SocketProvider";
import Login from "./Login";
import ChatApp from "./ChatApp";

export default function UserCheck() {
  const { nickname, room } = useUser();
  return (nickname !== "") & (room !== "") ? (
    <SocketProvider>
      <ChatApp />
    </SocketProvider>
  ) : (
    <Login />
  );
}

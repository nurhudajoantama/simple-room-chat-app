import React, { useContext, useState, useEffect } from "react";
import { useUser } from "./UserProvider";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [socketConnectError, setSocketConnectError] = useState(false);
  const [socketReconnect, setSocketReconnect] = useState(false);
  const { nickname, room, setUserId } = useUser();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io({ query: { nickname, room } });
    setSocket(newSocket);
    newSocket.on("connect_error", () => {
      setSocketConnectError(true);
    });
    newSocket.on("connect", () => {
      setSocketConnectError(false);
    });
    newSocket.io.on("reconnect_attempt", () => {
      setSocketReconnect(true);
    });
    newSocket.io.on("reconnect", () => {
      setSocketReconnect(false);
    });
    newSocket.io.on("reconnect_failed", () => {
      setSocketReconnect(false);
    });
    newSocket.on("user-id", ({ id }) => setUserId(id));
    newSocket.on("room-users", (value) => {
      setRoomUsers(value.roomUsers);
    });

    return () => {
      newSocket.off("user-id");
      newSocket.off("room-users");
      newSocket.close();
    };
  }, [nickname, room, setUserId, setRoomUsers]);

  const value = { socket, roomUsers };
  return (
    <SocketContext.Provider value={value}>
      {socketConnectError && (
        <>
          <div className="modal-error">
            <div>Can't Access Server</div>
            {socketReconnect && <div>Reconnecting . . .</div>}
          </div>
        </>
      )}
      {children}
    </SocketContext.Provider>
  );
}

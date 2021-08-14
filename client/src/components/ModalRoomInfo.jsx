import React from "react";
import { useSocket } from "../context/SocketProvider";
import { useUser } from "../context/UserProvider";

export default function ModalRoomInfo({ show }) {
  const { room, userId } = useUser();
  const { roomUsers } = useSocket();

  return (
    <div className={"modal-room-info" + (show ? " show-modal" : "")}>
      <div>
        <h5>Room</h5>
        <span>{room}</span>
        <h5>Users</h5>
        <ul>
          {roomUsers.map((user) => (
            <li key={user.id}>
              {user.nickname} {user.id === userId && <span>me</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

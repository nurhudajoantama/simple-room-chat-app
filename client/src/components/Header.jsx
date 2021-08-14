import React, { useState } from "react";
import { useUser } from "../context/UserProvider";
import ModalRoomInfo from "./ModalRoomInfo";

export default function Header() {
  const { nickname, room, setRoom, setNickname, setUserId } = useUser();
  const maxStrRoom = 50;

  const [showModalRoomInfo, setShowModalRoomInfo] = useState(false);

  function handleLogoutClick(event) {
    event.preventDefault();
    setRoom("");
    setNickname("");
    setUserId("");
  }

  function handleRoomClick() {
    setShowModalRoomInfo((prevShowModalRoomInfo) => !prevShowModalRoomInfo);
  }

  return (
    <div className="header">
      <div className="header-user">
        <div className="user-info">
          <div className="name">{nickname}</div>
          <div className="room" onClick={handleRoomClick}>
            {room.length > maxStrRoom ? room.substring(0, maxStrRoom) + " . . ." : room}
          </div>
        </div>
        <div>
          <button type="button" onClick={handleLogoutClick}>
            logout
          </button>
        </div>
      </div>
      <ModalRoomInfo show={showModalRoomInfo} />
    </div>
  );
}

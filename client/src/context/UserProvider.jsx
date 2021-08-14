import React, { useContext, useState } from "react";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  const value = {
    userId,
    setUserId,
    nickname,
    setNickname,
    room,
    setRoom,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

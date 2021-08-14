import React from "react";
import UserProvider from "../context/UserProvider";
import UserCheck from "./UserCheck";

export default function App() {
  return (
    <div className="app">
      <UserProvider>
        <UserCheck />
      </UserProvider>
    </div>
  );
}

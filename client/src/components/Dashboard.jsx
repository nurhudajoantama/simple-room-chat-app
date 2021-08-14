import React from "react";
import FormMessage from "./FormMessage";
import Header from "./Header";
import MessagesRoom from "./MessagesRoom";

export default function Dashboard() {
  return (
    <div className="container">
      <Header />
      <MessagesRoom />
      <FormMessage />
    </div>
  );
}

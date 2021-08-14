import React, { useRef, useState } from "react";
import { useUser } from "../context/UserProvider";

export default function Login() {
  const { setNickname, setRoom } = useUser();
  const [nicknameError, setNicknameError] = useState(false);
  const inputNickname = useRef(null);
  const inputRoom = useRef(null);
  function handleSubmit(event) {
    event.preventDefault();
    if (inputNickname.current.value.length > 25) {
      setNicknameError(true);
      return;
    }
    setNickname(inputNickname.current.value);
    setRoom(inputRoom.current.value);
  }
  return (
    <div className="container login">
      <div className="title">Simple Room-Chat App</div>
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="group-form">
          <label htmlFor="nickname">nickname</label>
          <input ref={inputNickname} onChange={() => setNicknameError(false)} className={nicknameError ? "nickname-error" : ""} type="text" id="nickname" autoComplete="off" required />
          {nicknameError && <div style={{ color: "red" }}>nickname length must less than 20 character</div>}
        </div>
        <div className="group-form">
          <label htmlFor="room">room</label>
          <input ref={inputRoom} type="text" id="room" autoComplete="off" required />
        </div>
        <div className="group-form">
          <button type="submit" className="login-button">
            Join
          </button>
        </div>
      </form>
      <div className="footer">by Nurhuda Joantama Putra</div>
    </div>
  );
}

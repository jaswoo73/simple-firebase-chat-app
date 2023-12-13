import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import ThemeSwitcher from "./components/ThemeSwitcher";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="App">
      {room ? (
        <Chat room={room} setRoom={setRoom} />
      ) : (
        <form>
          <div className="input-wrapper">
            {/* Using ref here instead of onChange to avoid render the moment a room number digit is key in */}
            <input
              className="form-input"
              ref={roomInputRef}
              placeholder="Enter room name"
            />
            <label className="form-label">Enter Room Name</label>
          </div>
          <button
            className="enter-chat-btn btn"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </form>
      )}
      <div className="sign-out">
        <button
          className="btn sign-out-btn"
          title="Sign Out"
          onClick={signUserOut}
        >
          <ArrowLeftOnRectangleIcon width={24} height={24} />
        </button>
      </div>
      <ThemeSwitcher />
    </div>
  );
}

export default App;

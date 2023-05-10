import './App.css';
import React, { useEffect, useState } from "react"

import io from "socket.io-client"
import Chat from './Chat';

const socket = io.connect("http://localhost:8000")

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">

      

      {!showChat ? (

        <div className="joinChatContainer">

          <h3>Join A Chat</h3>
          <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Room ID (ex : 1234)..." onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join the Rooom</button>
        </div>

      ) : (
        <div>
          <h1>{username}</h1>
        <Chat socket={socket} username={username} room={room} />
        </div>
      )}

    </div>
  );
}

export default App;

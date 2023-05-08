import './App.css';
import React, { useState } from "react"

import io from "socket.io-client"
import Chat from './Chat';

const socket = io.connect("http://localhost:8000")

function App() {

  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("joinRoom", room)
    }
  }
  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="John..." onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join the Rooom</button>


      <Chat socket={socket} username={username} room={room}/>
    </div>
  );
}

export default App;

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

        <div className='chatMain'>

          <div className="details">
            <h4>How to use this app?</h4>
            <span>1. Enter Your Name</span>
            <span>2. Enter some Room ID</span>
            <span>3. Give your Friend the same Room ID</span>
          
          </div>

        <div className="joinChatContainer">

          <h3>Join a <span>CHAT</span></h3>
          <input type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Room ID (ex : 1234)..." onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join the Rooom</button>
        </div>
        </div>

      ) : (
        <div>
          <h1>Welcome to the room - <span style={{ color: "yellow" ,textTransform: "uppercase"}}>{username}</span></h1>
          <h2>Room ID - <span style={{ color: "yellow" }}>{room}</span></h2>
        <Chat socket={socket} username={username} room={room} />
        </div>
      )}

    </div>
  );
}

export default App;

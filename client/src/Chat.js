import React, { useState } from 'react'

const Chat = ({socket, username, room}) => {
    const [currentmessage, setCurrentMessage] = useState("")


    const sendMessage = async () => {
        if(currentmessage !== ""){
            const messgaeDate = {
                room: room,
                author: username,
                message : currentmessage,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }


            await socket.emit("sendMessage", messgaeDate)
        }
    }
  return (
    <div>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input 
                type="text" 
                placeholder='Hey...'
                onChange={(event) => {setCurrentMessage(event.target.value)}}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  ) 
}

export default Chat
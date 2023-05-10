const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin : "http://localhost:3001",
        methods: ["GET", "POST"] 
        // all this is to resolve the CORS issue that might come with the socket.io
    }
})


io.on("connection", (socket) => {
    console.log( `user connected ${socket.id}`)


    socket.on("send_message", (data) => {
        // console.log(data)
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("joinRoom", (data) => {
        socket.join(data)
        console.log(`user with id ${socket.id} joined room ${data}`)
    })

    socket.on("disconnect", () => {
        console.log(`user disconnected ${socket.id}`)
    })
})



server.listen(8000, () => {
    console.log(`server running at port ${8000}`)
})
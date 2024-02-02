const express = require("express");
const cors = require("cors");
const connectToDb = require("./Db/Db");
const UserRoutes = require("./routes/UserRoute");
const { app, io, server } = require("./server/server");

app.use(cors());
app.use(express.json());

// socket.broadcast.emit - All but the sender
// io.emit - to all

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`); 

  socket.on("new_user_registered",async (data) => { 
    io.emit("added_user",data)
  });

  socket.on("user_login_global",async (data) => {  
    io.emit("user_logged_global",data)
  });
 

  socket.on("logout_user_global",async(data)=>{  
    io.emit("user_logged_out_global",data)
  })

  socket.on("disconnect", (data) => { 
    console.log(`User disconnected : ${socket.id}`);
  });
});

app.use("/api/user", UserRoutes);

const port = 3001;
server.listen(port, () => {
  console.log(`Server served at http://localhost:${port}`);
});

connectToDb();

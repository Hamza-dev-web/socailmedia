import { createServer } from "http";
import { Server } from "socket.io";

const httpserveur = createServer()
const socket = new Server(httpserveur ,{
  cors :{
    origin :"*"
  }
})


socket.on("connection" ,(data )=>{
  data.on("message" , data2 =>{
  
    socket.emit("send-message" ,data2)
  }
  )
})
httpserveur.listen(3001 )
console.log("serveur running")




/*
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
  console.log(socket)
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`>http://${hostname}:${port}`);
    });
});
}*/
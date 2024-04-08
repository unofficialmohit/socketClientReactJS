import React from 'react'
import io from "socket.io-client";
const socket=io.connect("http://localhost:3001");
function App() {
  const[room,setRoom]=React.useState('');
  const[message,setMessage]=React.useState('');
  const[messageRecieved,setMessageRecieved]=React.useState('');
  const joinRoom=()=>{
    if(room!==""){
      socket.emit("join_room",room);
    }
  }
  const sendMessage=()=>{
    socket.emit("send_message",{message,room});
  }
  React.useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setMessageRecieved(data.message);
    })
  },[socket]);
  return (
<div>
     <div>Socket</div>
     <input type='text' onChange={(e)=>{
      setRoom(e.target.value)}} placeholder='Enter Room Number'/>
    <button type='button' onClick={joinRoom}>Join Room</button>  
    <input type='text' onChange={(e)=>{
      setMessage(e.target.value)}} placeholder='Enter Message'/>
  <button onClick={sendMessage} >Send</button>
  <h1>Message : {messageRecieved}</h1>
  </div>
  )
}
export default App
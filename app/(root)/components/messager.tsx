"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import {GetUserDetails, getUsers} from "@/lib/action/user.action";
import { CreateMessages, getAllMessage } from "@/lib/action/messages.action";
export const Messager =({user , userToTalkWith} :{user :any ,userToTalkWith :any })=>{
    const [message , setMessages] = useState("")
const [allmessages , setallmessages] =useState([])
const socket = io("http://localhost:3001/" ,{autoConnect :false});
/*
const {user} = useUser()
console.log(user?.emailAddresses)
useEffect(()=>{
  async function start() {
    if(user?.emailAddresses[0].emailAddress != undefined) {
      const userdb = await getUsers(user?.emailAddresses[0].emailAddress)
      console.log(userdb ,user?.emailAddresses[0].emailAddress as string)
      if(userdb)   setuserdb(userdb.documents[0] as any )
    }
  }
  start()
} ,[user])
 */
useEffect(() => {
  async function onConnect() {
    socket.connect()
  socket.on("send-message", (data :any) => {
    // that for how the socket.io work
  });
   }
   onConnect()
},[])

  useEffect(()=>{
    const getUser =async() =>{
      console.log(user.$id , userToTalkWith.$id)
      if(user.$id == undefined) return
      const message = await getAllMessage(user.$id as string)
      console.log(message)
      if(message && message.length > 0) {
        message.map((msg :any) =>{
          setMessages(msg.msg as any)
        })      }
         setMessages("")
          }
          getUser()
  },[allmessages])

  function handleSend (){
    socket.connect()
      socket.emit("message", message)
     setMessages("")
  }
  return (
    <main className=" sm:w-screen hidden  md:flex sm:ml-0 sm:flex  xl:w-[670px]    lg:flex  flex-col  rounded-md   items-center   w-[1200px]  h-full   bg-slate-100 shadow-xl ">
<div className=" justify-end    flex-col flex w-[600px] h-[700px] mr-[600px]  mt-[550px] bottom-0  md:ml-[580px] ">
<div className="  gap-3 items-center  flex w-[600px] h-[100px] rounded-xl  bg-purple-400">
<img 
src={userToTalkWith && userToTalkWith.image}
alt=""
width={30}
height={30}
className=" rounded-full"
/>
<p>{userToTalkWith.name}</p>
</div>
    <Card >
        <div className=" flex  justify-between   gap-2 items-center "> 
<div className=" ml-2 flex w-[300px] flex-col">
{
  user&&
  
  user?.message?.length >0 && user.message.map((msg :any) =>(
  <div key={msg} className=" flex flex-col  justify-start  gap-2 mt-5  w-auto ">
  <div className="  gap-3 items-center   flex w-[150px] h-[30px] rounded-xl  bg-gray-400">
  <img 
  src={user?.imageUrl && user.imageUrl as string}
  alt=""
  width={30}
  height={30}
  className=" rounded-full"
  />
  <p>{user?.username }</p>
  </div>
  <div className="flex ">
  <p>{msg.message && msg.message}</p>
  </div>
  </div>
  
  )) }
</div>
<div className=" flex w-[300px] flex-col ml-[250px]  mb-32">
{
  userToTalkWith &&
  userToTalkWith?.message?.length >0 && userToTalkWith.message.map((msg :any) =>(
  <div key={msg} className=" flex flex-col   justify-end   gap-2 mt-5  w-auto ">
  <div className="  gap-3 items-center   flex w-[150px] h-[30px] rounded-xl  bg-purple-400">
  <img 
  src={userToTalkWith?.image && userToTalkWith.image as string}
  alt=""
  width={30}
  height={30}
  className=" rounded-full"
  />
  <p>{userToTalkWith?.name }</p>
  </div>
  <div className="flex ">
  <p>{msg.message && msg.message}</p>
  </div>
  </div>
  
  )) }


</div>


        </div>
    <div className=" flex w-[580px] justify-between gap-2 mt-[500px]  ">
    <Input placeholder="Text" className=" w-[500px]" value={message} onChange={(e) => setMessages(e.target.value )}/>
    <Button  onClick={async()=> await CreateMessages({userId :user.$id as string ,ReciverId :userToTalkWith.$id, message :message})} className=" gap-3">
    <Image 
    src="/send.png"
    alt=""
    width={30}
    height={30}
    />
    Send
   </Button>
    </div>
</Card>
    </div>

    </main>

  );
}
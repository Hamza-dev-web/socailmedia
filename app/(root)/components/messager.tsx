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
//const [allmessages , setallmessages] =useState([])
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
          }
          getUser()
  },[CreateMessages])
  function handleSend (){
    socket.connect()
      socket.emit("message", message)
     setMessages("")
  }
  return (
<main className="w-full h-screen flex items-center justify-center bg-slate-100">
  <div className="hidden md:flex flex-col w-full max-w-3xl h-[700px] bg-white shadow-xl rounded-md overflow-hidden">

    {/* HEADER */}
    <div className="flex items-center gap-3 p-4 bg-purple-400 text-white">
      <img
        src={userToTalkWith?.image}
        alt=""
        width={35}
        height={35}
        className="rounded-full"
      />
      <p className="font-semibold text-lg">{userToTalkWith?.name}</p>
    </div>

    {/* MESSAGES AREA */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">

      {/* YOUR MESSAGES (Left) */}
      {user?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex items-start gap-2 w-full">
          <img
            src={user?.image}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <div className="bg-gray-200 p-3 rounded-xl max-w-[250px]">
              <p>{msg.message}</p>
            </div>
          </div>
        </div>
      ))}

      {/* OTHER USER MESSAGES (Right) */}
      {userToTalkWith?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex items-start gap-2 w-full justify-end">
          <div>
            <p className="text-sm font-semibold text-right">{userToTalkWith?.name}</p>
            <div className="bg-purple-400 text-white p-3 rounded-xl max-w-[250px]">
              <p>{msg.message}</p>
            </div>
          </div>
          <img
            src={userToTalkWith?.image}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      ))}

    </div>

    {/* MESSAGE INPUT */}
    <div className="p-4 flex gap-3 bg-white border-t">
      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={message}
        onChange={(e) => setMessages(e.target.value)}
      />
      <Button
        onClick={async () => {
          await CreateMessages({
            userId: user.$id as string,
            ReciverId: userToTalkWith.$id,
            message: message
          });
          setMessages("");
        }}
        className="flex gap-2 items-center"
      >
        <img src="/send.png" width={25} height={25} />
        Send
      </Button>
    </div>
  </div>

  {/* MOBILE VERSION */}
  <div className="md:hidden flex flex-col w-full h-full bg-white">
    <div className="flex items-center gap-3 p-3 bg-purple-400 text-white">
      <img
        src={userToTalkWith?.image}
        width={30}
        height={30}
        className="rounded-full"
      />
      <p>{userToTalkWith?.name}</p>
    </div>

    <div className="flex-1 p-3 overflow-y-auto space-y-4">
      {/** Same pattern but full width on mobile */}
      {user?.message?.map((msg: any, i: number) => (
        <div key={i} className="w-full">
          <div className="bg-gray-200 p-3 rounded-xl w-fit max-w-[80%]">
            {msg.message}
          </div>
        </div>
      ))}

      {userToTalkWith?.message?.map((msg: any, i: number) => (
        <div key={i} className="w-full flex justify-end">
          <div className="bg-purple-400 text-white p-3 rounded-xl max-w-[80%]">
            {msg.message}
          </div>
        </div>
      ))}
    </div>

    <div className="flex p-3 gap-2 border-t">
      <Input
        placeholder="Type..."
        className="flex-1"
        value={message}
        onChange={(e) => setMessages(e.target.value)}
      />
      <Button
        onClick={async () => {
          await CreateMessages({
            userId: user.$id,
            ReciverId: userToTalkWith.$id,
            message: message
          });
          setMessages("");
        }}
      >
        Send
      </Button>
    </div>
  </div>
</main>


  );
}
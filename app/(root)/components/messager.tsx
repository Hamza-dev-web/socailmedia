"use client"
import { useEffect, useState , useRef } from "react";
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
import { CreateMessages, getAllMessage } from "@/lib/action/messages.action";
export const Messager =({user , userToTalkWith , messages } :{user :any ,userToTalkWith :any , messages :any })=>{
    const [message , setMessages] = useState("")
    /*
    const [mt , setmt] =useState(0)
useEffect(() => {
  setmt((prev) => prev +100)

},[user , userToTalkWith]);
*/
  return (
<main className="w-full h-[700px] flex items-center justify-center bg-slate-100 overflow-auto">

  {/* DESKTOP CHAT BOX */}
  <div className="hidden md:flex flex-col w-full max-w-3xl h-[700px] bg-white rounded-lg shadow-xl overflow-hidden">

    {/* HEADER */}
    <div className="flex items-center gap-3 p-4 bg-[#8a63d2] text-white shadow-md">
      <img
        src={userToTalkWith?.image}
        className="w-10 h-10 rounded-full"
      />
      <p className="text-lg font-semibold">{userToTalkWith?.name}</p>
    </div>
<div 
  className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 bg-[#f1f2f6]"
>

  {/* Your messages */}
  {messages && messages?.map((msg: any, i: number) => (
    <>
      {user.$id == msg.CurrentUserId ? (
       <div key={i} className={`flex items-end gap-2 max-w-[70%] `}>
       <img src={user?.image} className="w-8 h-8 rounded-full" />
        <div className="relative bg-white p-3 rounded-2xl shadow-sm border">
        <div className="absolute -left-2 bottom-0 w-0 h-0 
          border-t-[10px] border-t-white
          border-r-[10px] border-r-transparent"></div>
        <p>{msg.message}</p>
         </div>
       </div>
     
      ) :(
        <div key={i} className={`flex justify-end items-end gap-2 max-w-[70%] ml-auto  `}>
      <div className="relative bg-[#0084ff] text-white p-3 rounded-2xl shadow-md">
        <div className="absolute -right-2 bottom-0 w-0 h-0 
          border-t-[10px] border-t-[#0084ff]
          border-l-[10px] border-l-transparent"></div>
        <p>{msg.message}</p>
      </div>
      <img 
      src={userToTalkWith?.image} 
      className="w-8 h-8 rounded-full" />
    </div>
      )}
    </>
  ))}

  {/* Other user */}
  { /*
  userToTalkWith?.message?.map((msg: any, i: number) => (
    <div key={i} className={`flex justify-end items-end gap-2 max-w-[70%] ml-auto  `}>
      <div className="relative bg-[#0084ff] text-white p-3 rounded-2xl shadow-md">
        <div className="absolute -right-2 bottom-0 w-0 h-0 
          border-t-[10px] border-t-[#0084ff]
          border-l-[10px] border-l-transparent"></div>
        <p>{msg.message}</p>
      </div>
      <img 
      src={userToTalkWith?.image} 
      className="w-8 h-8 rounded-full" />
    </div>
  )) */}

</div>


    {/* INPUT AREA */}
    <div className="p-4 flex items-center gap-3 bg-white border-t">

      <Input
        placeholder="Type a message..."
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
          setTimeout(()=>{     
  setMessages("");
window.location.reload()
},1000)

        }}
        className="flex items-center gap-2 bg-[#8a63d2] hover:bg-[#734fba] text-white"
      >
        <img src="/send.png" className="w-5 h-5" />
        Send
      </Button>
    </div>
  </div>

  {/* MOBILE UI */}
  <div className="md:hidden flex flex-col w-full h-full bg-white">

    {/* Header */}
    <div className="flex items-center gap-3 p-3 bg-[#8a63d2] text-white">
      <img
        src={userToTalkWith?.image}
        className="w-8 h-8 rounded-full"
      />
      <p className="font-semibold">{userToTalkWith?.name}</p>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f1f2f6]">
      {user?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex items-start gap-2 max-w-[80%]">
          <div className="bg-white p-3 rounded-2xl border shadow">
            {msg.message}
          </div>
        </div>
      ))}

      {userToTalkWith?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex justify-end max-w-[80%] ml-auto">
          <div className="bg-[#0084ff] text-white p-3 rounded-2xl shadow">
            {msg.message}
          </div>
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="flex p-3 gap-2 border-t bg-white">
      <Input
        placeholder="Type a message..."
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
        className="bg-[#8a63d2] text-white hover:bg-[#6c4baa]"
      >
        Send
      </Button>
    </div>
  </div>

</main>



  );
}

{/*
     MESSAGES 
    <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#f1f2f6]">

     USER MESSAGES (LEFT) 
      {user?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex items-end gap-2 max-w-[70%]">

          <img
            src={user?.image}
            className="w-8 h-8 rounded-full"
          />

          <div className="relative bg-white p-3 rounded-2xl shadow-sm border">

             Tail 
            <div className="absolute -left-2 bottom-0 w-0 h-0 
              border-t-[10px] border-t-white
              border-r-[10px] border-r-transparent">
            </div>

            <p className="text-gray-900">{msg.message}</p>
          </div>
        </div>
      ))}

     OTHER USER MESSAGES (RIGHT) 
      {userToTalkWith?.message?.map((msg: any, i: number) => (
        <div key={i} className="flex justify-end items-end gap-2 max-w-[70%] ml-auto">

          <div className="relative bg-[#0084ff] text-white p-3 rounded-2xl shadow-md">

           Tail 
            <div className="absolute -right-2 bottom-0 w-0 h-0 
              border-t-[10px] border-t-[#0084ff]
              border-l-[10px] border-l-transparent">
            </div>

            <p>{msg.message}</p>
          </div>

          <img
            src={userToTalkWith?.image}
            className="w-8 h-8 rounded-full"
          />
        </div>
      ))}

    </div>
*/}
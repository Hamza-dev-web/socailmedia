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
    const [allMessage , setAllMessage] = useState([]) 
   useEffect(()=>{
const Recall = async ()=>{
 try {
  const am = await getAllMessage(user.$id , userToTalkWith.$id) 
setAllMessage(am)
 } catch (err :any ) {
console.log(err)
 } 
} 
Recall()
   },[messages])

  return (
<main className="w-full h-screen flex items-center justify-center bg-slate-100">

  <div className="flex flex-col w-full h-full md:max-w-3xl md:h-[700px] bg-white rounded-none md:rounded-lg shadow-xl overflow-hidden">

    {/* HEADER */}
    <div className="flex items-center gap-3 p-4 bg-[#8a63d2] text-white shadow-md">
      <img
        src={userToTalkWith?.image}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full"
      />
      <p className="text-lg font-semibold">{userToTalkWith?.name}</p>
    </div>

    {/* CHAT AREA — ONE UI FOR ALL DEVICES */}
    <div className="
      flex-1 flex flex-col gap-4
      overflow-y-auto
      px-3 py-3 
      bg-[#f1f2f6]
      md:px-5 md:py-5
    ">

      {allMessage?.map((msg: any, i: number) => (
        <div key={i}>

          {user.$id === msg.CurrentUserId ? (

            /* ---------- USER MESSAGE (LEFT) ---------- */
            <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
              
              <img 
                src={user?.image}
                className="w-7 h-7 md:w-9 md:h-9 rounded-full"
              />

              <div className="relative bg-white p-3 md:p-4 rounded-2xl shadow-md border">
                <div 
                  className="absolute -left-2 md:-left-3 bottom-1 w-0 h-0 
                  border-t-[10px] md:border-t-[12px]
                  border-t-white
                  border-r-[10px] md:border-r-[12px] border-r-transparent"
                />
                <p className="text-sm md:text-base">{msg.message}</p>
              </div>

            </div>

          ) : (

            /* ---------- OTHER USER MESSAGE (RIGHT) ---------- */
            <div className="flex items-end justify-end gap-2 max-w-[85%] md:max-w-[70%] ml-auto">

              <div className="relative bg-[#0084ff] text-white p-3 md:p-4 rounded-2xl shadow-md">
                <div 
                  className="absolute -right-2 md:-right-3 bottom-1 w-0 h-0 
                  border-t-[10px] md:border-t-[12px]
                  border-t-[#0084ff]
                  border-l-[10px] md:border-l-[12px] border-l-transparent"
                />
                <p className="text-sm md:text-base">{msg.message}</p>
              </div>

              <img 
                src={userToTalkWith?.image}
                className="w-7 h-7 md:w-9 md:h-9 rounded-full"
              />

            </div>

          )}

        </div>
      ))}

    </div>

    {/* INPUT AREA (ONE VERSION FOR ALL DEVICES) */}
    <div className="p-3 md:p-4 flex items-center gap-3 bg-white border-t">

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

          const am = await getAllMessage(user.$id, userToTalkWith.$id);
          setAllMessage(am);
        }}
        className="flex items-center gap-2 bg-[#8a63d2] hover:bg-[#734fba] text-white"
      >
        <img src="/send.png" className="w-5 h-5" />
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

{
<div 
  className="flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4 flex flex-col gap-4 bg-[#f1f2f6]"
>

  {/* Your messages */}
  {
  /*messages && allMessage && allMessage?.map((msg: any, i: number) => (
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
        <div key={i} className={`flex justify-end items-end gap-2 max-w-[70%] ml-auto sm:ml-auto  `}>
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
  ))
  {messages && allMessage && allMessage.map((msg: any, i: number) => (
  <div key={i}>
    {user.$id === msg.CurrentUserId ? (
      
      /* ================= USER MESSAGE (LEFT) ================= 
      <div 
        className="
          flex items-end gap-2
          max-w-[85%] sm:max-w-[70%]    /* mobile wider, desktop tighter 
        "
      >
        <img 
          src={user?.image} 
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        />

        <div className="relative bg-white p-3 sm:p-4 rounded-2xl shadow-sm border">
          <div 
            className="
              absolute 
              -left-2 bottom-0 
              w-0 h-0 
              border-t-[10px] border-t-white
              border-r-[10px] border-r-transparent
            "
          ></div>
          <p className="text-sm sm:text-base">{msg.message}</p>
        </div>
      </div>

    ) : (

      /* ================= OTHER PERSON MESSAGE (RIGHT) ================= 
      <div 
        className="
          flex justify-end items-end gap-2
          max-w-[85%] sm:max-w-[70%] 
          ml-auto
        "
      >
        <div className="relative bg-[#0084ff] text-white p-3 sm:p-4 rounded-2xl shadow-md">
          <div 
            className="
              absolute 
              -right-2 bottom-0 
              w-0 h-0 
              border-t-[10px] border-t-[#0084ff]
              border-l-[10px] border-l-transparent
            "
          ></div>
          <p className="text-sm sm:text-base">{msg.message}</p>
        </div>

        <img 
          src={userToTalkWith?.image} 
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        />
      </div>
    )}
  </div>
))}


</div>
  






*/}
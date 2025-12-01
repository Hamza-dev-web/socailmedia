"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleTheComments } from "@/lib/action/notification&Comments.action";
import { useEffect, useState } from "react";
export function Comments ({idPost , username} :{idPost :string , username :string}){
    console.log(idPost)
    const [comments , setComments] = useState("")
    const [disabled , setDisabled] = useState(true)
const HandleTheComment =async ()=>{
    if(comments != "" ){
        setDisabled(false)
        await handleTheComments(idPost , comments , username)
    }
    setDisabled(true)
    setComments("")
}
useEffect(()=>{
    if(comments !== ""){
        setDisabled(false)
    }
    else {
        setDisabled(true)
    }
} ,[comments])
     
    return (
        <div className=" flex justify-center">
   <div className="  w-[400px]  justify-between    flex   gap-12 items-center ">
        <Input  className=" w-[300px] rounded-lg p-4"  placeholder=" Enter your Commnets" value={comments} onChange={(e) => setComments(e.target.value)}/>
        <Button disabled={disabled} className="  font-semibold text-[20px] bg-fuchsia-300 hover:bg-green-400 " onClick={ async()=> await HandleTheComment()}>Post</Button>
        </div>

        </div>
     
        
    )
}
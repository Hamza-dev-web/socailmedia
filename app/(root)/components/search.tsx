"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { GetSearchedUsers } from "@/lib/action/user.action"
export const Search =()=>{
    const [search , setSearch] =useState("")
    const router = useRouter()
    return (
        <div className=" flex justify-between gap-96">
   <img 
   src="/p.png"
   alt=""
   width={90}
   height={30}
   className=" rounded-full ml-28 mt-4"
   
   />
    <div className=" flex gap-2 mr-5 items-center justify-end  mb-16">
            <Input className="  rounded-xl w-[150px]  h-[40px] mt-5 ml-4 text-black "  value={search} placeholder="Search" onChange={(e)=>setSearch(e.target.value)} />
        <Image 
        src="/search.png"
        width={25}
        height={25}
        className=" rounded-xl p mt-6"
        alt=""
        onClick={ ()=>  {

        } }
        />
        
        </div>


        </div>
    
    
    )
}

"use client"
import { HandleThefollow } from "@/lib/action/frends.action"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
export const UserCard =({users , useremail , sessionuser} :{users :{$id :string ,name: string , email :string , image :string, status: string , index:number  },sessionuser :any  , useremail : string})=>{
 const [sending , setSending] =useState('Follow')
 const router = useRouter()
 const [disble , setDisable] = useState(false)
 console.log("users" , sessionuser )
return (
<div className="flex flex-col items-center w-full mt-3" key={users.$id}>
  <div className="flex justify-between items-center bg-slate-200 w-full max-w-[1200px] px-4 py-3 rounded-xl mt-6">
    
    {/* Left: User Info */}
    <div
      className="flex gap-3 items-center cursor-pointer"
      onClick={() => router.push(`/${users.$id}/user`)}
    >
      <img
        src={users.image}
        alt=""
        className="rounded-full"
        width={30}
        height={30}
      />
      <p className="font-black">{users.name}</p>
    </div>

    {/* Right: Actions */}
    <div className="flex gap-4 items-center">
      {/* Message Link */}
      <Link
        href={`${users.index}/messages`}
        className="flex gap-2 items-center bg-blue-500 text-white rounded-3xl px-4 py-2 font-extrabold hover:bg-blue-600"
      >
        <Image
          src="/mes.png"
          alt=""
          className="rounded-full"
          width={30}
          height={30}
        />
        Message
      </Link>

      {/* Follow Button */}
      <div
        className="flex gap-2 items-center p-2 rounded-2xl bg-red-500 hover:bg-purple-500 cursor-pointer"
      
      >
        <button className="font-bold text-white"    
        onClick={async () => {
          const status = await HandleThefollow(
      sessionuser.documents[0].index,
       sessionuser.documents[0].image,
     users.$id,
     sessionuser.documents[0].$id,
       sessionuser.documents[0].name,  
    )
  if (status === "Sending") {
            console.log("ok");
            setSending(status);
          }
        }}>{sending}</button>
        <Image
          src="/fool.png"
          alt=""
          className="rounded-full"
          width={30}
          height={30}
        />
      </div>
    </div>
  </div>
</div>

)
}
 
/*
my style  

<div  className=" flex flex-col mt-3 " key={users.$id}>
      
<div className=" flex justify-between items-center  gap-96 bg-slate-200 h-[50px] w-[1200px] p-3 m-3 rounded-xl mt-8 "  >

<div className=" flex  gap-2 items-center m-2 " onClick={()=> router.push(`${users.$id}/user`)}>
    <img 
    src={users.image}
    alt=""
    className=" p rounded-full"
  width={30}
  height={30}
    />
    <p className=" font-black  ">{users.name}</p>
</div>
<div className=" flex gap-3 items-center">
 <Link href={`${users.index}/messages`}className=" flex gap-2 bg-blue-500 rounded-3xl p-2  font-extrabold "> 
 <Image 
    src="/mes.png"
    alt=""
    className=" rounded-full"
    width={30}
    height={30}
    />
    Message
 </Link>
<div  className=" flex  gap-2 items-center p-2  rounded-2xl bg-red-500 hover:bg-purple-500 " onClick={async()=>{
    const status = await HandleThefollow({index:users.index,userId :users.$id as string ,username : users.name  as string, image :users.image} , useremail   as string)as string
    if(status == "ok"){
        console.log("ok")
        setSending("Sending")
    }
    }}>
<button className=" font-bold ">{sending}</button>
<Image 
    src="/fool.png"
    alt=""
    className=" rounded-full"
    width={30}
    height={30}
    />


</div>

</div>


</div>


    </div>
    */
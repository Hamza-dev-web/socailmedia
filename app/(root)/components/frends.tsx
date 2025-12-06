"use client"
import { DeleteRequest, handleAccept } from "@/lib/action/frends.action";
import Image from "next/image";
import Link from "next/link";
import { UserCard } from "../components/userCard";
import { GetSearchedUsers } from "@/lib/action/user.action";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default  function Frends({
  sessionuser,  
  users ,
    listOfInvitaion,
    Frends,
    clerkUser,
}:{
    sessionuser :any ,
    users :  any ,
    Frends :any[]
    listOfInvitaion : any[],
    clerkUser :{id :string , username:string , email:string}
}) {
const [search , setSearch] =useState("")
const router = useRouter()
const [satus , setStatus] =useState(true)
const [searchedUser , setSearched] =useState([])
useEffect(()=>{
if(search == ""){
  setSearched([])
}
},[search])
  return (
    <>
<div className="flex flex-col items-center w-full px-4">
 {listOfInvitaion && listOfInvitaion.length > 0 &&
 <h1 className="text-5xl font-serif font-semibold text-center text-gray-800 tracking-wide 
           drop-shadow-sm mb-6">
  Invitation
</h1> }
  {listOfInvitaion&& listOfInvitaion.length > 0 &&  listOfInvitaion.map((usr: any) => (
   <>
   {usr.senderId != sessionuser.documents[0].$id  ? (
    <div key={usr.name}className="flex justify-between items-center bg-slate-200 w-full max-w-[1200px] px-4 py-3 m-3 rounded-xl mt-8">
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => router.push(`/${usr.senderId}/user`)}
      >
        <img
          src={usr.image}
          alt=""
          className="rounded-full"
          width={30}
          height={30}
        />
        <p className="font-black">{usr.username}</p>
      </div>

      {usr.Accept === false ? (
        <div className="flex gap-4 items-center">
          <Button
            className="flex gap-2 items-center p-2 rounded-2xl bg-red-500 hover:bg-purple-500 cursor-pointer"
          
            onClick={async () =>{
              setStatus(true)
          await handleAccept( usr.senderId,clerkUser && clerkUser.email)
             window.location.reload()
              setStatus(false)
            }
            }
          >
            <Image
              src="/acc.png"
              alt=""
              className="rounded-full"
              width={30}
              height={30}
            />
            <button className="font-bold text-white" >Accept</button>
          </Button>

          <div
            className="flex gap-2 items-center p-2 rounded-2xl bg-red-500 hover:bg-purple-500 cursor-pointer"
            onClick={async () => await DeleteRequest(usr.$id , sessionuser.documents[0].$id )}
          >
            <Image
              src="/delete.png"
              alt=""
              className="rounded-full"
              width={30}
              height={30}
            />
            <button className="font-bold text-white">Delete</button>
          </div>
        </div>
      ) : (
        <>
            <div className="flex gap-3 items-center">
              <Image
                src="/check.png"
                alt=""
                className="rounded-full"
                width={30}
                height={30}
              />
              <p className="text-white">Friends</p>
              <Image
                src="/mes.png"
                alt=""
                className="rounded-full cursor-pointer"
                width={30}
                height={30}
                onClick={() => router.push(`/${usr.index}/messages`)}
              />
            </div>
        </>
      )}
    </div>      
    ):(
<></>
    )}
</>
  ))}
  {Frends && Frends.length > 0 &&
 <h1 className="text-5xl font-serif font-semibold text-center text-gray-800 tracking-wide 
           drop-shadow-sm mb-6">
  Frends
</h1>
}
{ searchedUser.length == 0  &&  Frends && Frends.length > 0 ?  Frends.map((usr: any) => (
  <>
          <div key={usr.name}className="flex justify-between items-center bg-slate-200 w-full max-w-[1200px] px-4 py-3 m-3 rounded-xl mt-8">
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => router.push(`/${usr.receverId}/user`)}
      >
        <img
          src={usr.image}
          alt=""
          className="rounded-full"
          width={30}
          height={30}
        />
        <p className="font-black">{usr.username}</p>
      </div>
            <div className="flex gap-3 items-center">
              <Image
                src="/check.png"
                alt=""
                className="rounded-full"
                width={30}
                height={30}
              />
              <p className="text-white">Friends</p>
              <Image
                src="/mes.png"
                alt=""
                className="rounded-full cursor-pointer"
                width={30}
                height={30}
                onClick={() => router.push(`${usr.index}/messages`)}
              />
            </div>
            </div>
        </>
) ):
<p></p>
}

{/* search section*/}
  <div className="flex flex-col items-center w-full px-4 mt-5">
    <div className="flex justify-between items-center w-full max-w-[1200px] mb-4">
      <img
        src="/p.png"
        alt=""
        width={90}
        height={30}
        className="rounded-full ml-4"
      />
      <div className="flex gap-2 items-center mr-4">
        <Input
          className="rounded-xl w-[150px] h-[40px] text-black"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image
          src="/search.png"
          width={25}
          height={25}
          className="rounded-xl cursor-pointer"
          alt=""
          onClick={async () => {
            const filtreduser = await GetSearchedUsers(search);
            console.log(filtreduser);
            if (filtreduser.length > 0) {
              setSearched(filtreduser as any);
            }
          }}
        />
      </div>
    </div>


  </div>

  <div className="w-full flex flex-col items-center mt-6 px-4">
    {search == "" && searchedUser.length == 0 && users &&
      users.length > 0 ?
      users
        .filter((userd: { email: string }) => userd?.email != clerkUser?.email)
        .map((userto: any) => (
          <UserCard 
           sessionuser={sessionuser} 
           key={userto.$id} 
           useremail={clerkUser.email as string} 
           users={userto} 
           />
        )) :searchedUser.filter((userd: { email: string }) => userd?.email != clerkUser?.email)
        .map((userto: any) => (
          <UserCard 
           sessionuser={sessionuser} 
           key={userto.$id} 
           useremail={clerkUser.email as string} 
           users={userto} 
           />
          ))}
  </div>
</div>
</>
  );
}



{/*
<div className=" flex mt-3 ">
  {listOfFollow && listOfFollow.length > 0 && listOfFollow.map((usr :any) =>(
  <div className=" flex justify-between items-center  gap-96 bg-slate-200 h-[50px] w-[1200px] p-3 m-3 rounded-xl mt-8 "  >

  <div className=" flex  gap-2 items-center m-2 " onClick={()=> router.push(`${usr.$id}/user`)}>
      <img 
      src={usr.image}
      alt=""
      className=" p rounded-full"
    width={30}
    height={30}
      />
      <p className=" font-black  ">{usr.username}</p>
  </div>
{ satus == false ?(
    <div className=" flex gap-4 justify-between items-center w-[240px] h-[80px] bg-whit rounded-lge">
    <div className=" flex  gap-2 items-center p-2  rounded-2xl bg-red-500 hover:bg-purple-500 " onClick={async()=>
      await  handleAccept(usr.userId ,clerkUser && clerkUser.email)
      }>
   <Image 
      src="/acc.png"
      alt=""
      className=" rounded-full"
      width={30}
      height={30}
      />
  <button className=" font-bold ">Accept</button>
  </div>
  <div  className=" flex  gap-2 items-center p-2  rounded-2xl bg-red-500 hover:bg-purple-500 " onClick={async()=> await DeleteRequest(usr.$id)}>

  <Image 
      src="/delete.png"
      alt=""
      className=" rounded-full"
      width={30}
      height={30}
      />
    <button className=" font-bold ">Delete</button>
  
  </div>
  

  </div>
) :(
  <>
  { satus == true &&
    <div className=" flex gap-3 items-center">
    <Image 
    src="/check.png"
    alt=""
    className=" rounded-full"
    width={30}
    height={30}
    />
    <p>Frends </p>
    <Image 
    src="/mes.png"
    alt=""
    className=" rounded-full"
    width={30}
    height={30}
    onClick={()=> router.push(`${usr.index}/messages`)}
    />
</div>
}
  
  </>

)}

  </div>
  ))}
</div>
  <div className=" flex flex-col justify-center  gap-2 mt-5 ">
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
        onClick={ async()=>  {
          const filtreduser = await GetSearchedUsers(search)
         console.log(filtreduser)
          if(filtreduser.length > 0) {
            (setSearched(filtreduser) as any)
          }
            

        } }
        />
        
        </div>
{searchedUser.length > 0 && searchedUser.map((usr )=>
(
    <div className=" flex justify-between items-center  gap-96 bg-slate-200 h-[50px] w-[1200px] p-3 m-3 rounded-xl mt-8 "  >

    <div className=" flex  gap-2 items-center m-2 " onClick={()=> router.push(`${usr.$id}/user`)}>
        <img 
        src={usr.image}
        alt=""
        className=" p rounded-full"
      width={30}
      height={30}
        />
        <p className=" font-black  ">{usr.username}</p>
    </div>
    </div>
)
)}

        </div>
 { users && clerkUser != undefined && 
 users.length > 0 && users.filter((userd :{name :string | any}) => userd?.name != clerkUser?.username).map((userto:any  ) =>
 <>
 <UserCard  useremail={ clerkUser.email as string} users={userto} />
 </>
 )} 
  </div>

*/}
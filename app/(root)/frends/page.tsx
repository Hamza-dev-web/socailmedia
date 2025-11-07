

import { DeleteRequest, handleAccept, ListAllthefollower, ListUsers } from "@/lib/action/frends.action";
import Image from "next/image";
import Link from "next/link";
import { UserCard } from "../components/userCard";
import { currentUser } from "@clerk/nextjs/server";
import Frends from "../components/frends";


export default  async function Home() {
  const clerkUser = await currentUser()
  const Follower = await ListAllthefollower(clerkUser?.emailAddresses[0].emailAddress as string )
  const users = await ListUsers(clerkUser.emailAddresses[0].emailAddress)

  let Usersshow = []
  for(let i=0 ; i< Follower?.length ;i++) {
    Usersshow = users.filter((usr) => usr.email != Follower[i].email)
  }
  console.log(Usersshow)
  return (
    <>
    {/* sm:max-w-[1200px]  hidden  md:ml-3 xl:ml-[200px] md:flex sm:ml-0 sm:flex  xl:w-[1200px]    lg:flex  flex-col  rounded-md   items-center   w-[1200px]  h-full   bg-gradient-to-r from-gray-200 via-blue to-slate-900 */}
    <main className="w-full max-w-[1200px] mx-auto h-full 
            bg-gradient-to-r from-gray-200 via-blue-500 to-slate-900 
             flex-col items-center 
            rounded-md 
            px-4 sm:px-6 md:px-8 
            hidden md:flex xl:ml-[200px]">
{
  users.length > 0 &&  (

    <Frends
clerkUser={{
  id :clerkUser.id ,
  username : `${clerkUser.firstName}${clerkUser.lastName}`,
  email :clerkUser.emailAddresses[0].emailAddress
}}
users={users}
listOfFollow={Follower}

/> 
  )
}


    </main>
  </>
  );
}

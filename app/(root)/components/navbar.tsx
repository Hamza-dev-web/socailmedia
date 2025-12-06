
import Image from "next/image"
import { UserButton } from "@clerk/nextjs"
import { useState } from "react"
import Link from "next/link"
import { Search } from "./search"
import { currentUser } from "@clerk/nextjs/server"
import { getUsers } from "@/lib/action/user.action"

export default async function  Navbar (){
  const user = await currentUser()
  const userDb = await getUsers(user?.emailAddresses[0].emailAddress as string
  )
    return (
    
        <div className= "hidden lg:flex w-full max-w-screen-xl mx-auto px-4 py-4 flex-col lg:flex-row justify-between items-center gap-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg">
  {/* Logo */}
  <div className="flex items-center justify-center lg:justify-start w-full lg:w-auto">
    <Link href="/">
      <h1 className="text-4xl sm:text-5xl font-extrabold font-sans text-black cursor-pointer">
        SocialPlug
      </h1>
    </Link>
  </div>

  {/* Icons */}
  <div className="flex flex-row flex-wrap justify-center items-center gap-6">
    <Link href="/frends">
      <Image
        src="/in2.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Friends"
      />
    </Link>

    <Link href={`/${userDb && userDb?.documents[0]?.$id}/create`}>
      <Image
        src="/cr.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Create"
      />
    </Link>

    <Link href={`/${userDb && userDb?.documents[0]?.$id}/save`}>
      <Image
        src="/save.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Save"
      />
    </Link>

    {/* User button */}
    <Link href={`/${userDb &&userDb?.documents[0]?.$id}/user`} className="ml-4">
      <UserButton afterSignOutUrl="/sign-in" />
    </Link>
  </div>
</div>
        
     

    )
}
export  async  function  MobileNavbar (){
      const user = await currentUser()
      const userDb = await getUsers(user?.emailAddresses[0].emailAddress as string) as any
    return (
<div className="block md:hidden w-full h-auto rounded-lg bg-gradient-to-r from-violet-100 to-fuchsia-200 py-4 px-4">
  
  {/* Mobile Navigation Bar */}
  <div className="flex items-center justify-between w-full h-[80px] bg-slate-900 rounded-lg px-4">
       <Link href="/">
      <Image 
        src="/hom.jpg"
        width={35}
        height={35}
        className="rounded-xl"
        alt="home"
      />
    </Link>
    {/* Friends Link */}
    <Link href="/frends">
      <Image 
        src="/in2.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Friends"
      />
    </Link>

    {/* Create Link */}
    <Link href={`/${userDb?.documents[0]?.$id}/create`}>
      <Image 
        src="/cr.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Create"
      />
    </Link>

    {/* Save Link */}
    <Link href={`/${userDb && userDb?.documents[0]?.$id}/save`}>
      <Image 
        src="/save.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Save"
      />
    </Link>
     <Link href="/mobileNotif">
      <Image 
        src="/no.png"
        width={35}
        height={35}
        className="rounded-xl"
        alt="Save"
      />
    </Link>

    {/* User Profile Button */}
    <Link href={`/${userDb?.documents[0]?.$id}/user`}>
      <UserButton />
    </Link>
  </div>
</div>
    )
}

/*
    <div className=" xl:ml-[200px]  md:hidden md:ml-3 sm: hidden  lg:flex rounded-lg   h-[150px] flex-wrap   flex-row justify-between w-[1200px]   bg-gradient-to-r from-violet-500 to-fuchsia-500  ">
<div className=" ml-3 flex flex-row gap-3 mt-3  flex-wrap">
<Link href={"/"}>
<h1 className=" font-extrabold font-sans text-[50px] text-black cursor-pointer "> SocialPlug</h1>
</Link>
</div>
<div className="  flex    gap-20  mb-8   items-center justify-center     ">

<Link href="/frends">
<Image 
src="/in2.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
<Link href={`/${userDb && userDb?.documents[0].$id}/create`}>
<Image 
src="/cr.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
<Link href={`/${userDb && userDb?.documents[0].$id}/save`} className="  mr-16">
<Image 
src="/save.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
</div>
<Link href={`/${userDb && userDb.documents[0].$id}/user`} className=" mr-4 mt-10">

  
<UserButton/>
</Link>
</div>

<div className=" md:hidden sm:flex flex-col  flex-wrap  w-screen h-auto rounded-lg  gap-4  items-center     bg-gradient-to-r from-violet-100 to-fuchsia-200">

<div className="  flex  w-screen h-[80px]  flex-wrap bg-slate-900 rounded-lg      items-center  justify-between      ">

<Link href="">
<Image 
src="/in2.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
<Link href={`/${userDb?.documents[0].$id}/create`}>
<Image 
src="/cr.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
<Link href="/save" className="  mr-16">
<Image 
src="/save.png"
width={35}
height={35}
className=" rounded-xl m "
alt=""
/>
</Link>
<div className=" flex   mb-10">
<UserButton/>

</div>
</div>
 



</div>

*/
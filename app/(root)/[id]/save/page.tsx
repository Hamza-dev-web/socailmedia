
import React, { useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from 'next/image';
import { CreateUsers, getPostesByPosterName, GetUserDetails, getUsers } from '@/lib/action/user.action';
import { useRouter } from "next/navigation"
import { GetAllSavePosts } from '@/lib/action/posts.action';
import { useUser } from "@clerk/clerk-react"
import { UserCard } from '../../components/userCard';
import { PostsCard, PostsUsersCard } from '../../components/postCard';
import { ListAllthefollower } from '@/lib/action/frends.action';
import { currentUser } from '@clerk/nextjs/server';
export default async  function  Save ({params:{id}} :{params:{id :string}}){
    const clerkuser = await currentUser()
    const user = await getUsers(clerkuser?.emailAddresses[0].emailAddress as string)
 const posts =await GetAllSavePosts(id)
if(!user) return
    return (
<main className=" md:flex flex-col items-center h-full w-full max-w-[1280px] mx-auto bg-slate-100 shadow-xl px-6 py-10 rounded-lg font-sans">
  {/* Optional Title */}
  <h1 className="text-3xl font-semibold text-gray-800 mb-8">Saved Posts</h1>

  {posts && posts.length > 0 ? (
    <div className="w-full flex flex-wrap justify-center gap-8 bg-white rounded-xl shadow-md p-8">
      {posts.map((post: any) => (
        <PostsCard
          key={post.$id} // assuming post has unique ID
          post={post}
          user={user.documents[0]}
          isinSave={true}
        />
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-lg">No posts to display.</p>
  )}
</main>

    )
}

/*
        <main className=" sm:w-screen hidden  md:ml-3 xl:ml-[200px] md:flex sm:ml-0 sm:flex  xl:w-[1200px]    lg:flex  flex-col  rounded-md   items-center   w-[1200px]  h-full   bg-slate-100 shadow-xl  ">
{ posts && posts.length > 0 && (
<div className="  mt-14 flex flex-wrap justify-center gap-5 w-[1000px]    bg-purple-300 rounded-lg p-4">
{
  posts.map((post :any ) =>
    (
    <PostsCard  post={post} user={user.documents[0] } isinSave={true}/>
   
  ))
}
</div>

) 




}
        </main>*/
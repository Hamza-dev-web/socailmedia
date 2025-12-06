
import React, { useEffect } from 'react';
import {  getPostesByPosterName, GetUserDetails } from '@/lib/action/user.action';
import { PostsUsersCard } from '../../components/postCard';
import {  ListAllthefollower2 } from '@/lib/action/frends.action';
export default async  function  Create ({params:{id}} :{params:{id :string}}){
const user = await GetUserDetails(id)
//if(!user) return
const posts = await getPostesByPosterName(user.name as string)
const follower = await ListAllthefollower2(user.email)
console.log(follower , user, posts)
    return (
<main className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-200 via-blue-500 to-slate-900 px-6 py-10 font-[Poppins]">
  <div className="flex flex-col gap-10 w-full max-w-[1200px]">

    {/* User Info */}
    <div className="flex flex-col items-center text-center">
      <img 
        src={user.image}
        alt=""
        className="rounded-full shadow-lg border-4 border-white"
        width={90}
        height={90}
      />
      <p className="font-extrabold text-3xl text-white mt-3 tracking-wide">
        {user.name}
      </p>
    </div>

    {/* Followers */}
    {follower && follower.length > 0 && (
      <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-semibold border-b pb-2 border-white/30">
          Followers
        </h2>

        {follower.map((follow: any) => (
          <div 
            key={follow.id}
            className="flex items-center justify-between bg-white/90 hover:bg-white transition rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center gap-4">
              <img
                src={follow.image}
                alt=""
                width={40}
                height={40}
                className="rounded-full shadow"
              />
              <p className="font-medium text-gray-800 text-lg">
                {follow.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Posts */}
    {posts && posts.documents.length > 0 ? (
      <div>
        <h2 className="text-white text-2xl font-semibold mb-4">Posts</h2>
        <div className="flex flex-wrap gap-6 justify-start">
          {posts.documents.map((post: any) => (
            <PostsUsersCard key={post.id} post={post} user={user} />
          ))}
        </div>
      </div>
    ) : (
      <h1 className="text-white text-3xl mt-10 font-bold text-center">
        This user doesn't have any posts.
      </h1>
    )}
  </div>
</main>

    )
}
/*
 <main className=" sm:w-screen hidden  md:ml-3 xl:ml-[200px] md:flex sm:ml-0 sm:flex  xl:w-[1200px]    lg:flex  flex-col  rounded-md   items-center   w-[1200px]  h-full   bg-gradient-to-r from-gray-200 via-blue to-slate-800   ">
<div className=' flex flex-col  gap-4'>
<div className=" flex mb-7  justify-center mr-10  mt-12  gap-2 items-center ">
    <img 
    src={user.image}
    alt=""
    className=" rounded-full"
    width={30}
    height={30}
    />
    <p className=" font-black  ">{user.name}</p>
    </div>
    <div className=' flex flex-col gap-5'>
{follower && follower?.map((follow :any) =>(
  <div className=' flex  justify-between gap-32'>
<img
src={follow.image}
alt=''
width={30}
height={30}
/>
<p>{follow.name}</p>

  </div>
))}

    </div>
{posts && posts.length  > 0  ?  (
  <div className=' flex  gap-2 items-center '>
  {posts.map((post:any )=>(
<PostsUsersCard post={post} user={user}/>

  ))}
  </div>
) :(
  <h1 className=' text-[40px]'> this User dont have any post</h1>
)}
</div>
*/

import React, { useEffect } from 'react';
import { CreateUsers, getPostesByPosterName, GetUserDetails } from '@/lib/action/user.action';
import { PostsUsersCard } from '../../components/postCard';
import { ListAllthefollower } from '@/lib/action/frends.action';
export default async  function  Create ({params:{id}} :{params:{id :string}}){
const user = await GetUserDetails(id)
if(!user) return
const posts = await getPostesByPosterName(user.name as string)

console.log(posts)


if(!posts) return
const follower = await ListAllthefollower(user.email)
    return (
      <main className="w-full h-full flex flex-col items-center justify-center hidden md:flex md:ml-3 xl:ml[-220px] bg-gradient-to-r from-gray-200 via-blue-500 to-slate-800 rounded-md px-4 py-6">
  <div className="flex flex-col gap-6 w-full max-w-[1200px]">

    {/* User Info */}
    <div className="flex justify-center items-center gap-3 mt-6">
      <img 
        src={user.image}
        alt=""
        className="rounded-full"
        width={40}
        height={40}
      />
      <p className="font-black text-lg text-white">{user.name}</p>
    </div>

    {/* Followers */}
    {follower && follower.length > 0 && (
      <div className="flex flex-col gap-4">
        <h2 className="text-white text-xl font-semibold">Followers</h2>
        {follower.map((follow: any) => (
          <div key={follow.id} className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={follow.image}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="font-medium">{follow.name}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Posts */}
    {posts && posts.length > 0 ? (
      <div className="flex flex-wrap gap-4 justify-start mt-6">
        {posts.map((post: any) => (
          <PostsUsersCard key={post.id} post={post} user={user} />
        ))}
      </div>
    ) : (
      <h1 className="text-white text-2xl mt-10 font-semibold">This user doesn't have any posts.</h1>
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
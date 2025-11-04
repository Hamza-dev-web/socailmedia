import {  GetAllPosts, getUsers } from "@/lib/action/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { PostsCard } from "./components/postCard";
import { ListAllthefollower } from "@/lib/action/frends.action";
export interface Post {
  $id?:string
  title :string
  posterName :string
  image :string
  Like :number
  userImage :string
  comments :string[],
  index :number
}
export default async function Home() {
 const posts= await GetAllPosts()
 const clerkuser = await currentUser()
 const userdb = await getUsers(clerkuser.emailAddresses[0].emailAddress)
 console.log("user of page main",userdb)
 if(!userdb) return
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex flex-col items-center rounded-md bg-gradient-to-r from-gray-200 via-blue-300 to-slate-800 shadow-lg">
{ posts && posts?.documents.length > 0 ? (
<div className="mt-14 flex flex-wrap justify-center gap-5 w-full max-w-screen-lg mx-auto rounded-lg p-4 bg-white shadow-md">
{
  posts.documents.map((post :any ) =>(
    <PostsCard isinSave={false} post={post}  user={userdb.documents[0]} />
  ))
}
</div>
) :(
  <></>
)
}
    </div>
  );
}

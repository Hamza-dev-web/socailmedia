"use client"
import { DeleteAsavedPost, deleteUserPost, handleTheLike, SaveAPost } from "@/lib/action/user.action";
import { Post } from "../page";
import Image from "next/image";
import { Comments } from "./comments";
import { CommentsCard } from "./commentscard";
export function PostsCard ({post , isinSave,user} :{post :Post , user :any , isinSave : boolean}){
 return (
<div className="w-full max-w-2xl mx-auto flex flex-col gap-5 text-left p-6 rounded-md bg-gradient-to-r from-slate-200 via-blue-200 to-blue-100 shadow-md">

  {/* Header: User Info */}
  <div className="flex items-center gap-3">
    <img 
      src={post.userImage as string}
      width={40}
      height={40}
      className="rounded-full"
      alt="User avatar"
    />
    <h2 className="text-lg font-semibold text-gray-800">{post.posterName}</h2>
  </div>

  {/* Post Title */}
  <p className="text-gray-900 text-md">{post.title}</p>

  {/* Post Image */}
  <img
    src={post.image}
    alt="Post content"
    className="w-full max-h-[500px] object-cover rounded-lg"
  />

  {/* Like and Save Buttons */}
  <div className="flex justify-between items-center mt-2">
    
    {/* Like */}
    <div 
      className="flex gap-2 items-center cursor-pointer" 
      onClick={async () => await handleTheLike(post.$id as string, user.id as string)}
    >
      <Image src="/ja.png" alt="Like" width={28} height={28}  className=" rounded-lg"/>
      <p className="text-gray-800">{post.Like}</p>
    </div>

    {/* Save/Delete */}
    <div className="flex gap-2 items-center">
      {isinSave ? (
        <img
          src="/delete.png"
          alt="Remove from saved"
          width={28}
          height={28}
          className="cursor-pointer"
          onClick={async () => {
            DeleteAsavedPost(post.$id)
            window.location.reload()
          }}
        />
      ) : (
        <img
          src="/save.png"
          alt="Save post"
          width={28}
          height={28}
          className="cursor-pointer"
          onClick={async () =>
            await SaveAPost(
              {
                idofUser: String(user.$id),
                title: post.title,
                image: post.image,
                like: post.Like,
                index: post.index,
                comments: post.comments,
                userImage: post.userImage,
                posterName: post.posterName,
               email :   user.email
              },
           
            )
          }
        />
      )}
    </div>
  </div>
  {!isinSave && (
    <div className="mt-4">
      <Comments username={user.name} idPost={post.$id as string} />
    </div>
  )}
  {post.comments && post.comments.length > 0 && (
    <div className="flex flex-col gap-3 mt-6">
      {post.comments.map((comment) => (
        <CommentsCard post={post} user={user} comment={comment as any} />
      ))}
    </div>
  )}
</div>
    )
} 
export const PostsUsersCard =({post , user } :{ post :any , user : any})=>{
    return (
        <div className=" flex flex-col gap-3">
        <div className="  ml-8 flex    gap-2 items-start">
<img 
className="  rounded-full"
src={user.image as string}
width={30}
height={30}
alt=""

/>
               
<h2>{post.posterName}</h2>
  </div>
  <p>{post.title}</p>
        <img
        src={post.image}
        height={600}
        width={600}
        className="c rounded-lg"
        alt=""
        />
           <div className="flex justify-between   items-center  ">
        <div className=" flex  gap-3 items-center " onClick={async() => await handleTheLike(post.$id as string , user.id as string )}>
            <Image src="/ja.png" alt="" width={30} height={30} /> 
            <p>{post.Like} </p>
            </div>


        </div>

        </div>
    )
}


/*
<div className=" flex flex-col gap-4  text-center p-4 rounded-sm  bg-gradient-to-r from-slate-200 via-blue to-blue-100">
        <div className="  ml-8 flex   gap-2 items-start">
<img 
className="  rounded-full"
src={post.userImage as string}
width={30}
height={30}
alt=""
/>     
<h2>{post.posterName}</h2>
</div>      
<p>{post.title}</p>
<img
src={post.image}
height={900}
width={900}
        className="c rounded-lg"
        alt=""
        />
        <div className="flex justify-between   items-center  ">
        <div className=" flex  gap-3 items-center " onClick={async() => await handleTheLike(post.$id as string , user.id as string )}>
            <Image src="/ja.png" alt="" width={30} height={30} /> 
            <p>{post.Like} </p>
            </div>  
            <div className=" flex  gap-2 items-center   ">
                {
isinSave == true ? (
    <img src="/delete.png" alt="" width={30} height={30}  onClick={async()=> DeleteAsavedPost( user.email)}/> 
) :(
    <img src="/save.png" alt="" width={30} height={30} onClick={async()=> await SaveAPost({ idofUser : String(post.$id)  , title:post.title , image: post.image , like:post.Like , index:post.index , comments :post.comments, userImage : post.userImage , posterName :post.posterName} , user.email)} /> 
)
                }
          
    
            </div>

        </div>
        {isinSave != true &&   <Comments username={user.name} idPost={post.$id as string} />}

  
    <div className=" flex flex-col gap-3 items-center mt-9">
    {post.comments && post.comments.map((comment) =>(
<CommentsCard post={post}user={user}  comment={comment as any }/>
    ))}
    </div>


     </div> 
    )
} 


export const PostsUsersCard =({post , user } :{ post :any , user : any})=>{
    return (
        <div className=" flex flex-col gap-3">
        <div className="  ml-8 flex    gap-2 items-start">
<img 
className="  rounded-full"
src={user.image as string}
width={30}
height={30}
alt=""

/>
               
         <h2>{post.posterName}</h2>
        </div>
      
        <p>{post.title}</p>
        <img
        src={post.image}
        height={600}
        width={600}
        className="c rounded-lg"
        alt=""
        />
           <div className="flex justify-between   items-center  ">
        <div className=" flex  gap-3 items-center " onClick={async() => await handleTheLike(post.$id as string , user.id as string )}>
            <Image src="/ja.png" alt="" width={30} height={30} /> 
            <p>{post.Like} </p>
            </div>


        </div>

        </div>*/


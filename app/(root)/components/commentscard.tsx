import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateComments, DeleteComments } from "@/lib/action/notification&Comments.action"
import Image from "next/image"
import { useState } from "react"
export function CommentsCard({post ,comment , user} :{post:any ,comment :{ $id:string,comments :string , poster :string} , user:any}){

const [open , setOpen ] =useState(false)
const [updatecom , setupdateCom ] =useState(false)
const [comments , setComments] =useState(comment.comments)
    return(
<div
  key={comment.$id}
  className="w-full max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-md p-4 shadow-sm"
>
  {/* User Info + Comment */}
  <div className="flex gap-3 items-start w-full">
    <img
      src={user.image}
      alt="User"
      width={35}
      height={35}
      className="rounded-full"
    />
    <div className="flex flex-col">
      <p className="text-sm font-semibold text-gray-700">{user.name}</p>

      {/* Comment Text or Update Form */}
      {!updatecom ? (
        <p className="mt-1 text-base font-medium text-gray-900 break-words max-w-md">
          {comment.comments}
        </p>
      ) : (
        <div className="mt-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <Input
            className="w-full sm:w-72 rounded-lg px-4 py-2 border border-gray-300"
            placeholder="Enter your comment"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Button
            className="bg-fuchsia-400 hover:bg-green-400 text-white px-4 py-2 rounded-md font-semibold"
            onClick={async () => {
              await updateComments({
                id: comment.$id,
                poster: comment.poster,
                comments: comments,
              });
              setupdateCom(false);
              window.location.reload()
            }}
          >
            Update
          </Button>
        </div>
      )}
    </div>
  </div>

  {/* Edit/Delete Buttons */}
  {comment.poster === user.name && (
    <div className="relative mt-4 md:mt-0 ml-auto">
      <img
        src="3.png"
        alt="Options"
        width={30}
        height={30}
        className="rounded-full cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute right-0 mt-2 flex flex-col gap-2 bg-slate-100 rounded-lg p-2 shadow-lg z-10">
          <div
            className="flex items-center gap-2 px-3 py-1 hover:bg-slate-200 cursor-pointer rounded"
            onClick={() => setupdateCom((prev) => !prev)}
          >
            <img src="up.png" alt="Update" width={20} height={20} />
            <p className="text-sm font-medium text-gray-800">Update</p>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1 hover:bg-slate-200 cursor-pointer rounded"
            onClick={async () => {
              await DeleteComments(comment.$id)
                    window.location.reload()
          }}
          >
            <img src="delete.png" alt="Delete" width={20} height={20} />
            <p className="text-sm font-medium text-gray-800">Delete</p>
          </div>
        </div>
      )}
    </div>
  )}
</div>
)


}

/*
 <div key={comment.$id} className=" flex    justify-between  items-center bg-white rounded-md p-3  w-[900px]">

          <div className=" flex  gap-3">
      <img
      src={user.image}
      alt=""
      width={30}
      height={30}
      className=" rounded-full"
      />
      <p className=" text-[15px] mt-2">{user.name}</p>
      </div>
      
        { updatecom != true ?(
            <>
           <p className=" font-extrabold  mr-[200px] w-[300px]    text-black text-[20px]">{comment.comments}</p>
            </>
        )  :(
            <div className="  w-[400px]  justify-between    flex   gap-12 items-center ">
            <Input  className=" w-[300px] rounded-lg p-4"  placeholder=" Enter your Commnets" value={comments} onChange={(e) => setComments(e.target.value)}/>
            <Button  className="  font-semibold text-[20px] bg-fuchsia-300 hover:bg-green-400 " onClick={ async()=> {await updateComments({
                id : comment.$id,
                poster :comment.poster,
                comments :comments

            }) 
            setupdateCom(false)} }>Update</Button>
            </div>
    
      
        )}
      
{
    comment.poster == user.name &&(
        <div className=" flex flex-col gap-2 "> 
<img
      src="3.png"
      alt=""
      width={30}
      height={30}
      className=" rounded-full ml-11"
      onClick={()=> setOpen((pre) => !pre)}
      />

{open == true && (
    <div className=" flex flex-col gap-2 cursor-pointer  ">
        <div className=" flex gap-4 bg-slate-500 w-[120px] rounded-lg "     onClick={()=> setupdateCom((pre) => !pre)}>
        <img
      src="up.png"
      alt=""
      width={30}
      height={30}
      className=" rounded-full"
      />
      <p>Update</p>
        </div>

        <div     onClick={ async()=>DeleteComments(comment.$id) } className=" flex gap-4 bg-slate-500 w-[120px] rounded-lg">
        <img
      src="delete.png"
      alt=""
      width={30}
      height={30}
      className=" rounded-full"
  
      />
      <p>Delete</p>

        </div>

    </div>
)}
</div>
    )
}
    </div>
    */
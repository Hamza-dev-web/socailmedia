
import { GetNotifiction } from "@/lib/action/notification&Comments.action"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
export default async function Notifictation (){
    const user = await currentUser()
    const notifiction = await GetNotifiction()

    return (
 <>
  {/* Header */}
  <div className="  w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg flex justify-between items-center shadow-lg">
    <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-200 select-none">
      Notification
    </h1>
    <Image
      src="/no.png"
      width={40}
      height={40}
      alt="Notification Icon"
      className="rounded-xl"
    />
  </div>

  {/* Notifications List */}
  <div className="w-full max-w-xl mx-auto mt-4 space-y-4 p-4 bg-gradient-to-tr from-violet-100 via-fuchsia-100 to-pink-100 rounded-lg shadow-inner min-h-[200px]">
    {notifiction && notifiction.length > 0 ? (
      notifiction.map((noti, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row justify-between items-center bg-white bg-opacity-70 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* User Info */}
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <img
              src={noti.userimage}
              alt={`${noti.posterName || noti.username} avatar`}
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
            <span className="text-lg text-[10px] font-semibold text-violet-700">
              {noti.posterName ?? noti.username}
            </span>
          </div>

          {/* Notification Text */}
          <p className="text-base md:text-lg text-[15px] text-gray-700 text-center md:text-left">
            {noti.type == "post"
              ? "has posted a Created new post."
              : "has joined the app."}
          </p>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500 italic font-medium">
        No notifications available.
      </p>
    )}
  </div>
</>
    )
}
/*
    <>
       <div className=" xl:w-[600px] p-2   bg-gradient-to-r from-violet-500 to-fuchsia-500   rounded-lg  w-[400px] flex justify-between items-center"> 
    <h1 className=" font-bold text-[40px]  ml-3 text-yellow-100" >Notification</h1>
    <Image 
src="/no.png"
width={40}
height={40}
className=" rounded-xl m "
alt=""
/>
</div>
<div className=" xl:w-[600px] gap-3 flex e  w-[400px] h-[50px] flex-col mt-2  mb-[590px]">
{notifiction && notifiction?.length >0 && notifiction.map((noti )=>(
      <>
          
           
           <div className=" flex  justify-between  w-auto  "  >
           <div className=" flex gap-2 bg-gradient-to-r from-violet-100 to-fuchsia-100 rounded-lg p-1 w-auto ">
           <img src={noti.userimage} alt="" width={30} height={30} className=" rounded-lg"/>
                           <span className=" font-semibold  text-[20px] mr-10  rounded-lg ">
                           {noti.posterName != null &&  `${noti.posterName}  `}
                           </span>
                           </div>
<p className="text-[20px] font-normal  mt-2  mr-2  gap-4 items-center">    have post a new Post </p>
           </div>
    
             
      
           
                            <div className=" flex  justify-between "  >
                            <div className=" flex gap-2 bg-gradient-to-r from-violet-200 to-fuchsia-200 rounded-lg p-1 w-auto">
                            <img src={noti.userimage} alt="" width={30} height={30} className=" rounded-lg"/>
                                            <span className=" font-semibold  text-[20px] mr-10  rounded-lg ">
                                            {noti.posterName != null &&  `${noti.username}  `}
                                            </span>
                                            </div>
                 <p className="text-[20px] font-normal mr-2 mt-2    gap-4 items-center">    have join the app </p>
                            </div>
                   
      
      </>
           
    ))
  
    }
    </div>*/
export  async function MobileNotifictation (){
    const user = await currentUser()
    const notifiction = await GetNotifiction()
    console.log(notifiction)
    return (
       <>
       <div className=" md:hidden  max-w-screen p-2 h-[100px] max-h-[120px]   bg-gradient-to-r from-violet-500 to-fuchsia-500   rounded-lg   flex justify-between items-center"> 
    <h1 className=" font-bold text-[40px] ml-3 text-yellow-100" >Notification</h1>
    <Image 
src="/no.png"
width={40}
height={40}
className=" rounded-xl m "
alt=""
/>
</div>
<div className=" max-w-screen w-screen flex bg-white  h-[50px] flex-col mt-2  mb-[590px]">
{notifiction && notifiction?.length >0 && notifiction.map((noti )=>(
      <>
              {noti.post &&noti.post.length >0 &&noti.post.map((post:any) =>(
           
           <div className=" flex  justify-between  max-w-screen"  >
           <div className=" flex gap-2 bg-gradient-to-r from-violet-900 to-fuchsia-100 rounded-lg p-1 w-auto ">
           <img src={post.userImage} alt="" width={30} height={30} className=" rounded-lg"/>
                           <span className=" font-semibold  text-[25px] mr-10  rounded-lg ">
                           {noti.posterName != null &&  `${noti.posterName}  `}
                           </span>
                           </div>
<p className="text-[20px] font-normal  mt-2  mr-2  gap-4 items-center">    have post a new Post </p>
           </div>
    
                    ))}
                    {
                        noti.user &&noti.user.length >0 &&noti.user.map((user:any) =>(
           
                            <div className=" flex  justify-between max-w-screen "  >
                            <div className=" flex gap-2 bg-gradient-to-r from-violet-800 to-fuchsia-200 rounded-lg p-1 w-auto">
                            <img src={user.image} alt="" width={30} height={30} className=" rounded-lg"/>
                                            <span className=" font-semibold  text-[25px] mr-10  rounded-lg ">
                                            {noti.posterName != null &&  `${noti.username}  `}
                                            </span>
                                            </div>
                 <p className="text-[20px] font-normal mr-2 mt-2    gap-4 items-center">    have join ower app </p>
                            </div>
                   ))}
      
      </>
           
    ))
  
    }
    </div>
       </>



 


      
    )
}

import "../globals.css";
import Navbar, { MobileNavbar } from "./components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CreateUsers, getUsers } from "@/lib/action/user.action";
import Notifictation  from  "./components/notifiction";
import { redirect } from "next/navigation";

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 const clerkuser = await currentUser()
 if(!clerkuser ) redirect('/sign-in') 


  return (


      <div className="flex flex-wrap gap-2 flex-row w-full lg:w-screen md:mr-0">      
                  {/* flex gap-2 flex-row lg:w-screen flex-wrap    md:mr-0 */}
         {/* xl:fixed xl:w-[600px] sm:hidden  md:hidden  lg:flex  flex-col h-full  ml-9 w-[400px]   bg-gradient-to-r from-violet-200 to-fuchsia-300  rounded-lg   mb-[400px]*/  }
            <div className=" md:hidden   sm:hidden lg:flex flex-col h-full xl:fixed xl:w-[400px] w-[400px] ml-9 rounded-lg mb-[400px] bg-gradient-to-br from-violet-300 via-fuchsia-200 to-pink-300 shadow-xl p-6 font-sans text-gray-800 ">
        <Notifictation/>
        </div>
        {/* my code xl:ml-[800px] xl: md:w-[700px]  flex  flex-col w-[1300px]*/ }
         <div className="w-full max-w-screen-xl mx-auto px-4 xl:ml-[500px] md:w-[700px] flex flex-col">
      <Navbar/>
      <MobileNavbar/>
      {/*
<div className="block sm:flex md:hidden lg:hidden xl:hidden flex-col h-[200px]">
          <MobileNotifictation/>
        </div>
*/
      }
      
      {children}
        </div>
     </div>
        

  
  
  
    


  );
}

/*
       {   user &&  userdb &&  userdb.documents.length >  0 ? (
     <div className="flex flex-wrap gap-2 flex-row w-full lg:w-screen md:mr-0">      
                  {/* flex gap-2 flex-row lg:w-screen flex-wrap    md:mr-0 }
         {/* xl:fixed xl:w-[600px] sm:hidden  md:hidden  lg:flex  flex-col h-full  ml-9 w-[400px]   bg-gradient-to-r from-violet-200 to-fuchsia-300  rounded-lg   mb-[400px]  }
            <div className="hidden  sm:hidden lg:flex flex-col h-full xl:fixed xl:w-[400px] w-[400px] ml-9 rounded-lg mb-[400px] bg-gradient-to-br from-violet-300 via-fuchsia-200 to-pink-300 shadow-xl p-6 font-sans text-gray-800 ">
        <Notifictation/>
        </div>
        {/* my code xl:ml-[800px] xl: md:w-[700px]  flex  flex-col w-[1300px] }
         <div className="w-full max-w-screen-xl mx-auto px-4 xl:ml-[500px] md:w-[700px] flex flex-col">
      <Navbar/>
      <MobileNavbar/>
      <div className="block sm:flex md:hidden lg:hidden xl:hidden flex-col h-[200px]">
          <MobileNotifictation/>
        </div>
      {children}
        </div>
     </div>
    )
    :( 
<></>
            )
        }  */
    

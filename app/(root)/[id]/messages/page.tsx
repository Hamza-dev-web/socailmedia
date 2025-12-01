import { currentUser } from "@clerk/nextjs/server";
import { Messager } from "../../components/messager";
import { GetUserDetails, getUsers } from "@/lib/action/user.action";
import { getUsersToMessage } from "@/lib/action/messages.action";

export default async function Home({params:{id}} :{params:{id :string}}) {
 const currentuser = await currentUser()
 if(!currentuser) return 
 const user = await getUsers(currentuser.emailAddresses[0].emailAddress) 
if(!user) return
   const usertoTalk = await getUsersToMessage(id)
   if(!usertoTalk) return
  return (
 <Messager
 user={user.documents[0]}
 userToTalkWith={usertoTalk}
 />
  );
}






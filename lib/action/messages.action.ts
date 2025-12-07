"use server"
import { database, users } from "../appwrite/config";;
import { ID, Query } from "node-appwrite";



export const CreateMessages =async(documents :{userId : string,ReciverId :string , message : string}) =>{
try {
              const currentUser  = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("$id" , [documents.userId ])] )
                   const ReciverUser = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("$id" , [documents.ReciverId ])] )
                if(!currentUser || !ReciverUser ) return
                  const PairId = [documents.userId, documents.ReciverId].sort().join("_");
                console.log(currentUser.documents[0].message)
                const newmessage = await database.createDocument(
        process.env.DATABASE_ID as string,
        process.env.MESSAGE_COLLECTION as string,
        ID.unique() , 
        {
            PairId : PairId,
         CurrentUserId :documents.userId,
           SenderId : documents.ReciverId,
         message : documents.message,
                   }
            )

                    return console.log("donne" , currentUser.documents[0].message)
}
catch (err :any) {
console.log(err)
}
}
export const getAllMessage =async (userId :string , ReciverId :string)=>{
try {
     const PairId = [userId,ReciverId].sort().join("_");
const message = await database.listDocuments(
  process.env.DATABASE_ID as string,
   process.env.MESSAGE_COLLECTION as string,[
  Query.equal("PairId" , PairId )] )
return  message.documents

}
catch(err :any){
    console.log(err)
}
}

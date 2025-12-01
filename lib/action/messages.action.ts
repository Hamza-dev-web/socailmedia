"use server"
import { database, users } from "../appwrite/config";;
import { ID, Query } from "node-appwrite";



export const CreateMessages =async(documents :{userId : string,ReciverId :string , message : string}) =>{
try {
    const newmessage = await database.createDocument(
        process.env.DATABASE_ID as string,
        process.env.MESSAGE_COLLECTION as string,
        ID.unique() , 
        {
         CurrentUserId :documents.userId,
           SenderId : documents.ReciverId,
         message : documents.message

                   }
            )
              const currentUser  = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("$id" , [documents.userId ])] )
                   const ReciverUser = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("$id" , [documents.ReciverId ])] )
                if(!currentUser || !ReciverUser ) return
                console.log(currentUser.documents[0].message)
                await database.updateDocument(      
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string ,
                     documents.userId ,{
                        ...currentUser.documents[0],
                        Discution :[
                            ...currentUser.documents[0].message,
                            { 
                               CurrentUserId :documents.userId,
                               SenderId : documents.ReciverId,
                                message :newmessage.message
                            }
                        ]
                    })
                         await database.updateDocument(     
                     process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string , 
                    documents.ReciverId ,{
                        ...currentUser.documents[0],
                        Discution :[
                            ...currentUser.documents[0].message,
                            { 
                               CurrentUserId :documents.userId,
                               SenderId : documents.ReciverId,
                                message :newmessage.message
                            }
                        ]
                    })
                    return console.log("donne" , currentUser.documents[0].Discution)
}
catch (err :any) {
console.log(err)
}
}
export const getAllMessage =async (userId :string )=>{
try {

const user = await database.listDocuments(
  process.env.DATABASE_ID as string,
  process.env.USERS_COLLECTION as string,[
  Query.equal("$id" , userId )] )
return  user.documents[0].Discution

}
catch(err :any){
    console.log(err)
}
}

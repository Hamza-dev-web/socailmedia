"use server"
import { redirect } from "next/navigation";
import { database, users } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";
import { comment } from "postcss";


export const CreateMessages =async(documents :{userId : string , message : string}) =>{
try {
    const newmessage = await database.createDocument(
        process.env.DATABASE_ID as string,
        process.env.MESSAGE_COLLECTION as string,
        ID.unique() , 
        {
         userId :documents.userId,
         message : documents.message

                   }
            )
              const user = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("$id" , [documents.userId ])] )
                if(!user ) return
                console.log(user.documents[0].message)
                await database.updateDocument(       process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string , documents.userId ,{
                        ...user.documents[0],
                        message :[
                            ...user.documents[0].message,
                            { 
                               
                                message :newmessage.message
                            }
                        ]
                    })
                    return console.log("donne" , user.documents[0].message)

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
  Query.equal("$id" , [userId ])] )
return  user.documents[0].message

}
catch(err :any){
    console.log(err)
}
}
export const getUsersToMessage =async (index :string)=>{
        try {
      
            const  newDocuments =  await database.listDocuments(
               process.env.DATABASE_ID as string,
               process.env.USERS_COLLECTION  as string
               ,[
               
            ] );
            
                if(newDocuments.documents.length > 0  ){
                    return newDocuments.documents.find((user) => user.index == index) 
                }
            
          
          
            }
        catch(err :any) {
            console.log(err)
        }
    }
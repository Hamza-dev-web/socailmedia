"use server"


import { redirect } from "next/navigation";
import { database, users } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";
import { comment } from "postcss";




    export const getUsers = async (email :string)=>{
       // const clerkuser = await currentUser()
      //  if(!clerkuser )return
        try {
            const user = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                Query.equal("email" , [email ])] )
            if(!user) return console.log("not found")
 return user
        }
        catch (err :any) {
console.log(err)
        }
    }
    
      export const CreateUsers = async (documents :{username :string , email:string , image :string })=>{

        try {
            const users= await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as
                 string,[
                Query.equal("email" , [documents.email ])
            ])
       if(users.documents.length > 0) return users
       const id = ID.unique()  
       const userDb = await database.createDocument(
            process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION as string,  
            id ,
            {
             name : documents.username,
            email : documents.email,
                image :documents.image,
                receivedRequest:[],
                senderRequest:[],
                save :[],
                index :id,
                message :[]
            }
        )
        
        console.log(userDb)
        await database.createDocument(
            process.env.DATABASE_ID as string  ,
            process.env.NOTIFICATION_COLLECTION as string ,
            ID.unique(), {
    posterName:documents.username,
     username : documents.username ,
     userimage : documents.image,
     type:"user"
    
            }
        )
        revalidatePath("/")
        return userDb.$id

        }
        catch (err :any) {
console.log(err)
        }
    }
    export const getPostesByPosterName = async (posterName :string)=>{

        try {
            const posts = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.POSTS_ID_COLLECTION as string,[
            Query.equal("posterName" ,[posterName])
                ])
            if(!posts) return console.log("not found")

 return posts
        }
        catch (err :any) {
console.log(err)
        }
    }
    

    

        export const GetUserDetails = async( id :string )=>{
            try{
                const user = await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string,[
                    Query.equal("$id" , [id ])
                ])
    
             
                     if(!user)  return 
                     return user.documents[0]
                

            }
            catch(err :any) {
                console.log(err)
            }
        }

            
    export const GetSearchedUsers = async(username :string)=> {
                try {
                    const  newDocuments =  await database.listDocuments(
                       process.env.DATABASE_ID as string,
                       process.env.USERS_COLLECTION as string,
                       [ ]
                
                        
                    );
                    const returned = newDocuments.documents.filter((user) => user.name == username )
                    
                    if(returned.length > 0){
            
                        return  JSON.parse(JSON.stringify(returned))
                    }
                    else {
                        return []
                    }
                  
                  
                }
                catch(err :any) {
                    console.log(err)
                }
                } 
   






    
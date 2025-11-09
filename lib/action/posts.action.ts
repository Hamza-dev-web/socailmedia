"use server"
import { redirect } from "next/navigation";
import { database, users } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";
import { comment } from "postcss";
import { GetUserDetails } from "./user.action";


export const CreatePosts = async(title :string , image :string , userId :string)=> {
try {
 const user = await GetUserDetails(userId)
 if(!user) return
    const  newDocuments =  await database.createDocument(
process.env.DATABASE_ID as string  ,
process.env.POSTS_ID_COLLECTION as string ,
ID.unique(),
 {
title :title,
likeNumber:0,
image :image,
comments:[],
authorId : user.$id,
 });


    if(newDocuments){
await database.createDocument(
process.env.DATABASE_ID as string  ,
process.env.NOTIFICATION_COLLECTION as string ,
ID.unique(),
 {
  posterName:user.username,
     username : user.username ,
     userimage : user.image,
     type:"post"
    
 });
        return  console.log("succ")
    }
  
}
catch(err :any) {
    console.log(err ,"ddfdfdf")
}
} 

export const GetAllPosts = async()=> {
    try {
        const  newDocuments =  await database.listDocuments(
           process.env.DATABASE_ID as string,
           process.env.POSTS_ID_COLLECTION as string,
           []);
if(newDocuments){
 return  JSON.parse(JSON.stringify(newDocuments))
        } 
    }
    catch(err :any) {
        console.log(err)
    }
    } 
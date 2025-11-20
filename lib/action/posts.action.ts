"use server"
import { redirect } from "next/navigation";
import { database, users } from "../appwrite/config";
import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";
import { comment } from "postcss";
import { GetUserDetails } from "./user.action";


export const CreatePosts = async(documents :{title :string , like :number , image :string , userImage :string, posterName :string})=> {
try {

    let index =0
    console.log( "statrt" )
    const  newDocuments =  await database.createDocument(
       process.env.DATABASE_ID as string  ,
       process.env.POSTS_ID_COLLECTION as string ,
       ID.unique(), {
title  :documents.title,
Like : documents.like,
image :documents.image,
comments: [],
userImage : documents.userImage,
posterName : documents.posterName ,
index ,
type :"post"
       }

        
    );
    if(newDocuments ){
      index++
       await database.createDocument(
        process.env.DATABASE_ID as string  ,
        process.env.NOTIFICATION_COLLECTION as string ,
        ID.unique(), {
username : documents.posterName,
 posterName : documents.posterName ,
userimage : documents.userImage
        }
 
         
     );
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
    
     export const  DeleteAsavedPost = async(  postid :string , userid :string)=>{
 try{


    await database.deleteDocument(
        process.env.DATABASE_ID as string,
        process.env.SAVE_COLLECTION as string,
        postid
       )
return console.log("donne")
}
 catch(err :any) {
    console.log(err)
 }


                }
                   export const GetAllSavePosts = async(id :string)=> {
            try {
                const user = await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string,[
                    Query.equal("$id" , [id])
                ])

         return user.documents[0].save
                
            

            }
            catch(err :any) {
                console.log(err)
            }
            } 
                    export const SaveAPost = async( documents :{idofUser :string,title :string , like :number ,comments : string[] , image :string , userImage :string, posterName :string , index :number ,email :string}  )=>{

            try{

                const user = await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION as string,[
                    Query.equal("email" , [documents.email])
                ])
                if(!user) return
                const allsavePost = await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.SAVE_COLLECTION as string,
               [])


if(allsavePost.documents.length > 0){
    for(let i =0 ; i<allsavePost.documents.length ;i++){

           console.log("check")
            const savedPost = await database.createDocument(
                process.env.DATABASE_ID as string,
                process.env.SAVE_COLLECTION as string,
                ID.unique() , 
                {
                    title  :documents.title,
                    Like : documents.like,
                    image :documents.image,
                    comments: documents.comments,
                    userImage : documents.userImage,
                    posterName : documents.posterName ,
                    index :documents.index
                           }
                    )

        let data ={}
                    if(savedPost && user.documents[0]) {
    
                         data ={
                    
                            name : user.documents[0].username,
                            email : user.documents[0].email,
                                image :user.documents[0].image,
                                frends : user.documents[0].frends ,
                                index  :user.documents[0].index,
                              save : [
                                ...user.documents[0].save,
                                savedPost
        
                              ],
                              message : user.documents[0].message
                         }
                        
                    
                    await database.updateDocument(
                        process.env.DATABASE_ID as string,
                        process.env.USERS_COLLECTION as string,
                        user.documents[0].$id ,data
                       )
                        }
                    }
                }
                else {
                const savedPost=    await database.createDocument(
                process.env.DATABASE_ID as string,
                process.env.SAVE_COLLECTION as string,
                ID.unique() , 
                {
                    title  :documents.title,
                    Like : documents.like,
                    image :documents.image,
                    comments: documents.comments,
                    userImage : documents.userImage,
                    posterName : documents.posterName ,
                    index :documents.index
                           }
                    )
                           let data ={}
                    if(savedPost && user.documents[0]) {
    
                         data ={
                    
                            name : user.documents[0].username,
                            email : user.documents[0].email,
                                image :user.documents[0].image,
                                frends : user.documents[0].frends ,
                                index  :user.documents[0].index,
                              save : [
                                savedPost
                           
        
                              ],
                              message : user.documents[0].message
                         }
                        
                    
                    await database.updateDocument(
                        process.env.DATABASE_ID as string,
                        process.env.USERS_COLLECTION as string,
                        user.documents[0].$id ,data
                       )
                }
                
                    console.log("don")
                        return console.log("ok")
                }
            }
      
            catch(err :any) {
                console.log(err)
            }
        }
          export const deleteUserPost = async( id :string )=>{
            try{
                const isdelete = await database.deleteDocument(
                    process.env.DATABASE_ID as string,
                    process.env.POSTS_ID_COLLECTION as string,id)
             
                     if(!isdelete)  return  console.log("deleted")
            
                

            }
            catch(err :any) {
                console.log(err)
            }
        }

          export const handleTheLike = async (id :string , idUser :string)=>{
        try {

            const posts = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.POSTS_ID_COLLECTION as string,[
                Query.equal("$id" , [id ])
            ])
            console.log("post :",posts , "id" , idUser)
            const user  = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.USERS_COLLECTION as string,[
                    Query.equal("$id" , [idUser])
              ])
            if(!posts || !user)  return console.log("not found")
             console.log("user :",user )
                for(let i =0 ; i<posts.documents[0].isLiked.length ; i++){
                    posts.documents[0].isLiked[i].idofuserthatliked
                if(  posts.documents[0].isLiked[i].idofuserthatliked &&idUser != posts.documents[0].isLiked[i].idofuserthatliked){
                   console.log("check")
                     const newlike = await database.createDocument(
                        process.env.DATABASE_ID as string,
                        process.env.ISLIKED_COLLECTION as string,  
                        ID.unique()  ,
                        {
                            idofuserthatliked : user.documents[0].$id 
                        }
                    )           
                    
                    const data ={
                                     title : posts.documents[0].title ,
                                        posterName :posts.documents[0].postername ,
                                        image:posts.documents[0].image ,
                                        Like : posts.documents[0].Like + 1 ,
                                        isLiked :[ ...posts.documents[0].isLiked ,
                                        newlike 
                                    ] ,
                                        comments : posts.documents[0].comments ,
                                        userImage :posts.documents[0].userImage,
                                        index :posts.documents[0].index
                                    }
                            
                        await database.updateDocument(
                            process.env.DATABASE_ID as string,
                            process.env.POSTS_ID_COLLECTION as string,id ,
                            data
                        )
                    }
                    else {
                        return console.log("alredy liked")
                       }
                
                    }
                    if(posts.documents[0].isLiked.length == 0 ){
                        const newlike = await database.createDocument(
                            process.env.DATABASE_ID as string,
                            process.env.ISLIKED_COLLECTION as string,  
                            ID.unique()  ,
                            {
                                idofuserthatliked : user.documents[0].$id 
                            }
                        )           
                        
                        const data ={
                                         title : posts.documents[0].title ,
                                            posterName :posts.documents[0].postername ,
                                            image:posts.documents[0].image ,
                                            Like : posts.documents[0].Like + 1 ,
                                            isLiked :[
                                            newlike 
                                        ] ,
                                            comments : posts.documents[0].comments ,
                                            userImage :posts.documents[0].userImage,
                                            index :posts.documents[0].index
                                        }
                                
                            await database.updateDocument(
                                process.env.DATABASE_ID as string,
                                process.env.POSTS_ID_COLLECTION as string,id ,
                                data
                            )
                            console.log("ok")
                   
                }
}
catch (err :any) {
console.log(err)
}
    }

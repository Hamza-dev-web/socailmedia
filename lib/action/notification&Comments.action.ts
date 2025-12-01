"use server"
import { database } from "../appwrite/config";
import { ID } from "node-appwrite";
export const handleTheComments = async (idPost :string    , comments:string , username :string)=>{
        try {
            const newComments = await database.createDocument(
                process.env.DATABASE_ID as string,
                process.env.COMMENTS_COLLECTION as string,
                ID.unique(), 
                {
                comments :comments ,
                poster :username
               }
            )
            
            const posts = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.POSTS_ID_COLLECTION as string,
                [])
const filterdPosts = posts.documents.filter((post) => post.$id == idPost)
let data ={}
            if(!filterdPosts) return console.log("not found")
                
    data ={
        title : posts.documents[0].title ,
        posterName :posts.documents[0].postername ,
        image:posts.documents[0].image ,
        Like : posts.documents[0].Like  ,
        comments :[
            ...posts.documents[0].comments,
     {
        $id : newComments.$id,
        comments : newComments.comments,
        poster :newComments.poster
     }
        ],
        isLiked : posts.documents[0].isLiked,
        index : posts.documents[0].index
    }
await database.updateDocument(
    process.env.DATABASE_ID as string,
    process.env.POSTS_ID_COLLECTION as string,idPost , data)
  return console.log("ok")
        
        }
        catch (err :any) {
console.log(err)
        }
    }
export const GetNotifiction =async ()=>{
                    try {
                
                        const notifiction = await database.listDocuments(
                            process.env.DATABASE_ID as string  ,
                            process.env.NOTIFICATION_COLLECTION as string ,
                            [
                              ]
                        )
                        return notifiction.documents

                    }
                    catch(err :any) {
                        console.log(err)
                    }
                }
export const DeleteComments =async(id :string) =>{
    try {
        const newComments = await database.deleteDocument(
            process.env.DATABASE_ID as string,
            process.env.COMMENTS_COLLECTION as string ,id
        )
        return console.log("Done")

    }
    catch(err :any){
        console.log(err)
    }
}
export const updateComments =async(documents:{id :string , comments :string , poster :string}) =>{
    try {
        console.log(documents.id)
        const newComments = await database.updateDocument(
            process.env.DATABASE_ID as string,
            process.env.COMMENTS_COLLECTION as string ,documents.id ,{
                poster : documents.poster ,
                comments :documents.comments
            }

        )
        return console.log("Done")

    }
    catch(err :any){
        console.log(err)
    }
}


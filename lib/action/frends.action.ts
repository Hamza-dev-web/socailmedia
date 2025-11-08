"use server"
import { database, users } from "../appwrite/config"
import { ID, Query } from "node-appwrite";
import { currentUser } from "@clerk/nextjs/server";
import { log } from "console";


export const ListUsers = async(email:string)=>{
        try {
            const  newDocuments =  await database.listDocuments(
               process.env.DATABASE_ID as string,
               process.env.USERS_COLLECTION  as string,
               []);
            if(newDocuments.documents.length > 0 ){
                const usertoRetours = newDocuments.documents.filter((users) => users.email !=email as string)
        return         usertoRetours
            }
            else {
                return []
            }
        }
        catch(err :any) {
            console.log(err)
        }
    }
    export const HandleThefollow = async(documents :{index :number,image :string ,userId :string , username :string }, email :string)=>{

try{        
                const  user =  await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION  as string
                    ,[
                     Query.equal("email" , [email ])
                 ]
                     
                 );
                 if(user.documents[0].frends.length > 0){
                     for(let i =0 ; i<user.documents[0].frends.length ; i++) {
if(user.documents[0].frends[i].userId != documents.userId ){
    console.log('ok')
     const  frends =  await database.createDocument(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,
               ID.unique() ,
               {
                username :documents.username,
               userId :documents.userId,
               image : documents.image,
               Accept:false,
               index :documents.index
               }
             
                     
                 );
        
            if(user.documents.length > 0 && frends ){
              let data ={
                name : user.documents[0].name ,
                email :user.documents[0].email ,
                image:user.documents[0].image ,
                frends : [... user.documents[0].frends,{
                    username :documents.username,
                    userId :documents.userId,
                    image : documents.image,
                    index :documents.index,
                    Accept : false
                }
                ],
                save : user.documents[0].save 
              }
              await database.updateDocument(
              process.env.DATABASE_ID as string,
              process.env.USERS_COLLECTION  as string,user.documents[0].$id ,data)
            }
            return  "ok"
}
       }

                 }
                 else if(user.documents[0].frends.length== 0) {
                       const  frends =  await database.createDocument(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,
               ID.unique() ,
               {
                username :documents.username,
               userId :documents.userId,
               image : documents.image,
               Accept:false,
               index :documents.index
               }
             
                     
                 );
        
            if(user.documents.length > 0 && frends ){
              let data ={
                name : user.documents[0].name ,
                email :user.documents[0].email ,
                image:user.documents[0].image ,
                frends : [... user.documents[0].frends,{
                    username :documents.username,
                    userId :documents.userId,
                    image : documents.image,
                    index :documents.index,
                    Accept : false
                }
                ],
                save : user.documents[0].save 
              }
              await database.updateDocument(
              process.env.DATABASE_ID as string,
              process.env.USERS_COLLECTION  as string,user.documents[0].$id ,data)
            }
            return  "ok"
                 }

     
    
                
          
        }
        catch(err :any) {
            console.log(err)
        }
    }
    export const ListAllthefollower = async( email : string)=>{
let data= [] as any
        try {

           
                const  user =  await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION  as string
                    ,[
                     Query.equal("email" , [email])
                 ]
                     
                 );
        
             
                   
                  
           return user.documents[0].frends
        }
        catch(err :any) {
            console.log(err)
        }
    }
    export const getUsersToMessage =async (index :number)=>{
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
export const DeleteRequest =async( id :string)=>{
    try {
        const user = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("$id" , id)]
     
             
         )
         if(!user ) return
        await database.deleteDocument( 
            process.env.DATABASE_ID as string,
            process.env.FRENDS_COLLECTION  as string, id)

            return console.log("ok")

    }
    catch (err :any) {
        console.log(err)
    }
}
export const handleAccept =async( id :string , email :string) =>{
    try {

        console;log("start")
        const userthatsended = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("$id" , id)]
     
             
         )
         const currentuser = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("email" ,email)]
     
             
         )
      
         if(!userthatsended ) return
         let data ={}
         if(currentuser.documents[0].frends.length > 0  ){
         for(let i=0 ;i<currentuser.documents[0].frends.length ;i++){
        
      

              const frends = await database.listDocuments(
                process.env.DATABASE_ID as string,
                process.env.FRENDS_COLLECTION  as string,       [      Query.equal("$id" , currentuser.documents[0].frends[i].$id)])
                if(!frends) return console.log("not founds") 
             const updatedfrends =   await database.updateDocument(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,currentuser.documents[0].frends[i].$id ,{
                        userId:userthatsended.documents[0].frends[i].userId,
                        image : userthatsended.documents[0].frends[i].image,
                        username : userthatsended.documents[0].frends.username ,
                        Accept :true,
                        index : userthatsended.documents[0].index
                    })

         
            if( currentuser.documents[0].frends.length > 1) {
                data   ={
                    name : currentuser.documents[0].name ,
                    email :currentuser.documents[0].email ,
                    image:currentuser.documents[0].image ,
                    index :currentuser.documents[0].index,
                    frends : [... currentuser.documents[0].frends,{
                        userId:updatedfrends.documents[0].frends[i].userId,
                        image : updatedfrends.documents[0].frends[i].image,
                        username : updatedfrends.documents[0].frends.username ,
                      Accept :true
                    }
                    ] ,
              save :currentuser.documents[0].save
      
            }
        }
            else if(currentuser.documents[0].frends.length  == 1) {
                data   ={
                    name : currentuser.documents[0].name ,
                    email :currentuser.documents[0].email ,
                    image:currentuser.documents[0].image ,
                    index :currentuser.documents[0].index,
                    frends : [{
                        userId:updatedfrends.documents[0].frends[i].userId,
                        image : updatedfrends.documents[0].frends[i].image,
                        username : updatedfrends.documents[0].frends.username ,
                      Accept :true
                    }
                    ] ,
              save :currentuser.documents[0].save
      
            }
            }
            
              
        
            await database.updateDocument(
            process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,currentuser.documents[0].$id ,data)
          }
             console.log("done"  , data )
          return "Accept"
        }
       

    }
    catch (err :any) {
        console.log(err)
    }
}

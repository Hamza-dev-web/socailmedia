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
    export const HandleThefollow = async(documents :{index :number,image :string , receverId: string,senderId :string, username :string }, email :string)=>{
    try{   
        let index=0
        if(index == 0){   
    console.log("ids :" , documents.receverId, documents.senderId )
                const  user =  await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION  as string
                    ,[
                     Query.equal("email" , [email])
                 ]);
       const  Potentielfrends =  await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,
               [Query.equal("senderId"  , documents.senderId ),
                 Query.equal("receverId"  , documents.receverId )])
               if (Potentielfrends.documents.length > 0) return
       const  frends =  await database.createDocument(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,
               ID.unique() ,
               {
             username :documents.username,
              senderId :documents.senderId,
               receverId : documents.receverId,
               image : documents.image,
               Accept:false,
               index :documents.index
               });
                 let data ={}
            if(user.documents.length > 0 && frends ){
               data ={
                name : user.documents[0].name ,
                email :user.documents[0].email ,
                image:user.documents[0].image ,
                frends : [
                ... user.documents[0].frends
                ,{
                    username :documents.username,
                     senderId :documents.senderId,
                   receverId : documents.receverId,
                    image : documents.image,
                    index :documents.index,
                    Accept : false
                }
                ],
                save : user.documents[0].save 
              }
              await database.updateDocument(
              process.env.DATABASE_ID as string,
              process.env.USERS_COLLECTION  as string,
              documents.receverId ,
              data)
            }
             index++
            return  "ok"
        
        }
        index=0
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
/*
    export const getallInvitation = async () =>{
        try {
await database.listDocuments(
                    process.env.DATABASE_ID as string,
                process.env.FRENDS_COLLECTION  as string,      
                 [Query.equal("receverId" , )]
)
        }
        catch (err :any) {
            console.log(err)
        }
    }
        */
export const DeleteRequest =async( senderId :string , receverId :string)=>{
    try {
        const user = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("$id" , receverId)]
     
             
         )

         if(!user ) return
           const frendsrequest = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("senderId" ,senderId),
              Query.equal("receverId" ,user.documents[0].$id)
       ]        
         )
        await database.deleteDocument( 
            process.env.DATABASE_ID as string,
            process.env.FRENDS_COLLECTION  as string, frendsrequest.documents[0].$id)
           const data = user.documents[0].frends.filter((rqs:any) => rqs.$id != frendsrequest.documents[0].$id) 
    const updatedData   ={
    
                    name : user.documents[0].name ,
                    email :user.documents[0].email ,
                    image:user.documents[0].image ,
                    index :user.documents[0].index,
                    frends :data
                    ,
              save :user.documents[0].save
      
            }
                
        
            await database.updateDocument(
            process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,user.documents[0].$id ,updatedData)
          
            return console.log("ok")

    }
    catch (err :any) {
        console.log(err)
    }
}
export const handleAccept =async( senderId :string, email :string) =>{
    try {

        console.log("startt")
        /*
        const userthatsended = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("$id" , senderId)]
     
             
         )
       */
         const currentuser = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("email" ,email)]        
         )
          const frendsrequest = await database.listDocuments(process.env.DATABASE_ID as string,
            process.env.USERS_COLLECTION  as string,
       [      Query.equal("senderId" ,senderId),
              Query.equal("receverId" ,currentuser.documents[0].$id)
       ]        
         )
         console.log(frendsrequest)
      
      
         if(!currentuser && !frendsrequest ) return
         let data ={}
         if(currentuser.documents[0].frends.length > 0  ){
             const updatedfrends =   await database.updateDocument(
                    process.env.DATABASE_ID as string,
                    process.env.FRENDS_COLLECTION  as string,frendsrequest.documents[0].$id ,{
                        ...frendsrequest.documents[0],
                        Accept :true,
                    })

         
            if( currentuser.documents[0].frends.length > 1) {
                data   ={
                    name : currentuser.documents[0].name ,
                    email :currentuser.documents[0].email ,
                    image:currentuser.documents[0].image ,
                    index :currentuser.documents[0].index,
                    frends : [... currentuser.documents[0].frends,{
                      ...frendsrequest.documents[0],
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
                    frends : [... currentuser.documents[0].frends,{
                      ...frendsrequest.documents[0],
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
    catch (err :any) {
        console.log(err)
    }
}

"use server"
import { database } from "../appwrite/config"
import { ID, Query } from "node-appwrite";

export const ListUsers = async(email:string)=>{
        try {
               /*
            if(newDocuments.documents.length > 0 ){
                const usertoRetours = newDocuments.documents.filter((users) => users.email !=email as string)
             
               const listoffollower = await ListAllthefollower(email)
            let FinalListofUsers = []
            for (let i = 0 ; i < listoffollower.length ;i++){
            FinalListofUsers=[...FinalListofUsers , listoffollower[i].$id]
          }
          let finallist=[]
            */
          const  listofusers = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.USERS_COLLECTION!,
  [
    Query.notEqual("email", email),
  ])
        const  currentUsers = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.USERS_COLLECTION!,
  [
    Query.equal("email", email),
  ])
 const currentPairIds = currentUsers.documents[0]?.PairId ?? [];

// Filter out users who share ANY PairId
const filtered = listofusers.documents.filter(user => {
  const userPairIds = user.PairId ?? [];

  // check if pairs intersect
  const hasCommonPair = userPairIds.some((id :string) => currentPairIds.includes(id));

  return !hasCommonPair; // keep users with NO common PairIds
});

console.log("the list", filtered);
return filtered;

//if(listofusers.documents.length > 0) .push(listofusers.documents)

    //   return listofusers.documents
/*
const filteredusers = docs.documents.filter(
  doc => !FinalListofUsers.includes(doc.$id)
);
               console.log('follower' ,listoffollower , FinalListofUsers,"users", filteredusers)
          return filteredusers
          */
        }
        catch(err :any) {
            console.log(err)
        }
    }
    /*
    export const HandleThefollow = async(documents :{index :number,image :string , receverId: string,senderId :string, username :string }, email :string)=>{
    try{   
         
    
                const  user =  await database.listDocuments(
                    process.env.DATABASE_ID as string,
                    process.env.USERS_COLLECTION  as string
                    ,[
                     Query.equal("email" , [email])
                 ]);
                 console.log("ids  :" , documents.receverId, documents.senderId,"user", user ,email)
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
              data
            )}
            return  "ok"
        }
        catch(err :any) {
            console.log(err)
        }
    }
        */
export const HandleThefollow = async (
    index: number,
    image: string,
    receverId: string,
    senderId: string,
    username: string,
) => {
  try {
    console.log("userName :",username)
    const PairId = [senderId, receverId].sort().join("_");
    // 2️⃣ Check if friendship already exists
    const existing = await database.listDocuments(
      process.env.DATABASE_ID as string,
      process.env.RECEIVED_COLLECTION as string,
      [Query.equal("PairId", PairId)]
    );

    if (existing.documents.length > 0) {
      console.log("Friendship already exists:", PairId);
      return "already_exists";
    }

    // 3️⃣ Create a friend record (marked as sending / pending)
    const newFriend = await database.createDocument(
      process.env.DATABASE_ID as string,
      process.env.RECEIVED_COLLECTION as string,
      ID.unique(),
      {
        PairId,
        senderId,
        receverId,
        username: username,
        image: image,
        index: index,
        Accept: false, 
        status: "sending",
      }
    );
    const receiverRes = await database.listDocuments(
      process.env.DATABASE_ID as string,
      process.env.USERS_COLLECTION as string,
      [Query.equal("$id", receverId)]
    );
console.log("recdoc" , receiverRes)
    if (receiverRes.documents.length === 0) {
      console.error("Receiver not found:", receverId);
      return "receiver_not_found";
    }
    const receiverDoc = receiverRes.documents[0];
    const receiverFriends = [
      ...(receiverDoc.receivedRequest || []),
     newFriend.$id
    ];
    const updatedPairId = [
  ...(receiverDoc.documents?.[0]?.PairId || []),
  PairId
];
    console.log(receiverFriends)

    await database.updateDocument(
      process.env.DATABASE_ID as string,
      process.env.USERS_COLLECTION as string,
      receiverDoc.$id,
      { 
    PairId:updatedPairId,
    receivedRequest:  newFriend.$id
       }
    );

   await database.updateDocument(
      process.env.DATABASE_ID as string,
      process.env.USERS_COLLECTION as string,
      senderId,
      { 
    PairId:updatedPairId,

       }
    )    
    console.log("Receiver updated with pending friend request.");
    return "Sending"
  } catch (err: any) {
    console.error("Error in HandleFollow:", err.message || err);
    return "error";
  }
};

export const ListAllthefollower = async( email : string)=>{
let data= [] as any
        try {
const  user =  await database.listDocuments(
process.env.DATABASE_ID as string,
process.env.USERS_COLLECTION  as string
,[Query.equal("email" , [email])]);
if(!user) return
const friendRequest = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.RECEIVED_COLLECTION!,
  [Query.equal("PairId", user.documents[0].PairId )]
);
  return friendRequest.documents
        }
        catch(err :any) {
            console.log(err)
        }
    }
export const ListAllthefollower2 = async( email : string)=>{
let data= [] as any
        try {
const  user =  await database.listDocuments(
process.env.DATABASE_ID as string,
process.env.USERS_COLLECTION  as string
,[Query.equal("email" , [email])]);
if(!user) return
return user.documents[0].senderRequest
        }
        catch(err :any) {
            console.log(err)
        }
    }

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
            process.env.RECEIVED_COLLECTION  as string, 
            frendsrequest.documents[0].$id)
            /*/
           const data = user.documents[0].frends.filter((rqs:any) => rqs.$id != frendsrequest.documents[0].$id) 
    const updatedData   ={
name : user.documents[0].name ,
email :user.documents[0].email ,
image:user.documents[0].image ,
index :user.documents[0].index,
frends :data,
save :user.documents[0].save
}
await database.updateDocument(
process.env.DATABASE_ID as string,
process.env.USERS_COLLECTION  as string,
user.documents[0].$id ,
updatedData
)
*/
          
            return console.log("ok")

    }
    catch (err :any) {
        console.log(err)
    }
}
export const handleAccept =async( senderId :string, email :string) =>{
    try {

const currentuser = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.USERS_COLLECTION!,
  [Query.equal("email", email)]
);
const frendsuser = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.USERS_COLLECTION!,
  [Query.equal("$id", senderId)]
);
console.log(currentuser , frendsuser)
if (!currentuser.documents.length ||!frendsuser.documents.length ) {
  throw new Error("User not found");
}

const userDoc = currentuser.documents[0];
const frendsDoc = frendsuser.documents[0];
// Compute PairId
const PairId = [senderId, userDoc.$id].sort().join("_");

// 2️⃣ Get friend request
const friendRequest = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.RECEIVED_COLLECTION!,
  [Query.equal("PairId", PairId)]
);

if (!friendRequest.documents.length) {
  throw new Error("Friend request not found");
}

const requestDoc = friendRequest.documents[0];

// 3️⃣ Create new friend entry
const newFriend1 = await database.createDocument(
  process.env.DATABASE_ID!,
  process.env.SENDER_COLLECTION!,
  ID.unique(),
  {
    PairId,
    senderId,
    receverId: userDoc.$id,
    username: userDoc.name,
    image: userDoc.image,
    index: userDoc.index,
    Accept: true,
    status: "Frends",
  }
);
const newFriend2 = await database.createDocument(
  process.env.DATABASE_ID!,
  process.env.SENDER_COLLECTION!,
  ID.unique(),
  {
    PairId,
    senderId,
    receverId: frendsDoc.$id,
    username: frendsDoc.name,
    image: frendsDoc.image,
    index: frendsDoc.index,
    Accept: true,
    status: "Frends",
  }
);
// 4️⃣ Update existing friend request
console.log("pro" , newFriend1.$id)
    await database.updateDocument(
      process.env.DATABASE_ID as string,
      process.env.USERS_COLLECTION as string,
      senderId,
      { 
    senderRequest:  [...frendsDoc.senderRequest ,newFriend1.$id] 
       }
    );
        await database.updateDocument(
      process.env.DATABASE_ID as string,
      process.env.USERS_COLLECTION as string,
      currentuser.documents[0].$id,
      { 
    senderRequest: [ ...userDoc.senderRequest ,newFriend2.$id]
       }
    );
      
 await database.deleteDocument(
  process.env.DATABASE_ID!,
  process.env.RECEIVED_COLLECTION!,
  requestDoc.$id,
);
}
    catch (err :any) {
        console.log(err)
    }
} 
export const GetAllFrends = async ( userId :string)=> {
  try {
   const currentuser = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.USERS_COLLECTION!,
  [Query.equal("$id", userId)]
);
const userDoc = currentuser.documents[0];
console.log("allfrends",userDoc , "frends" ,userDoc.senderRequest)
if (!currentuser.documents.length) {
  throw new Error("User not found");
}
let list =[]
for(let i= 0 ; i<userDoc.senderRequest.length ; i++){
const friendRequest = await database.listDocuments(
  process.env.DATABASE_ID!,
  process.env.SENDER_COLLECTION!,
  [Query.equal("$id", userDoc.senderRequest[i].$id)]
);
if(friendRequest.documents.length > 0) {
  list=[...list , friendRequest.documents]
}

}
return list[0];
  }
  catch (err :any) {
    console.log(err)
  }
}
    
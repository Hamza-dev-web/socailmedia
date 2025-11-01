import * as  sdk from "node-appwrite"

export const client =  new sdk.Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.PROJECT_ID as string )
    .setKey(process.env.API_KEY as string); // Replace with your project ID

export const database = new sdk.Databases(client);
export const users = new sdk.Users(client);